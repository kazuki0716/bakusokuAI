// 記事カテゴリの定義。docs/editorial-guide.md の「3. 記事の種類」と同じ内容にすること
export const CATEGORIES = {
  weekly: {
    label: "今週のTop",
    en: "WEEKLY TOP",
    description: "毎週月曜更新。今週見るべきYouTube動画Top5と、仕事に役立つAI情報Top10のランキング。",
  },
  news: {
    label: "ニュース",
    en: "NEWS",
    description: "ChatGPT・Gemini・Claude・Copilotなどの新機能や、料金・規約の変更、企業の活用事例を、元記事つきで3分で読める速報に。",
  },
  video: {
    label: "おすすめ動画",
    en: "MOVIE",
    description: "経営者・管理職／事務・総務・経理／マーケ・営業の立場ごとに、仕事に直結するYouTube動画を編集部が1本ずつ厳選。英語学習や調べものなど、毎日使える「AIで自分磨き」の動画も。",
  },
  howto: {
    label: "使い方・特集",
    en: "HOW TO",
    description: "メール返信・議事録・Excelなど10の業務ごとに、図解と画面イメージで手順を解説する実践ガイド。",
  },
  prompt: {
    label: "今週のプロンプト",
    en: "PROMPT",
    description: "コピーしてすぐ使えるプロンプトを、使う場面とコツつきで紹介。",
  },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export const CATEGORY_KEYS = Object.keys(CATEGORIES) as CategoryKey[];

export function isCategory(value: string): value is CategoryKey {
  return value in CATEGORIES;
}

// 会員ペルソナ（スプレッドシート「ペルソナ」シート・営業資料_V04 より）
export const AUDIENCES = ["経営者・管理職", "事務・総務・経理", "マーケ・営業"] as const;

// おすすめ動画の「AIで自分磨き」枠（ペルソナを問わず、仕事以外でも毎日使えるAI活用の動画）
export const SKILLUP = {
  label: "AIで自分磨き",
  description: "英語の勉強、ChatGPTとの音声会話での調べもの、学び直しなど、毎日の暮らしで使えるAI活用",
  themes: ["英語・語学", "調べもの・情報収集", "学び直し・資格", "アイデア出し・壁打ち", "暮らし・健康"],
} as const;

// 爆速AI 業務効率化コースの10カテゴリ（営業資料_V04 のカリキュラム構成より）
export const TASKS = [
  "メール返信",
  "文章作成",
  "文章の要約",
  "文章の校正・添削",
  "会議資料のデータ分析",
  "議事録作成",
  "録音の文字起こし",
  "画像の文字起こし",
  "プレゼン資料作成",
  "Excel活用",
] as const;
