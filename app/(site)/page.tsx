import Link from "next/link";
import { getAllArticles, getAllTags, formatDate } from "@/lib/articles";
import { CATEGORIES, CATEGORY_KEYS } from "@/lib/categories";
import { ArticleCard, CategoryLabel, HeadlineItem, NewBadge, Thumb } from "@/components/ArticleParts";

export default function HomePage() {
  const articles = getAllArticles();
  if (articles.length === 0) {
    return <p className="empty">まだ記事がありません。</p>;
  }

  const hero = articles.find((a) => a.pickup) ?? articles[0];
  const headlines = articles.filter((a) => a.slug !== hero.slug).slice(0, 8);
  const videos = articles.filter((a) => a.category === "video").slice(0, 3);
  const prompts = articles.filter((a) => a.category === "prompt").slice(0, 3);

  return (
    <div className="layout">
      <div className="main-col">
        <section className="topics" aria-labelledby="topics-heading">
          <h2 id="topics-heading" className="section-title">主要トピックス</h2>
          <Link href={`/articles/${hero.slug}`} className="hero">
            <Thumb article={hero} large />
            <div className="hero-body">
              <p className="card-meta">
                <CategoryLabel article={hero} /> {formatDate(hero.date)} <NewBadge date={hero.date} />
              </p>
              <h3 className="hero-title">{hero.title}</h3>
              {hero.summary.length > 0 && (
                <ul className="hero-summary">
                  {hero.summary.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          </Link>
          <ul className="headlines">
            {headlines.map((a) => (
              <HeadlineItem key={a.slug} article={a} />
            ))}
          </ul>
        </section>

        {CATEGORY_KEYS.map((key) => {
          const list = articles.filter((a) => a.category === key).slice(0, 4);
          if (list.length === 0) return null;
          return (
            <section key={key} className="cat-section">
              <h2 className="section-title">
                {CATEGORIES[key].label}
                <Link href={`/c/${key}`} className="more">
                  もっと見る ›
                </Link>
              </h2>
              <ul className="cards">
                {list.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <aside className="side-col">
        <SideBox title="おすすめ動画" items={videos} empty="動画は準備中です" />
        <SideBox title="今週のプロンプト" items={prompts} empty="プロンプトは準備中です" />
        <section className="side-box">
          <h2 className="side-title">キーワード</h2>
          <div className="tag-list">
            {getAllTags().map((tag) => (
              <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="tag">
                #{tag}
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}

function SideBox({ title, items, empty }: { title: string; items: ReturnType<typeof getAllArticles>; empty: string }) {
  return (
    <section className="side-box">
      <h2 className="side-title">{title}</h2>
      {items.length === 0 ? (
        <p className="muted small">{empty}</p>
      ) : (
        <ol className="side-list">
          {items.map((a) => (
            <li key={a.slug}>
              <Link href={`/articles/${a.slug}`}>{a.title}</Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
