import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import { formatDate } from "@/lib/articles";
import { CATEGORIES } from "@/lib/categories";

const NEW_DAYS = 3;

function isNew(date: string): boolean {
  const diff = Date.now() - new Date(`${date}T00:00:00+09:00`).getTime();
  return diff >= 0 && diff < NEW_DAYS * 24 * 60 * 60 * 1000;
}

export function CategoryLabel({ article }: { article: ArticleMeta }) {
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

export function Thumb({ article, large = false }: { article: ArticleMeta; large?: boolean }) {
  const className = `thumb thumb-${article.category}${large ? " thumb-lg" : ""}`;
  if (article.thumbnail) {
    return <img className={className} src={article.thumbnail} alt="" loading="lazy" />;
  }
  if (article.youtube) {
    return <img className={className} src={`https://i.ytimg.com/vi/${article.youtube}/hqdefault.jpg`} alt="" loading="lazy" />;
  }
  return (
    <div className={className} aria-hidden="true">
      <span className="thumb-en">{CATEGORIES[article.category].en}</span>
      <span className="thumb-label">{article.thumbLabel ?? CATEGORIES[article.category].label}</span>
    </div>
  );
}

// 番号付きの1行見出し
export function HeadlineItem({ article, index }: { article: ArticleMeta; index: number }) {
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
      </Link>
    </li>
  );
}

// サムネ付きのカード
export function ArticleCard({ article }: { article: ArticleMeta }) {
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
