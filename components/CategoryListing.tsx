import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles, PAGE_SIZE } from "@/lib/articles";
import { AUDIENCES, MENU, SKILLUP, type CategoryKey } from "@/lib/categories";
import { ArticleCard } from "./ArticleParts";
import { latestWeeklyPair, WeeklyCards } from "./WeeklyCards";

export function pageHref(category: CategoryKey, page: number): string {
  return page <= 1 ? `/c/${category}` : `/c/${category}/page/${page}`;
}

// メニュー1つ分の記事一覧（新しい順に PAGE_SIZE 本ずつ）。古い記事は2ページ目以降とバックナンバーへ
// 「使い方・プロンプト」（/c/howto）は使い方・特集とプロンプトの2つの種類をまとめて出す
export async function CategoryListing({ category, page }: { category: CategoryKey; page: number }) {
  const menu = MENU.find((m) => m.key === category);
  if (!menu) notFound();
  const all = (await getArticles()).filter((a) => menu.cats.includes(a.category));
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  if (page < 1 || page > totalPages) notFound();
  const list = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  // 今週のTop：1ページ目の先頭は、ホームと同じカードで最新のAI情報・YouTube動画を1本ずつ
  const latestWeekly = category === "weekly" && page === 1 ? latestWeeklyPair(all) : [];
  const rest = list.filter((a) => !latestWeekly.includes(a));

  return (
    <section>
      <header className={`page-head page-head-${category}`}>
        <p className="page-en">{menu.en}</p>
        <h1 className="page-title">
          {menu.label}
          {page > 1 && <span className="page-num">（{page}ページ目）</span>}
        </h1>
        <p className="page-desc">{menu.description}</p>
      </header>

      {list.length === 0 ? (
        <p className="empty">まだ記事がありません。</p>
      ) : category === "video" ? (
        // おすすめ動画はペルソナ（立場）ごと＋「AIで自分磨き」枠に並べる
        <>
          {AUDIENCES.map((who) => {
            const forWho = list.filter((a) => !a.skillup && a.audience.includes(who));
            if (forWho.length === 0) return null;
            return (
              <section key={who} className="persona-block">
                <h2 className="persona-title">{who}向け</h2>
                <ul className="cards">
                  {forWho.map((a) => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </ul>
              </section>
            );
          })}
          {list.some((a) => a.skillup) && (
            <section id="skillup" className="persona-block">
              <h2 className="persona-title">{SKILLUP.label}</h2>
              <p className="persona-desc">{SKILLUP.description}の動画です。</p>
              <ul className="cards">
                {list
                  .filter((a) => a.skillup)
                  .map((a) => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
              </ul>
            </section>
          )}
        </>
      ) : category === "howto" ? (
        // 使い方・特集 → プロンプト の2段
        <>
          {[
            { id: "howto", title: "使い方・特集", desc: "仕事ごとの手順を、図解つきで解説します。", items: list.filter((a) => a.category === "howto") },
            { id: "prompt", title: "プロンプト", desc: "コピーしてそのまま使える指示文です。", items: list.filter((a) => a.category === "prompt") },
          ].map(
            (g) =>
              g.items.length > 0 && (
                <section key={g.id} id={g.id} className="persona-block">
                  <h2 className={`persona-title persona-title-${g.id}`}>{g.title}</h2>
                  <p className="persona-desc">{g.desc}</p>
                  <ul className="cards">
                    {g.items.map((a) => (
                      <ArticleCard key={a.slug} article={a} />
                    ))}
                  </ul>
                </section>
              ),
          )}
        </>
      ) : (
        <>
          {latestWeekly.length > 0 && <WeeklyCards articles={latestWeekly} />}
          {latestWeekly.length > 0 && rest.length > 0 && (
            <h2 className="persona-title weekly-past-title">これまでのTop</h2>
          )}
          {rest.length > 0 && (
            <ul className="cards">
              {rest.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </ul>
          )}
        </>
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
