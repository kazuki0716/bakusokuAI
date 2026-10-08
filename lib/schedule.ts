import type { CategoryKey } from "./categories";

// 更新スケジュール。docs/editorial-guide.md 3章「曜日ごとの更新スケジュール」と同じ内容にすること
export const UPDATE_HOUR = 7; // 毎朝7時ごろ更新
export const DAILY = "ニュース2本";

export const SCHEDULE: { wd: number; short: string; extra: string; detail: string; href: string; cat: CategoryKey }[] = [
  { wd: 1, short: "月", extra: "今週のTop", detail: "今週のTop（AI情報Top10・YouTube動画Top5）＋AIで自分磨きの動画", href: "/c/weekly", cat: "weekly" },
  { wd: 2, short: "火", extra: "経営者・管理職向け動画", detail: "経営者・管理職向けの動画", href: "/c/video", cat: "video" },
  { wd: 3, short: "水", extra: "使い方・特集", detail: "使い方・特集", href: "/c/howto", cat: "howto" },
  { wd: 4, short: "木", extra: "事務・総務・経理向け動画", detail: "事務・総務・経理向けの動画", href: "/c/video", cat: "video" },
  { wd: 5, short: "金", extra: "プロンプト", detail: "プロンプト", href: "/c/howto#prompt", cat: "prompt" },
  { wd: 6, short: "土", extra: "マーケ・営業向け動画", detail: "マーケ・営業向けの動画", href: "/c/video", cat: "video" },
  { wd: 0, short: "日", extra: "使い方・特集", detail: "使い方・特集", href: "/c/howto", cat: "howto" },
];

const TZ = "Asia/Tokyo";

export type Today = { ymd: string; m: number; d: number; wd: number; hour: number };

// 日本時間の今日（サーバーはUTCで動くので、必ずこれを使う）
export function todayJST(now = new Date()): Today {
  const ymd = new Intl.DateTimeFormat("sv-SE", { timeZone: TZ }).format(now); // "2026-10-08"
  const [y, m, d] = ymd.split("-").map(Number);
  const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const hour = Number(new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", hourCycle: "h23" }).format(now));
  return { ymd, m, d, wd, hour };
}

function addDays(ymd: string, days: number): string {
  const t = new Date(`${ymd}T00:00:00Z`);
  t.setUTCDate(t.getUTCDate() + days);
  return t.toISOString().slice(0, 10);
}

// その週の月曜日
export function mondayOf(today: Today): string {
  return addDays(today.ymd, -((today.wd + 6) % 7));
}

// 次の月曜日（今日が月曜なら来週の月曜）
export function nextMonday(today: Today): string {
  return addDays(today.ymd, 7 - ((today.wd + 6) % 7));
}

export function shortDate(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const wd = "日月火水木金土"[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${m}/${d}(${wd})`;
}
