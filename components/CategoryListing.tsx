import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles, PAGE_SIZE } from "@/lib/articles";
import { AUDIENCES, CATEGORIES, type CategoryKey } from "@/lib/categories";
import { ArticleCard } from "./ArticleParts";

export function pageHref(category: CategoryKey, page: number): string {
  return page <= 1 ? `/c/${category}` : `/c/${category}/page/${page}`;
}

// カテゴリの記事一覧（新しい順に PAGE_SIZE 本ずつ）。古い記事は2ページ目以降とバックナンバーへ
export async function CategoryListing({ category, page }: { category: CategoryKey; page: number }) {
  const all = (await getArticles()).filter((a) => a.category === category);
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  if (page < 1 || page > totalPages) notFound();
  const list = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section>
      <header className={`page-head page-head-${category}`}>
        <p className="page-en">{CATEGORIES[category].en}</p>
        <h1 className="page-title">
          {CATEGORIES[category].label}
          {page > 1 && <span className="page-num">（{page}ページ目）</span>}
        </h1>
        <p className="page-desc">{CATEGORIES[category].description}</p>
      </header>

      {list.length === 0 ? (
        <p className="empty">まだ記事がありません。</p>
      ) : category === "video" ? (
        // おすすめ動画はペルソナ（立場）ごとに並べる
        AUDIENCES.map((who) => {
          const forWho = list.filter((a) => a.audience.includes(who));
          if (forWho.length === 0) return null;
          return (
            <section key={who} className="persona-block">
              <h2 className="persona-title">{who}におすすめ</h2>
              <ul className="cards">
                {forWho.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </ul>
            </section>
          );
        })
      ) : (
        <ul className="cards">
          {list.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <nav className="pager" aria-label="ページ送り">
          {page > 1 ? (
            <Link href={pageHref(category, page - 1)} className="pager-btn">
              ← 新しい記事
            </Link>
          ) : (
            <span />
          )}
          <span className="pager-info">
            {page} / {totalPages}
          </span>
          {page < totalPages ? (
            <Link href={pageHref(category, page + 1)} className="pager-btn">
              過去の記事 →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}

      <p className="archive-link">
        <Link href="/archive">月別のバックナンバーを見る →</Link>
      </p>
    </section>
  );
}
