"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { articleStats, formatMinutes, MONTHLY_GOAL_MIN, monthTotal, onSavedTimeChange } from "@/lib/savedTime";

function useSaved<T>(get: () => T, initial: T): T {
  const [value, setValue] = useState<T>(initial);
  useEffect(() => {
    setValue(get());
    return onSavedTimeChange(() => setValue(get()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return value;
}

// ホーム上部：今月節約した時間のメーター（目標10時間）。ⓘ で仕組みを短く説明する
export function SavedMeter() {
  const total = useSaved(monthTotal, 0);
  const [open, setOpen] = useState(false);
  const infoId = useId();
  const pct = Math.min(100, Math.round((total / MONTHLY_GOAL_MIN) * 100));
  const done = total >= MONTHLY_GOAL_MIN;

  return (
    <div className={`saved-meter${done ? " is-done" : ""}`}>
      <div className="saved-meter-head">
        <span className="saved-meter-label">今月節約した時間</span>
        <button
          type="button"
          className="saved-info-btn"
          aria-expanded={open}
          aria-controls={infoId}
          aria-label="今月節約した時間とは"
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true">i</span>
        </button>
        <span className="saved-meter-value">
          <strong>{formatMinutes(total)}</strong>
          <span className="saved-meter-goal"> / 目標10時間</span>
        </span>
      </div>
      <div
        className="saved-meter-bar"
        role="progressbar"
        aria-label="今月の目標10時間に対する節約時間"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <span style={{ width: `${pct}%` }} />
      </div>
      {done && <p className="saved-meter-msg">🎉 今月の目標10時間を達成しました！</p>}
      {open && (
        <p id={infoId} className="saved-meter-info">
          プロンプトやノウハウの記事で「コピー」したあと「使えた」を押すと、記事ごとの目安の時間（例：手作業30分 → AIで10分なら20分）がたまります。毎月1日に0からスタート。記録はこの端末のブラウザに保存されます（スマホとPCは別々）。
          <Link href="/guide#saved">くわしくは「サイトの見方」へ</Link>
        </p>
      )}
    </div>
  );
}

// 記事の下：このプロンプトの目安と、あなたの記録
export function ArticleSavedTime({ slug, before, after }: { slug: string; before: number; after: number }) {
  const stats = useSaved(() => articleStats(slug), { count: 0, min: 0 });
  return (
    <section className="saved-article" aria-label="このプロンプトで節約できる時間">
      <p className="saved-article-est">
        <span className="saved-article-tag">時短の目安</span>
        手作業{before}分 → AIで{after}分（1回あたり約{before - after}分の短縮）
      </p>
      <p className="saved-article-you">
        {stats.count > 0
          ? `あなたの記録：${stats.count}回・約${formatMinutes(stats.min)}を節約（この端末）`
          : "プロンプトを「コピー」して使えたら、「使えた」を押すと節約した時間がたまります。"}
      </p>
    </section>
  );
}
