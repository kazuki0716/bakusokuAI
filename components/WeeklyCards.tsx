import Link from "next/link";
import { formatDate, type Article } from "@/lib/articles";

// 今週のTop：AI情報Top5（記事で読む）とYouTube動画Top5（動画で見る）。
// ホームと「今週のTop」一覧で同じカードを使い、どこで見ても同じものだと分かるようにする
const WEEKLY_KINDS = {
  info: {
    chip: "記事で読む",
    name: "AI情報",
    use: "今週のニュースから、仕事に効くものだけ",
    cta: "読む",
    unit: "本",
  },
  video: {
    chip: "動画で見る",
    name: "YouTube動画",
    use: "スキマ時間に見られる、仕事向けの動画",
    cta: "見る",
    unit: "本",
  },
} as const;

export function weeklyKind(a: Article): keyof typeof WEEKLY_KINDS {
  return a.ranking.some((r) => r.youtube) ? "video" : "info";
}

// タイトルから「今週の〜Top5｜」と「（10月第2週）」を外して、今週の中身だけを残す
function weeklyHighlight(title: string) {
  const body = title.includes("｜") ? title.slice(title.indexOf("｜") + 1) : title;
  return body.replace(/（[^（）]*第\d週）\s*$/, "").trim();
}

function weeklyPeriod(title: string) {
  return title.match(/（([^（）]*第\d週)）\s*$/)?.[1];
}

// 最新のAI情報・YouTube動画を1本ずつ（この順）。list は新しい順の「今週のTop」記事
export function latestWeeklyPair(list: Article[]): Article[] {
  return (["info", "video"] as const)
    .map((kind) => list.find((a) => a.category === "weekly" && weeklyKind(a) === kind))
    .filter((a): a is Article => Boolean(a));
}

// その種類の短い名前（一覧のラベル用）：AI情報 Top5 ／ YouTube動画 Top5
export function weeklyShortName(a: Article): string {
  return `${WEEKLY_KINDS[weeklyKind(a)].name} Top${a.ranking.length}`;
}

export function WeeklyCards({ articles }: { articles: Article[] }) {
  return (
    <ul className="weekly-cards">
      {articles.map((a) => {
        const kind = weeklyKind(a);
        const k = WEEKLY_KINDS[kind];
        const period = weeklyPeriod(a.title);
        // 文字入りの自動生成アイキャッチは背景にしない（文字が重なって読めなくなるため）
        const photo = a.image && !a.image.startsWith("/eyecatch/") ? a.image : undefined;
        return (
          <li key={a.slug}>
            <Link
              href={`/articles/${a.slug}`}
              className={`weekly-card weekly-card-${kind}${photo ? " weekly-card-photo" : ""}`}
              style={photo ? { backgroundImage: `url("${photo}")` } : undefined}
              aria-label={`${k.name} Top${a.ranking.length}（${period ?? formatDate(a.date)}）を${k.cta}`}
            >
              <span className="weekly-kind">
                <span className="weekly-kind-chip">
                  {kind === "video" ? (
                    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                      <path d="M4 2.5v11l9.5-5.5z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                      <path
                        d="M3 3h10M3 6.5h10M3 10h7M3 13.5h5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                  {k.chip}
                </span>
                {period && <span className="weekly-period">{period}</span>}
              </span>
              <span className="weekly-count">
                <span className="weekly-count-name">{k.name}</span>
                <span className="weekly-count-top">
                  TOP<strong>{a.ranking.length}</strong>
                </span>
              </span>
              <span className="weekly-use">{k.use}</span>
              <span className="weekly-title">
                <span className="visually-hidden">今週の中身：</span>
                {weeklyHighlight(a.title)}
              </span>
              <span className="weekly-mini">
                {a.ranking.slice(0, 3).map((r, i) => (
                  <span key={r.url} className="weekly-mini-item" style={{ "--i": i } as React.CSSProperties}>
                    <span className="weekly-mini-no">{i + 1}</span>
                    {r.title}
                  </span>
                ))}
              </span>
              <span className="weekly-go">
                {a.ranking.length}
                {k.unit}を{k.cta}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
