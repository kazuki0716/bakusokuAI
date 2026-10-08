import { LEVELS, type Level } from "@/lib/levels";

// むずかしさの印。3本の棒のうち何本が塗られているかで段階を示す（●○○＝初級）
export function LevelBars({ n }: { n: number }) {
  return (
    <span className="lv-bars" aria-hidden="true">
      {[1, 2, 3].map((i) => (
        <i key={i} className={i <= n ? "on" : undefined} />
      ))}
    </span>
  );
}

// 「仕事：」などのラベルと見分けがつくよう、枠なし・棒つきの専用の見た目にする
export function LevelBadge({ level }: { level?: Level }) {
  if (!level) return null;
  const n = LEVELS.indexOf(level) + 1;
  return (
    <span className={`lv lv-${n}`}>
      <LevelBars n={n} />
      <span className="visually-hidden">むずかしさ：</span>
      {level}
    </span>
  );
}
