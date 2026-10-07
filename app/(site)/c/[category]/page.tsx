import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles } from "@/lib/articles";
import { CATEGORIES, CATEGORY_KEYS, isCategory } from "@/lib/categories";
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

  const list = getAllArticles().filter((a) => a.category === category);

  return (
    <section>
      <h1 className="page-title">{CATEGORIES[category].label}</h1>
      <p className="muted">{CATEGORIES[category].description}</p>
      {list.length === 0 ? (
        <p className="empty">まだ記事がありません。</p>
      ) : (
        <ul className="cards cards-wide">
          {list.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </ul>
      )}
    </section>
  );
}
