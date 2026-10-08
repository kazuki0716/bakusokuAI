import type { Metadata } from "next";
import { LevelFilter } from "@/components/LevelFilter";
import { levelCounts } from "@/lib/levels";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticles, getAllTags, PAGE_SIZE } from "@/lib/articles";
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
  const all = (await getArticles()).filter((a) => a.tags.includes(tag));
  if (all.length === 0) notFound();
  // キーワードページは新しい記事を最大 PAGE_SIZE×2 本まで。古い記事はバックナンバーから探す
  const list = all.slice(0, PAGE_SIZE * 2);

  return (
    <section>
      <header className="page-head">
        <p className="page-en">KEYWORD</p>
        <h1 className="page-title">#{tag}</h1>
        <p className="page-desc">{all.length}本の記事</p>
      </header>
      <LevelFilter counts={levelCounts(list)} total={list.length}>
        <ul className="cards">
          {list.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </ul>
      </LevelFilter>
      {all.length > list.length && (
        <p className="archive-link">
          新しい{list.length}本を表示しています。<Link href="/archive">それより前の記事はバックナンバーへ →</Link>
        </p>
      )}
    </section>
  );
}
