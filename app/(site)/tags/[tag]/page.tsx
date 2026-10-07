import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles, getAllTags } from "@/lib/articles";
import { ArticleCard } from "@/components/ArticleParts";

type Props = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return { title: `#${decodeURIComponent(tag)}` };
}

export default async function TagPage({ params }: Props) {
  const tag = decodeURIComponent((await params).tag);
  const list = getAllArticles().filter((a) => a.tags.includes(tag));
  if (list.length === 0) notFound();

  return (
    <section>
      <header className="page-head">
        <p className="page-en">KEYWORD</p>
        <h1 className="page-title">#{tag}</h1>
        <p className="page-desc">{list.length}件の記事</p>
      </header>
      <ul className="cards">
        {list.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </ul>
    </section>
  );
}
