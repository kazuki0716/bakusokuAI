import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getAllArticles, getArticle } from "@/lib/articles";
import { ArticleCard, CategoryLabel, SectionHeading } from "@/components/ArticleParts";
import { CATEGORIES } from "@/lib/categories";
import { Ranking } from "@/components/Ranking";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  return { title: article?.title };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const related = getAllArticles()
    .filter((a) => a.slug !== article.slug && a.tags.some((t) => article.tags.includes(t)))
    .slice(0, 3);

  return (
    <>
      <article className="article">
        <header className={`article-head article-head-${article.category}`}>
          <p className="article-en">{CATEGORIES[article.category].en}</p>
          <p className="card-meta">
            <CategoryLabel article={article} />
            <time>{formatDate(article.date)}</time>
            {article.level && <span className="level">{article.level}</span>}
          </p>
          <h1 className="article-title">{article.title}</h1>
          {article.audience.length > 0 && <p className="audience">こんな人におすすめ：{article.audience.join("／")}</p>}
        </header>

        {article.summary.length > 0 && (
          <section className="summary-box">
            <h2>
              <span className="box-en">3 POINTS</span>3行でわかる
            </h2>
            <ul>
              {article.summary.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        )}

        {article.youtube && (
          <div className="video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${article.youtube}`}
              title={article.title}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        )}

        {article.ranking.length > 0 && <Ranking items={article.ranking} />}

        <div className="article-body" dangerouslySetInnerHTML={{ __html: article.html }} />

        {article.impact && (
          <section className="impact-box">
            <h2>
              <span className="box-en">FOR MEMBERS</span>爆速AI会員への影響
            </h2>
            <p>{article.impact}</p>
          </section>
        )}

        {article.sources.length > 0 && (
          <section className="sources">
            <h2>出典</h2>
            <ul>
              {article.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {article.tags.length > 0 && (
          <div className="tag-list">
            {article.tags.map((tag) => (
              <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="tag">
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </article>

      {related.length > 0 && (
        <section className="block related">
          <SectionHeading en="RELATED" ja="関連記事" />
          <ul className="cards">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
