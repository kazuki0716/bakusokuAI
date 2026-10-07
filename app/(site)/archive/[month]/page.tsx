import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, formatMonth, getAllArticles, monthKey } from "@/lib/articles";
import { CATEGORIES, CATEGORY_KEYS } from "@/lib/categories";
import { CategoryLabel } from "@/components/ArticleParts";

type Props = { params: Promise<{ month: string }> };

export function generateStaticParams() {
  return [...new Set(getAllArticles().map((a) => monthKey(a.date)))].map((month) => ({ month }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { month } = await params;
  return { title: `${formatMonth(month)}のバックナンバー` };
}

// その月の記事を、カテゴリごとに文字だけの軽い一覧で並べる
export default async function ArchiveMonthPage({ params }: Props) {
  const { month } = await params;
  const list = getAllArticles().filter((a) => monthKey(a.date) === month);
  if (list.length === 0) notFound();

  return (
    <section>
      <header className="page-head">
        <p className="page-en">ARCHIVE</p>
        <h1 className="page-title">{formatMonth(month)}のバックナンバー</h1>
        <p className="page-desc">
          {list.length}本の記事　<Link href="/archive">← 月の一覧へ</Link>
        </p>
      </header>
      {CATEGORY_KEYS.map((c) => {
        const items = list.filter((a) => a.category === c);
        if (items.length === 0) return null;
        return (
          <section key={c} className="archive-group">
            <h2 className="persona-title">{CATEGORIES[c].label}</h2>
            <ul className="archive-list">
              {items.map((a) => (
                <li key={a.slug}>
                  <Link href={`/articles/${a.slug}`}>
                    <time>{formatDate(a.date)}</time>
                    <CategoryLabel article={a} />
                    <span className="archive-title">{a.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </section>
  );
}
