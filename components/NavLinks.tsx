"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU } from "@/lib/categories";
import { HeaderIcon } from "./HeaderIcon";

// ヘッダーのメニュー（ホーム＋カテゴリ）。今いるページを aria-current と見た目で示す
export function NavLinks({ moneyName }: { moneyName: string }) {
  const pathname = usePathname();
  const current = (href: string) => (pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined);

  return (
    <nav className="nav" aria-label="メニュー">
      {/* ロゴ以外にも、どの幅でも先頭に「ホーム」を置く */}
      <Link href="/" className="nav-link nav-home" aria-current={pathname === "/" ? "page" : undefined}>
        <HeaderIcon name="home" />
        ホーム
      </Link>
      {MENU.map((m) => (
        <Link key={m.key} href={`/c/${m.key}`} className={`nav-link nav-${m.key}`} aria-current={current(`/c/${m.key}`)}>
          {m.label}
        </Link>
      ))}
      {/* 会員特典（AI情報とは別枠）。PC・タブレットはヘッダー右上のボタン、スマホだけここに区切って置く */}
      <Link href="/money" className="nav-link nav-money" aria-current={current("/money")} aria-label={`会員特典：${moneyName}`}>
        <HeaderIcon name="gift" />
        特典
      </Link>
    </nav>
  );
}
