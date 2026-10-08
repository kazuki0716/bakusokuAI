"use client";

import { useEffect, useRef, useState } from "react";
import { LEVELS, type Level } from "@/lib/levels";
import { LevelBars } from "./LevelBadge";

// むずかしさ（初級・中級・上級）で、この中の記事カードを絞り込む。
// カードの <li data-level="初級"> を見て隠し、記事が1本も残らないまとまり（.persona-block）も隠す
// total：一覧の記事の本数（むずかしさの無い「今週のTop」も含む）。省略時は3段階の合計
export function LevelFilter({
  counts,
  total: totalAll,
  children,
}: {
  counts: Record<Level, number>;
  total?: number;
  children: React.ReactNode;
}) {
  const [level, setLevel] = useState<Level | "all">("all");
  const [empty, setEmpty] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = box.current;
    if (!root) return;
    root.querySelectorAll<HTMLElement>("li.card").forEach((li) => {
      li.hidden = level !== "all" && li.dataset.level !== level;
    });
    root.querySelectorAll<HTMLElement>(".persona-block, [data-filter-group]").forEach((g) => {
      g.hidden = level !== "all" && !g.querySelector("li.card:not([hidden])");
    });
    setEmpty(level !== "all" && !root.querySelector("li.card:not([hidden])"));
  }, [level]);

  const leveled = LEVELS.reduce((n, l) => n + counts[l], 0);
  if (leveled === 0) return <>{children}</>;
  const total = totalAll ?? leveled;

  const options: { key: Level | "all"; label: string; count: number }[] = [
    { key: "all", label: "すべて", count: total },
    ...LEVELS.map((l) => ({ key: l, label: l, count: counts[l] })),
  ];

  return (
    <div ref={box}>
      <div className="level-filter" role="group" aria-label="むずかしさで絞り込む">
        <span className="level-filter-label" aria-hidden="true">
          むずかしさ
        </span>
        {options.map((o) => (
          <button
            key={o.key}
            type="button"
            className={`level-filter-btn${o.key !== "all" ? ` lv-${LEVELS.indexOf(o.key) + 1}` : ""}`}
            aria-pressed={level === o.key}
            disabled={o.count === 0}
            onClick={() => setLevel(o.key)}
          >
            {o.key !== "all" && <LevelBars n={LEVELS.indexOf(o.key) + 1} />}
            {o.label}
            <span className="level-filter-count">{o.count}</span>
          </button>
        ))}
      </div>
      <p className="visually-hidden" aria-live="polite">
        {level === "all" ? "" : `${level}の記事だけを表示しています`}
      </p>
      {children}
      {empty && (
        <p className="empty">
          このページには{level}の記事がありません。
          <button type="button" className="level-filter-reset" onClick={() => setLevel("all")}>
            すべて表示する
          </button>
        </p>
      )}
    </div>
  );
}
