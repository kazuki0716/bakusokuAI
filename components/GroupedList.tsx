import Link from "next/link";
import type { Article } from "@/lib/articles";
import { CATEGORIES, categoryHref, type CategoryKey } from "@/lib/categories";
import { ArticleCard } from "./ArticleParts";

// 記事をカテゴリごとに並べる（立場別・業務別ページ用）。1グループは limit 件まで出し、残りはカテゴリ一覧へ
export function GroupedList({ articles, order, limit = 12 }: { articles: Article[]; order: CategoryKey[]; limit?: number }) {
  return (
    <>
      {order.map((key) => {
        const list = articles.filter((a) => a.category === key);
        if (list.length === 0) return null;
        return (
          <section key={key} className="persona-block">
            <h2 className={`persona-title persona-title-${key}`}>
              {CATEGORIES[key].label}
              <span className="persona-title-count">{list.length}本</span>
            </h2>
            <ul className="cards">
              {list.slice(0, limit).map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </ul>
            {list.length > limit && (
              <p className="group-more">
                <Link href={categoryHref(key)}>
                  {CATEGORIES[key].label}をもっと見る（全{list.length}本） <span aria-hidden="true">→</span>
                </Link>
              </p>
            )}
          </section>
        );
      })}
    </>
  );
}
