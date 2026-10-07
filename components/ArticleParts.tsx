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
      <span>{article.thumbLabel ?? CATEGORIES[article.category].label}</span>
    </div>
  );
}

// 主要トピックス風の1行見出し
export function HeadlineItem({ article }: { article: ArticleMeta }) {
  return (
    <li className="headline">
      <Link href={`/articles/${article.slug}`}>
        <CategoryLabel article={article} />
        <span className="headline-title">{article.title}</span>
        <NewBadge date={article.date} />
      </Link>
    </li>
  );
}

// サムネ付きのカード
export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <li className="card">
      <Link href={`/articles/${article.slug}`}>
        <Thumb article={article} />
        <div className="card-body">
          <p className="card-title">{article.title}</p>
          <p className="card-meta">
            <CategoryLabel article={article} /> {formatDate(article.date)} <NewBadge date={article.date} />
          </p>
        </div>
      </Link>
    </li>
  );
}
