import Link from "next/link";
import type { Article } from "@/lib/articles";
import { SafeImage } from "./SafeImage";
import { weeklyShortName } from "./WeeklyCards";
import { LevelBadge } from "./LevelBadge";
import { formatDate, generatedEyecatch } from "@/lib/articles";
import { CATEGORIES } from "@/lib/categories";

const NEW_DAYS = 3;

function isNew(date: string): boolean {
  const diff = Date.now() - new Date(`${date}T00:00:00+09:00`).getTime();
  return diff >= 0 && diff < NEW_DAYS * 24 * 60 * 60 * 1000;
}

// 今週のTopは「今週のTop｜AI情報 Top10」のように種類まで出す（2つのランキングを見分けるため）
export function CategoryLabel({ article }: { article: Article }) {
  return (
    <span className={`cat cat-${article.category}`}>
      {CATEGORIES[article.category].label}
      {article.category === "weekly" && `｜${weeklyShortName(article)}`}
    </span>
  );
}

export function NewBadge({ date }: { date: string }) {
  return isNew(date) ? <span className="new">NEW</span> : null;
}

// 見出し：日本語を大きく、英字は小さな飾りとして上に
export function SectionHeading({ en, ja, href, more = "もっと見る" }: { en: string; ja: string; href?: string; more?: string }) {
  return (
    <div className="section-heading">
      <h2>
        <span className="sh-en">{en}</span>
        <span className="sh-ja">{ja}</span>
      </h2>
      {href && (
        <Link href={href} className="more">
          {more} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}

// カテゴリ色＋スピード線の自動サムネ（画像が無いときの代わり）
function PatternThumb({ article, className }: { article: Article; className: string }) {
  return (
    <div className={className} aria-hidden="true">
      <span className="thumb-en">{CATEGORIES[article.category].en}</span>
      <span className="thumb-label">{article.thumbLabel ?? CATEGORIES[article.category].label}</span>
    </div>
  );
}

export function Thumb({ article, large = false }: { article: Article; large?: boolean }) {
  const base = `thumb thumb-${article.category}${large ? " thumb-lg" : ""}`;
  const pattern = <PatternThumb article={article} className={base} />;
  if (!article.image) return pattern;
  const generated = generatedEyecatch(article.slug);
  // 一覧の小さいサムネイルには、自動生成アイキャッチの小さい版（600×315）を使う
  const sized = generatedEyecatch(article.slug, !large);
  const src = article.image === generated ? sized : article.image;
  // 外部の画像が読めなかったら、自動生成のアイキャッチに切り替える
  const fallback =
    article.image === generated ? pattern : <SafeImage src={sized} className="thumb-img" fallback={pattern} />;
  return (
    <div className={`thumb-photo${large ? " thumb-photo-lg" : ""}`}>
      <SafeImage src={src} className="thumb-img" fallback={fallback} eager={large} />
    </div>
  );
}

// サムネ付きのカード
export function ArticleCard({ article }: { article: Article }) {
  return (
    <li className="card" data-level={article.level}>
      <Link href={`/articles/${article.slug}`}>
        <div className="card-thumb">
          <Thumb article={article} />
        </div>
        <div className="card-body">
          <p className="card-meta">
            <CategoryLabel article={article} />
            <time>{formatDate(article.date)}</time>
            <NewBadge date={article.date} />
            <LevelBadge level={article.level} />
          </p>
          <p className="card-title">{article.title}</p>
        </div>
      </Link>
    </li>
  );
}
