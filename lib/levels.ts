import type { Article } from "./articles";

// 記事のむずかしさ。定義は docs/editorial-guide.md の「むずかしさ（level）」と同じにすること
export const LEVELS = ["初級", "中級", "上級"] as const;
export type Level = (typeof LEVELS)[number];

export function levelCounts(articles: Article[]): Record<Level, number> {
  const counts = { 初級: 0, 中級: 0, 上級: 0 };
  for (const a of articles) if (a.level) counts[a.level] += 1;
  return counts;
}
