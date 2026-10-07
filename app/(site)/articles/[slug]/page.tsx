import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getAllArticles, getArticle, getArticleWithImage, getArticles } from "@/lib/articles";
import { SafeImage } from "@/components/SafeImage";
import { CourseBanner } from "@/components/CourseLinks";
import { SourceCard } from "@/components/SourceCard";
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
  const article = await getArticleWithImage((await params).slug);
  if (!article) notFound();

  // ニュースは1件目の出典を「元記事カード」として上部に出す（NewsPicks風）
  const mainSource = article.category === "news" ? article.sources[0] : undefined;

  const related = (await getArticles())
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
            {article.task && <span className="level">業務：{article.task}</span>}
            {article.level && <span className="level">{article.level}</span>}
          </p>
          <h1 className="article-title">{article.title}</h1>
          {article.audience.length > 0 && <p className="audience">こんな人におすすめ：{article.audience.join("／")}</p>}
        </header>

        {mainSource ? (
          <div className="src-main">
            <SourceCard source={mainSource} main />
            <p className="src-note">爆速AI編集部が、この記事のポイントと仕事への活かし方を解説します。</p>
          </div>
        ) : (
          article.image &&
          !article.youtube && (
            <figure className="eyecatch">
              <SafeImage src={article.image} fallback={null} />
              {article.imageCredit && (
                <figcaption>
                  {article.imageCreditUrl ? (
                    <a href={article.imageCreditUrl} target="_blank" rel="noopener noreferrer">
                      {article.imageCredit}
                    </a>
                  ) : (
                    article.imageCredit
                  )}
                </figcaption>
              )}
            </figure>
          )
        )}

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

        <CourseBanner />

        {article.sources.length > 0 && (
          <section className="sources">
            <h2>SOURCES</h2>
            <div className="src-list">
              {article.sources.map((src) => (
                <SourceCard key={src.url} source={src} />
              ))}
            </div>
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
