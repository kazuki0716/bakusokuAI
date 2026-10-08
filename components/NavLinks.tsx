"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES, CATEGORY_KEYS } from "@/lib/categories";

// ヘッダーのカテゴリナビ。今いるページを aria-current と見た目で示す
export function NavLinks({ moneyName }: { moneyName: string }) {
  const pathname = usePathname();
  const current = (href: string) => (pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined);

  return (
    <nav className="nav" aria-label="カテゴリ">
      {CATEGORY_KEYS.map((key) => (
        <Link key={key} href={`/c/${key}`} className={`nav-link nav-${key}`} aria-current={current(`/c/${key}`)}>
          {CATEGORIES[key].label}
        </Link>
      ))}
      {/* 会員特典はメインではないので、最後に控えめに */}
      <Link href="/money" className="nav-link nav-money" aria-current={current("/money")}>
        <span className="nav-money-tag">特典</span>
        {moneyName}
      </Link>
    </nav>
  );
}
