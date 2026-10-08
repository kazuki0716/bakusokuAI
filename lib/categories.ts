// 記事カテゴリの定義。docs/editorial-guide.md の「3. 記事の種類」と同じ内容にすること
export const CATEGORIES = {
  weekly: {
    label: "今週のTop",
    en: "WEEKLY TOP",
    description: "毎週月曜更新。記事で読む「AI情報Top10」と、動画で見る「YouTube動画Top5」の2つのランキング。",
  },
  news: {
    label: "ニュース",
    en: "NEWS",
    description: "ChatGPT・Gemini・Claude・Copilotなどの新機能や、料金・規約の変更、企業の活用事例を、元記事つきで3分で読める速報に。",
  },
  video: {
    label: "動画",
    en: "MOVIE",
    description: "経営者・管理職／事務・総務・経理／マーケ・営業の立場ごとに、仕事に直結するYouTube動画を編集部が1本ずつ厳選。英語学習や調べものなど、毎日使える「AIで自分磨き」の動画も。",
  },
  howto: {
    label: "ノウハウ",
    en: "KNOW-HOW",
    description: "メール返信・議事録・Excelなど10の仕事ごとに、図解と画面イメージで手順を解説する実践ガイド。",
  },
  prompt: {
    label: "プロンプト",
    en: "PROMPT",
    description: "コピーしてすぐ使えるプロンプトを、使う場面とコツつきで紹介。",
  },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export const CATEGORY_KEYS = Object.keys(CATEGORIES) as CategoryKey[];

export function isCategory(value: string): value is CategoryKey {
  return value in CATEGORIES;
}

// 上のメニュー（PC）と下のメニュー（スマホ）で同じ名前を使う。読者の目的（やり方を知りたい）が同じなので、
// howto と prompt は1つの一覧「ノウハウ」にまとめる
// （記事の種類としては別のまま。一覧は /c/howto で、プロンプトはその中の #prompt）
export const MENU: { key: CategoryKey; label: string; en: string; description: string; cats: CategoryKey[] }[] = [
  { key: "weekly", ...CATEGORIES.weekly, cats: ["weekly"] },
  { key: "news", ...CATEGORIES.news, cats: ["news"] },
  { key: "video", ...CATEGORIES.video, cats: ["video"] },
  {
    key: "howto",
    label: "ノウハウ",
    en: "KNOW-HOW & PROMPT",
    description: "メール返信・議事録・Excelなど10の仕事ごとの手順解説と、コピーしてすぐ使えるプロンプト。",
    cats: ["howto", "prompt"],
  },
];

// その種類の記事一覧へのリンク
export function categoryHref(category: CategoryKey): string {
  return category === "prompt" ? "/c/howto#prompt" : `/c/${category}`;
}

// その種類の記事一覧の名前（「〜の一覧へ戻る」などで使う）
export function listLabel(category: CategoryKey): string {
  return MENU.find((m) => m.cats.includes(category))?.label ?? CATEGORIES[category].label;
}

// 会員ペルソナ（スプレッドシート「ペルソナ」シート・営業資料_V04 より）
export const AUDIENCES = ["経営者・管理職", "事務・総務・経理", "マーケ・営業"] as const;

// 立場別ページ（/for/[slug]）
export const PERSONAS = [
  { slug: "executive", name: "経営者・管理職", lead: "会社にAIを入れる判断と、最初の一歩", video: "火曜" },
  { slug: "backoffice", name: "事務・総務・経理", lead: "Excel・議事録・メールを明日から楽に", video: "木曜" },
  { slug: "sales", name: "マーケ・営業", lead: "提案書や分析を速く。新しいツールで差をつける", video: "土曜" },
] as const;

// 動画の「AIで自分磨き」枠（ペルソナを問わず、仕事以外でも毎日使えるAI活用の動画）
export const SKILLUP = {
  label: "AIで自分磨き",
  description: "英語の勉強、ChatGPTとの音声会話での調べもの、学び直しなど、毎日の暮らしで使えるAI活用",
  themes: ["英語・語学", "調べもの・情報収集", "学び直し・資格", "アイデア出し・壁打ち", "暮らし・健康"],
} as const;

// 爆速AI 業務効率化コースの10カテゴリ（営業資料_V04 のカリキュラム構成より）。slug は業務別ページ（/tasks/[slug]）のURL
export const TASK_LIST = [
  // tags：task が付いていなくても、このキーワードを持つ記事はこの業務の記事として出す
  { slug: "email", name: "メール返信", tags: ["メール", "メール返信"] },
  { slug: "writing", name: "文章作成", tags: ["文章作成"] },
  { slug: "summary", name: "文章の要約", tags: ["要約"] },
  { slug: "proofreading", name: "文章の校正・添削", tags: ["校正", "添削"] },
  { slug: "data", name: "会議資料のデータ分析", tags: ["データ分析"] },
  { slug: "minutes", name: "議事録作成", tags: ["議事録", "議事録作成"] },
  { slug: "audio-transcription", name: "録音の文字起こし", tags: ["文字起こし", "録音"] },
  { slug: "image-transcription", name: "画像の文字起こし", tags: ["画像の文字起こし", "OCR"] },
  { slug: "slides", name: "プレゼン資料作成", tags: ["プレゼン資料作成", "PowerPoint", "スライド"] },
  { slug: "excel", name: "Excel活用", tags: ["Excel", "Excel活用"] },
] as const;

export type Task = (typeof TASK_LIST)[number];

// その業務の記事か（task が一致、または業務に対応するキーワードを持つ）
export function isForTask(article: { task?: string; tags: string[] }, task: Task): boolean {
  return article.task === task.name || article.tags.some((t) => (task.tags as readonly string[]).includes(t));
}

export const TASKS = TASK_LIST.map((t) => t.name);
