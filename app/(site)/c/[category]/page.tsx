import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, CATEGORY_KEYS, isCategory } from "@/lib/categories";
import { CategoryListing } from "@/components/CategoryListing";

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
  return <CategoryListing category={category} page={1} />;
}
