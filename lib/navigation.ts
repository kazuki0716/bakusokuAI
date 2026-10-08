import { CATEGORIES, MENU } from "./categories";
import { LECTEA_COURSES_URL, LINE_URL } from "./links";
import { MONEY_NAME } from "./money";

export type NavLink = { label: string; href: string; note?: string; external?: boolean };

// サイトの地図。フッターと /guide の「サイトの地図」で使う
export const SITE_MAP: { title: string; links: NavLink[] }[] = [
  {
    title: "読む",
    links: [
      { label: CATEGORIES.weekly.label, href: "/c/weekly", note: "毎週月曜。1週間分のランキング" },
      { label: CATEGORIES.news.label, href: "/c/news", note: "毎朝2本。AIの新機能や料金の変更" },
      { label: CATEGORIES.video.label, href: "/c/video", note: "立場別のYouTube動画と、AIで自分磨き" },
      { label: MENU[3].label, href: "/c/howto", note: "水・日は業務ごとの手順、金曜はコピーして使える指示文" },
    ],
  },
  {
    title: "探す",
    links: [
      { label: "経営者・管理職向け", href: "/for/executive" },
      { label: "事務・総務・経理向け", href: "/for/backoffice" },
      { label: "マーケ・営業向け", href: "/for/sales" },
      { label: "やりたい仕事から探す", href: "/#tasks", note: "メール・議事録・Excelなど10の仕事" },
      { label: "バックナンバー", href: "/archive", note: "月ごとの記事一覧" },
    ],
  },
  {
    title: "特典・サポート",
    links: [
      { label: `YourLife ${MONEY_NAME}`, href: "/money", note: "会員特典。お金のお得情報" },
      { label: "公式LINEで質問", href: LINE_URL, external: true, note: "記事やAIについての質問はこちら" },
    ],
  },
  {
    title: "このサイトについて",
    links: [
      { label: "サイトの見方（はじめての方へ）", href: "/guide" },
      { label: "爆速AIの講座（レクティ）", href: LECTEA_COURSES_URL, external: true },
    ],
  },
];
