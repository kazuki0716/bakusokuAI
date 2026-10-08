import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { isCategory, type CategoryKey } from "./categories";
import { getOgImage, youtubeThumb } from "./ogp";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type Source = {
  title: string; // 元記事のタイトル（媒体名を含めてもよい）
  url: string;
  media?: string; // 媒体名（例：窓の杜）。省略時はドメイン名
  image?: string; // 元記事の og:image。省略時はビルド時に自動取得
};

// 「今週のTop」記事のランキング1件分
export type RankingItem = {
  title: string;
  url: string;
  youtube?: string; // YouTube動画ID（動画のときだけ）
  channel?: string; // YouTubeのチャンネル名、または記事の媒体名
  comment: string; // 編集部のおすすめポイント
  image?: string; // 自動で付く（YouTubeのサムネ・記事のアイキャッチ・リンク先のOGP画像）
};

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: CategoryKey;
  summary: string[]; // 3行まとめ
  impact?: string; // 「爆速AIからのひとこと」（編集部コラム）
  tags: string[];
  audience: string[]; // 対象ペルソナ（AUDIENCES のいずれか）
  task?: string; // 業務カテゴリ（TASKS のいずれか。業務に関係しない記事は省略）
  skillup?: string; // おすすめ動画の「AIで自分磨き」枠のテーマ（SKILLUP.themes のいずれか）
  level?: "初級" | "中級" | "上級";
  thumbnail?: string; // アイキャッチ画像を手動で指定（/images/articles/... または https://...）
  eyecatchFrom?: string; // このURLのOGP画像をアイキャッチにする（省略時は sources の1件目）
  thumbnailCredit?: string; // thumbnail の引用元（例："窓の杜「OpenAI、DevDay 2026を開催」より"）
  thumbnailCreditUrl?: string; // 引用元ページのURL
  thumbLabel?: string; // 自動サムネに載せる短い文字
  youtube?: string; // YouTube動画ID
  sources: Source[];
  pickup?: boolean; // トップの大枠に出す
  ranking: RankingItem[];
};

export type Article = ArticleMeta & {
  html: string;
  image?: string; // 実際に表示するアイキャッチ（getArticles で自動的に決まる）
  imageCredit?: string; // 外部サイトの画像を使うときの出典表示
  imageCreditUrl?: string; // 出典ページへのリンク
};

function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

function readArticle(file: string): Article {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.md$/, "");

  const category = String(data.category ?? "");
  if (!isCategory(category)) {
    throw new Error(`${file}: category "${category}" は weekly / news / video / howto / prompt のいずれかにしてください`);
  }
  if (!data.title) throw new Error(`${file}: title がありません`);

  return {
    slug,
    title: String(data.title),
    date: toDateString(data.date),
    category,
    summary: data.summary ?? [],
    impact: data.impact,
    tags: data.tags ?? [],
    audience: data.audience ?? [],
    task: data.task,
    skillup: data.skillup,
    level: data.level,
    thumbnail: data.thumbnail ?? data.image,
    eyecatchFrom: data.eyecatchFrom,
    thumbnailCredit: data.thumbnailCredit,
    thumbnailCreditUrl: data.thumbnailCreditUrl,
    thumbLabel: data.thumbLabel,
    youtube: data.youtube ? String(data.youtube) : undefined,
    sources: data.sources ?? [],
    pickup: Boolean(data.pickup),
    ranking: (data.ranking ?? []).map((item: RankingItem) => ({
      ...item,
      youtube: item.youtube ? String(item.youtube) : undefined,
    })),
    html: marked.parse(content, { async: false }),
  };
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(readArticle)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug < b.slug ? 1 : -1));
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

// 自動生成のオリジナル・アイキャッチ画像のURL（app/eyecatch/[file]/route.tsx で作る）
export function generatedEyecatch(slug: string, small = false): string {
  return `/eyecatch/${slug}${small ? ".sm" : ""}.png`;
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

// アイキャッチ画像の決め方（上から順に、見つかったものを使う）
// 1. frontmatter の thumbnail  2. 記事の youtube  3. ランキング1位のYouTube
// 4. eyecatchFrom または sources 1件目のOGP画像  5. ランキング1位のリンク先のOGP画像
// 6. どれも無ければ、記事タイトル入りのオリジナル画像を自動生成（/eyecatch/<slug>.png）
type ImageInfo = Pick<Article, "image" | "imageCredit" | "imageCreditUrl">;

async function resolveImage(a: Article): Promise<ImageInfo> {
  if (a.thumbnail) {
    return { image: a.thumbnail, imageCredit: a.thumbnailCredit, imageCreditUrl: a.thumbnailCreditUrl };
  }
  const video = a.youtube ? { youtube: a.youtube, url: `https://www.youtube.com/watch?v=${a.youtube}`, title: a.title } : a.ranking.find((r) => r.youtube);
  if (video?.youtube) {
    return { image: youtubeThumb(video.youtube), imageCredit: `出典：YouTube「${video.title}」`, imageCreditUrl: video.url };
  }

  // 出典ページ（または指定ページ）のOGP画像。引用元として媒体名・記事名を表示する
  const titleOf = new Map<string, string>([...a.sources.map((s) => [s.url, s.title] as const), ...a.ranking.map((r) => [r.url, r.title] as const)]);
  const candidates = [a.eyecatchFrom, ...a.sources.map((s) => s.url), ...a.ranking.map((r) => r.url)].filter(
    (u): u is string => Boolean(u && /^https?:\/\//.test(u)),
  );
  for (const url of candidates.slice(0, 4)) {
    const image = await getOgImage(url);
    if (image) {
      const title = titleOf.get(url);
      return { image, imageCredit: title ? `出典：${title}` : `出典：${hostOf(url)}`, imageCreditUrl: url };
    }
  }
  return { image: generatedEyecatch(a.slug) };
}

let enriched: Promise<Article[]> | undefined;

// アイキャッチ画像付きの全記事。ページの表示にはこちらを使う
export function getArticles(): Promise<Article[]> {
  if (process.env.NODE_ENV !== "production") enriched = undefined; // 開発中は記事の追加をすぐ反映
  enriched ??= (async () => {
    const articles = getAllArticles();
    await Promise.all(articles.map(async (a) => Object.assign(a, await resolveImage(a))));
    // 出典（元記事カード）にも画像を付ける
    await Promise.all(
      articles.flatMap((a) =>
        a.sources.slice(0, 3).map(async (src) => {
          src.media ??= hostOf(src.url);
          src.image ??= await getOgImage(src.url);
        }),
      ),
    );
    const bySlug = new Map(articles.map((a) => [`/articles/${a.slug}`, a]));
    // ランキングの各項目にも画像を付ける
    await Promise.all(
      articles.flatMap((a) =>
        a.ranking.map(async (r) => {
          r.image = r.youtube ? youtubeThumb(r.youtube) : (bySlug.get(r.url)?.image ?? (await getOgImage(r.url)));
        }),
      ),
    );
    return articles;
  })();
  return enriched;
}

export async function getArticleWithImage(slug: string): Promise<Article | undefined> {
  return (await getArticles()).find((a) => a.slug === slug);
}

export function getAllTags(): string[] {
  return [...new Set(getAllArticles().flatMap((a) => a.tags))].sort();
}

// キーワードと記事数（多い順）
export function getTagCounts(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const a of getAllArticles()) for (const t of a.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count || (a.tag < b.tag ? -1 : 1));
}

export function formatDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  if (!y || !m || !d) return date;
  const wd = "日月火水木金土"[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${y}/${m}/${d}(${wd})`;
}

// ---------- バックナンバー・古い記事の扱い ----------

// カテゴリページの1ページあたりの記事数
export const PAGE_SIZE = 24;

// ビルド時に先に作っておく記事ページの範囲（日数）。これより古い記事ページは、
// 最初に読まれたときに作って保存する（記事が増えてもビルド時間が伸びないようにするため）
export const PREBUILD_DAYS = 120;

// この日数を過ぎたニュースには「古い情報です」の注意書きを出す
export const STALE_DAYS = 180;

export function daysSince(date: string): number {
  return Math.floor((Date.now() - new Date(`${date}T00:00:00+09:00`).getTime()) / 86_400_000);
}

export function isPrebuilt(article: ArticleMeta): boolean {
  return daysSince(article.date) <= PREBUILD_DAYS;
}

export function monthKey(date: string): string {
  return date.slice(0, 7); // YYYY-MM
}

export function formatMonth(key: string): string {
  const [y, m] = key.split("-").map(Number);
  return `${y}年${m}月`;
}
