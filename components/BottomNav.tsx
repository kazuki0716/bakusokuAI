"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU } from "@/lib/categories";
import { HeaderIcon, type IconName } from "./HeaderIcon";

const ICONS: Record<string, IconName> = { weekly: "top", news: "news", video: "video", howto: "howto" };

// スマホだけの、画面の下に固定するメニュー（ホーム＋4つ）。PC・タブレットは上のメニューを使う
export function BottomNav() {
  const pathname = usePathname();
  const items = [
    { href: "/", label: "ホーム", icon: "home" as IconName, current: pathname === "/" },
    ...MENU.map((m) => ({
      href: `/c/${m.key}`,
      label: m.label,
      icon: ICONS[m.key],
      current: pathname === `/c/${m.key}` || pathname.startsWith(`/c/${m.key}/`),
    })),
  ];
  return (
    <nav className="bottom-nav" aria-label="メニュー">
      {items.map((it) => (
        <Link key={it.href} href={it.href} className="bottom-nav-link" aria-current={it.current ? "page" : undefined}>
          <HeaderIcon name={it.icon} size={22} />
          <span>{it.label}</span>
        </Link>
      ))}
    </nav>
  );
}
