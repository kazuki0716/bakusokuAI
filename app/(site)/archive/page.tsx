import type { Metadata } from "next";
import Link from "next/link";
import { formatMonth, getAllArticles, monthKey } from "@/lib/articles";
import { CATEGORIES, CATEGORY_KEYS } from "@/lib/categories";

export const metadata: Metadata = { title: "バックナンバー" };

// 月ごとの記事数の一覧
export default function ArchivePage() {
  const months = new Map<string, Record<string, number>>();
  for (const a of getAllArticles()) {
    const key = monthKey(a.date);
    const counts = months.get(key) ?? {};
    counts[a.category] = (counts[a.category] ?? 0) + 1;
    months.set(key, counts);
  }

  return (
    <section>
      <header className="page-head">
        <p className="page-en">ARCHIVE</p>
        <h1 className="page-title">バックナンバー</h1>
        <p className="page-desc">これまでに公開した記事を、月ごとにまとめています。</p>
      </header>
      <ul className="archive-months">
        {[...months.entries()].map(([key, counts]) => (
          <li key={key}>
            <Link href={`/archive/${key}`} className="archive-month">
              <span className="archive-month-name">{formatMonth(key)}</span>
              <span className="archive-month-counts">
                {CATEGORY_KEYS.filter((c) => counts[c]).map((c) => (
                  <span key={c} className={`cat cat-${c}`}>
                    {CATEGORIES[c].label} {counts[c]}
                  </span>
                ))}
              </span>
              <span className="archive-month-total">
                {Object.values(counts).reduce((s, n) => s + n, 0)}本 →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
