import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { categoryHref, CATEGORY_KEYS, isCategory, listLabel } from "@/lib/categories";
import { CategoryListing } from "@/components/CategoryListing";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return CATEGORY_KEYS.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  return { title: isCategory(category) ? listLabel(category) : undefined };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!isCategory(category)) notFound();
  // プロンプトは「使い方・プロンプト」の一覧にまとめた（以前のURLから移動させる）
  if (category === "prompt") redirect(categoryHref(category));
  return <CategoryListing category={category} page={1} />;
}
