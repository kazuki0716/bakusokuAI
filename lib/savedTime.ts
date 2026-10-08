// 「節約した時間」の記録（会員ごとのログインが無いので、この端末のブラウザ＝localStorage に保存する）。
// プロンプトをコピーして「使えた」を押すと、記事ごとの目安（frontmatter の saves）だけ時間がたまる。
// 同じ記事は1日1回まで数える。ブラウザだけで動く（サーバーでは読み込まない）
const KEY = "bk-saved-time-v1";
const EVENT = "bk-saved-time-change";
export const MONTHLY_GOAL_MIN = 600; // 爆速AIのゴール「月10時間」

type Entry = { slug: string; date: string; min: number };

export function jstDate(d = new Date()): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(d); // "2026-10-09"
}

function read(): Entry[] {
  try {
    const v = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((e) => e && typeof e.slug === "string" && typeof e.min === "number") : [];
  } catch {
    return [];
  }
}

function write(entries: Entry[]) {
  try {
    // 1年半より古い記録は消す（保存量を増やしすぎない）
    const cutoff = jstDate(new Date(Date.now() - 550 * 24 * 60 * 60 * 1000));
    window.localStorage.setItem(KEY, JSON.stringify(entries.filter((e) => e.date >= cutoff)));
  } catch {
    // 保存できない環境（プライベートモードなど）では記録しない
  }
  window.dispatchEvent(new Event(EVENT));
}

export function recordedToday(slug: string): boolean {
  const today = jstDate();
  return read().some((e) => e.slug === slug && e.date === today);
}

// 記録したら true。今日すでに記録済みなら false
export function recordUse(slug: string, min: number): boolean {
  if (recordedToday(slug)) return false;
  write([...read(), { slug, date: jstDate(), min }]);
  return true;
}

export function monthTotal(): number {
  const month = jstDate().slice(0, 7);
  return read()
    .filter((e) => e.date.startsWith(month))
    .reduce((n, e) => n + e.min, 0);
}

export function articleStats(slug: string): { count: number; min: number } {
  const list = read().filter((e) => e.slug === slug);
  return { count: list.length, min: list.reduce((n, e) => n + e.min, 0) };
}

export function onSavedTimeChange(cb: () => void): () => void {
  const storage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", storage);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", storage);
  };
}

export function formatMinutes(min: number): string {
  if (min < 60) return `${min}分`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h}時間` : `${h}時間${m}分`;
}
