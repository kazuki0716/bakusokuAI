import type { Article } from "@/lib/articles";
import { CATEGORIES, type CategoryKey } from "@/lib/categories";
import { ArticleCard } from "./ArticleParts";

const MAX_PER_GROUP = 12;

// 記事をカテゴリごとに並べる（立場別・業務別ページ用）
export function GroupedList({ articles, order }: { articles: Article[]; order: CategoryKey[] }) {
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
              {list.slice(0, MAX_PER_GROUP).map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
