import Link from "next/link";
import { getArticles, getAllTags, formatDate } from "@/lib/articles";
import { getFeedItems } from "@/lib/feeds";
import { FeedList } from "@/components/FeedList";
import { CourseCards } from "@/components/CourseLinks";
import { CATEGORIES, CATEGORY_KEYS } from "@/lib/categories";
import { ArticleCard, CategoryLabel, HeadlineItem, NewBadge, SectionHeading, Thumb } from "@/components/ArticleParts";

// 外部ニュースフィードを1時間ごとに更新
export const revalidate = 3600;

export default async function HomePage() {
  const [articles, feed] = await Promise.all([getArticles(), getFeedItems()]);
  if (articles.length === 0) {
    return <p className="empty">まだ記事がありません。</p>;
  }

  const hero = articles.find((a) => a.pickup) ?? articles[0];
  const latest = articles.filter((a) => a.slug !== hero.slug).slice(0, 8);
  const weekly = articles.filter((a) => a.category === "weekly").slice(0, 2);

  return (
    <>
      <section className="top-intro">
        <p className="intro-en">
          AI NEWS <em>for</em> BUSINESS
        </p>
        <h1 className="intro-ja">
          仕事に効くAI情報を、<span>爆速で。</span>
        </h1>
      </section>

      <section className="top-grid">
        <div className="pickup">
          <SectionHeading en="PICK UP" ja="今日の注目" />
          <Link href={`/articles/${hero.slug}`} className="hero">
            <div className="hero-thumb">
              <Thumb article={hero} large />
            </div>
            <div className="hero-body">
              <p className="card-meta">
                <CategoryLabel article={hero} />
                <time>{formatDate(hero.date)}</time>
                <NewBadge date={hero.date} />
              </p>
              <h2 className="hero-title">{hero.title}</h2>
              {hero.summary.length > 0 && (
                <ul className="hero-summary">
                  {hero.summary.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
              <span className="read-more">
                記事を読む <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </div>

        <div className="latest">
          <SectionHeading en="LATEST" ja="新着記事" />
          <ol className="headlines">
            {latest.map((a, i) => (
              <HeadlineItem key={a.slug} article={a} index={i} />
            ))}
          </ol>
        </div>
      </section>

      {feed.length > 0 && (
        <section className="block">
          <SectionHeading en="AI NEWS FEED" ja="いま話題のAIニュース（外部サイト）" />
          <FeedList items={feed} />
        </section>
      )}

      {weekly.length > 0 && (
        <section className="block">
          <SectionHeading en="WEEKLY TOP" ja="今週のランキング" href="/c/weekly" />
          <ul className="weekly-cards">
            {weekly.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/articles/${a.slug}`}
                  className={`weekly-card${a.image ? " weekly-card-photo" : ""}`}
                  style={a.image ? { backgroundImage: `url("${a.image}")` } : undefined}
                >
                  <span className="weekly-count">
                    TOP<strong>{a.ranking.length}</strong>
                  </span>
                  <span className="weekly-title">{a.title}</span>
                  <span className="weekly-date">{formatDate(a.date)} 更新</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {CATEGORY_KEYS.filter((key) => key !== "weekly").map((key) => {
        const list = articles.filter((a) => a.category === key).slice(0, 6);
        if (list.length === 0) return null;
        return (
          <section key={key} className="block">
            <SectionHeading en={CATEGORIES[key].en} ja={CATEGORIES[key].label} href={`/c/${key}`} />
            <ul className="cards">
              {list.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </ul>
          </section>
        );
      })}

      <section className="block">
        <SectionHeading en="COURSES" ja="爆速AIの講座（レクティ）" />
        <CourseCards />
      </section>

      <section className="block">
        <SectionHeading en="KEYWORDS" ja="キーワードから探す" />
        <div className="tag-list tag-cloud">
          {getAllTags().map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="tag">
              #{tag}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
