import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  daysSince,
  formatDate,
  getAllArticles,
  getArticle,
  getArticleWithImage,
  getArticles,
  isPrebuilt,
  STALE_DAYS,
} from "@/lib/articles";
import { SafeImage } from "@/components/SafeImage";
import { LineBanner } from "@/components/LineBanner";
import { CopyButtons } from "@/components/CopyButtons";
import { SourceCard } from "@/components/SourceCard";
import { ArticleCard, CategoryLabel, SectionHeading } from "@/components/ArticleParts";
import { CATEGORIES, SKILLUP, TASK_LIST } from "@/lib/categories";
import { Ranking } from "@/components/Ranking";

// 図解はスマホで縮みすぎないよう横スクロールで見せるので、キーボードでもスクロールできるようにする
function withScrollableDiagrams(html: string): string {
  return html.replaceAll('<figure class="diagram">', '<figure class="diagram" tabindex="0">');
}

type Props = { params: Promise<{ slug: string }> };

// 最近の記事だけビルド時に作る。古い記事は最初に読まれたときに作って保存する
export function generateStaticParams() {
  return getAllArticles()
    .filter(isPrebuilt)
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  return { title: article?.title };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleWithImage((await params).slug);
  if (!article) notFound();

  const age = daysSince(article.date);
  const stale = age >= STALE_DAYS; // AIツールの情報は古くなりやすいので全カテゴリで表示

  // ニュースは1件目の出典を「元記事カード」として上部に出す（NewsPicks風）
  const mainSource = article.category === "news" ? article.sources[0] : undefined;

  const taskSlug = TASK_LIST.find((t) => t.name === article.task)?.slug;

  const related = (await getArticles())
    .filter((a) => a.slug !== article.slug && a.tags.some((t) => article.tags.includes(t)))
    .slice(0, 3);

  return (
    <>
      <article className="article">
        <header className={`article-head article-head-${article.category}`}>
          <p className="article-en">{CATEGORIES[article.category].en}</p>
          <p className="card-meta">
            <Link href={`/c/${article.category}`} className="cat-link">
              <CategoryLabel article={article} />
            </Link>
            <time>{formatDate(article.date)}</time>
            {taskSlug ? (
              <Link href={`/tasks/${taskSlug}`} className="level level-link">
                業務：{article.task}
              </Link>
            ) : (
              article.task && <span className="level">業務：{article.task}</span>
            )}
            {article.level && <span className="level">{article.level}</span>}
          </p>
          <h1 className="article-title">{article.title}</h1>
          {article.skillup ? (
            <p className="audience">
              {SKILLUP.label}：{article.skillup}
            </p>
          ) : (
            article.audience.length > 0 && <p className="audience">こんな人におすすめ：{article.audience.join("／")}</p>
          )}
        </header>

        {stale && (
          <p className="stale-note">
            ⚠ この記事は約{Math.floor(age / 30)}か月前（{formatDate(article.date)}）の情報です。AIツールの機能や料金は変わっている可能性があるため、最新の情報は公式サイトでご確認ください。
          </p>
        )}

        {mainSource ? (
          <div className="src-main">
            <SourceCard source={mainSource} main />
            <p className="src-note">爆速AI編集部が、この記事のポイントと仕事への活かし方を解説します。</p>
          </div>
        ) : (
          article.image &&
          !article.youtube && (
            <figure className="eyecatch">
              <SafeImage src={article.image} fallback={null} eager />
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

        <div className="article-body" dangerouslySetInnerHTML={{ __html: withScrollableDiagrams(article.html) }} />
        <CopyButtons />

        {article.impact && (
          <section className="impact-box">
            <h2>
              <span className="box-en">COLUMN</span>爆速AIからのひとこと
            </h2>
            <p>{article.impact}</p>
          </section>
        )}

        <LineBanner />

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

        <p className="back-link">
          <Link href={`/c/${article.category}`}>
            <span aria-hidden="true">←</span> {CATEGORIES[article.category].label}の一覧へ戻る
          </Link>
        </p>
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
