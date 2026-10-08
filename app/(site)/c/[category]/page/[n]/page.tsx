import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getAllArticles, PAGE_SIZE } from "@/lib/articles";
import { categoryHref, isCategory, listLabel, MENU } from "@/lib/categories";
import { CategoryListing } from "@/components/CategoryListing";

type Props = { params: Promise<{ category: string; n: string }> };

// 2ページ目以降（/c/news/page/2 など）
export function generateStaticParams() {
  const articles = getAllArticles();
  return MENU.flatMap(({ key: category, cats }) => {
    const pages = Math.ceil(articles.filter((a) => cats.includes(a.category)).length / PAGE_SIZE);
    return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ category, n: String(i + 2) }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, n } = await params;
  return { title: isCategory(category) ? `${listLabel(category)}（${n}ページ目）` : undefined };
}

export default async function CategoryPagedPage({ params }: Props) {
  const { category, n } = await params;
  if (!isCategory(category)) notFound();
  if (category === "prompt") redirect(categoryHref(category));
  const page = Number(n);
  if (!Number.isInteger(page)) notFound();
  if (page === 1) redirect(`/c/${category}`);
  return <CategoryListing category={category} page={page} />;
}
