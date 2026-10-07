import Link from "next/link";
import type { Article } from "@/lib/articles";
import { SafeImage } from "./SafeImage";
import { formatDate, generatedEyecatch } from "@/lib/articles";
import { CATEGORIES } from "@/lib/categories";

const NEW_DAYS = 3;

function isNew(date: string): boolean {
  const diff = Date.now() - new Date(`${date}T00:00:00+09:00`).getTime();
  return diff >= 0 && diff < NEW_DAYS * 24 * 60 * 60 * 1000;
}

export function CategoryLabel({ article }: { article: Article }) {
  return <span className={`cat cat-${article.category}`}>{CATEGORIES[article.category].label}</span>;
}

export function NewBadge({ date }: { date: string }) {
  return isNew(date) ? <span className="new">NEW</span> : null;
}

// 英語の大見出し＋日本語の小見出し
export function SectionHeading({ en, ja, href }: { en: string; ja: string; href?: string }) {
  return (
    <div className="section-heading">
      <h2>
        <span className="sh-en">{en}</span>
        <span className="sh-ja">{ja}</span>
      </h2>
      {href && (
        <Link href={href} className="more">
          もっと見る <span aria-hidden="true">→</span>
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
  // 外部の画像が読めなかったら、自動生成のアイキャッチに切り替える
  const fallback =
    article.image === generated ? pattern : <SafeImage src={generated} className="thumb-img" fallback={pattern} />;
  return (
    <div className={`thumb-photo${large ? " thumb-photo-lg" : ""}`}>
      <SafeImage src={article.image} className="thumb-img" fallback={fallback} />
      {article.image !== generated && (
        <span className={`thumb-chip cat-${article.category}`}>{CATEGORIES[article.category].en}</span>
      )}
    </div>
  );
}

// 番号付きの1行見出し
export function HeadlineItem({ article, index }: { article: Article; index: number }) {
  return (
    <li className="headline">
      <Link href={`/articles/${article.slug}`}>
        <span className="headline-no">{String(index + 1).padStart(2, "0")}</span>
        <span className="headline-main">
          <span className="headline-meta">
            <CategoryLabel article={article} />
            <time>{formatDate(article.date)}</time>
            <NewBadge date={article.date} />
          </span>
          <span className="headline-title">{article.title}</span>
        </span>
        <span className="headline-thumb">
          <Thumb article={article} />
        </span>
      </Link>
    </li>
  );
}

// サムネ付きのカード
export function ArticleCard({ article }: { article: Article }) {
  return (
    <li className="card">
      <Link href={`/articles/${article.slug}`}>
        <div className="card-thumb">
          <Thumb article={article} />
        </div>
        <div className="card-body">
          <p className="card-meta">
            <CategoryLabel article={article} />
            <time>{formatDate(article.date)}</time>
            <NewBadge date={article.date} />
          </p>
          <p className="card-title">{article.title}</p>
        </div>
      </Link>
    </li>
  );
}
