import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { isCategory, type CategoryKey } from "./categories";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type Source = { title: string; url: string };

// 「今週のTop」記事のランキング1件分
export type RankingItem = {
  title: string;
  url: string;
  youtube?: string; // YouTube動画ID（動画のときだけ）
  channel?: string; // YouTubeのチャンネル名、または記事の媒体名
  comment: string; // 編集部のおすすめポイント
};

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: CategoryKey;
  summary: string[]; // 3行まとめ
  impact?: string; // 「あなたの仕事への影響」
  tags: string[];
  audience: string[];
  level?: "初級" | "中級" | "上級";
  thumbnail?: string; // /images/articles/... （無ければカテゴリ色のサムネを自動生成）
  thumbLabel?: string; // 自動サムネに載せる短い文字
  youtube?: string; // YouTube動画ID
  sources: Source[];
  pickup?: boolean; // トップの大枠に出す
  ranking: RankingItem[];
};

export type Article = ArticleMeta & { html: string };

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
    level: data.level,
    thumbnail: data.thumbnail,
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

export function getAllTags(): string[] {
  return [...new Set(getAllArticles().flatMap((a) => a.tags))].sort();
}

export function formatDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  if (!y || !m || !d) return date;
  const wd = "日月火水木金土"[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${y}/${m}/${d}(${wd})`;
}
