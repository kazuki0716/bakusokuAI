import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticles } from "@/lib/articles";
import { AUDIENCES, CATEGORIES, CATEGORY_KEYS, isCategory } from "@/lib/categories";
import { ArticleCard } from "@/components/ArticleParts";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return CATEGORY_KEYS.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  return { title: isCategory(category) ? CATEGORIES[category].label : undefined };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!isCategory(category)) notFound();

  const list = (await getArticles()).filter((a) => a.category === category);

  return (
    <section>
      <header className={`page-head page-head-${category}`}>
        <p className="page-en">{CATEGORIES[category].en}</p>
        <h1 className="page-title">{CATEGORIES[category].label}</h1>
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
    </section>
  );
}
