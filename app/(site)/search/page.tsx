import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleParts";
import { LevelFilter } from "@/components/LevelFilter";
import { getArticles, getTagCounts } from "@/lib/articles";
import { levelCounts } from "@/lib/levels";
import { searchArticles } from "@/lib/search";

export const metadata: Metadata = { title: "サイト内検索" };

type Props = { searchParams: Promise<{ q?: string | string[] }> };

const MAX_RESULTS = 60;

export default async function SearchPage({ searchParams }: Props) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw ?? "").trim().slice(0, 100);
  const results = q ? searchArticles(await getArticles(), q) : [];
  const shown = results.slice(0, MAX_RESULTS);
  const tags = getTagCounts().slice(0, 12);

  return (
    <section>
      <header className="page-head">
        <p className="page-en">SEARCH</p>
        <h1 className="page-title">サイト内検索</h1>
        <form action="/search" method="get" role="search" className="search-form">
          <label htmlFor="search-q" className="visually-hidden">
            検索する言葉
          </label>
          <input
            id="search-q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="例：議事録、Excel、Copilot"
            autoFocus={!q}
            enterKeyHint="search"
            className="search-input"
          />
          <button type="submit" className="search-submit">
            検索
          </button>
        </form>
      </header>

      {q ? (
        <>
          <p className="search-count" role="status">
            「{q}」の検索結果：{results.length}本
            {results.length > shown.length && `（新しい順に${shown.length}本を表示）`}
          </p>
          {shown.length === 0 ? (
            <div className="empty">
              <p>見つかりませんでした。言葉を短くするか、別の言い方（例：「議事録」→「会議」）で探してみてください。</p>
            </div>
          ) : (
            <LevelFilter counts={levelCounts(shown)} total={shown.length}>
              <ul className="cards">
                {shown.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </ul>
            </LevelFilter>
          )}
        </>
      ) : null}

      <div className="search-hints">
        <h2 className="persona-title">よく出てくるキーワード</h2>
        <div className="tag-list">
          {tags.map((t) => (
            <Link key={t.tag} href={`/search?q=${encodeURIComponent(t.tag)}`} className="tag">
              #{t.tag}
              <span className="tag-count">{t.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
