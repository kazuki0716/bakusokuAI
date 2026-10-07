export const CATEGORIES = {
  weekly: { label: "今週のTop", en: "WEEKLY TOP", description: "毎週更新：おすすめYouTube Top5と、仕事に役立つAI情報Top10" },
  news: { label: "ニュース", en: "NEWS", description: "仕事に効くAIニュースを3行で" },
  video: { label: "おすすめ動画", en: "MOVIE", description: "編集部が選んだ、見る価値のあるYouTube" },
  howto: { label: "使い方・特集", en: "HOW TO", description: "図解とスクショで分かる実践ガイド" },
  prompt: { label: "今週のプロンプト", en: "PROMPT", description: "コピペですぐ使えるプロンプト" },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export const CATEGORY_KEYS = Object.keys(CATEGORIES) as CategoryKey[];

export function isCategory(value: string): value is CategoryKey {
  return value in CATEGORIES;
}

// 会員ペルソナ（スプレッドシート「ペルソナ」シートより）
export const AUDIENCES = ["経営者・管理職", "事務・総務・経理", "マーケ・営業"] as const;
