"use client";

import { useState } from "react";

// 新着の見出しが流れる帯（ブランドの演出）。止めたい人のために一時停止ボタンを付ける（WCAG 2.2.2）
export function Ticker({ items }: { items: string[] }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className={`ticker${paused ? " is-paused" : ""}`}>
      <span className="ticker-label" aria-hidden="true">
        LATEST
      </span>
      <div className="ticker-window" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((n) => (
            <span key={n} className="ticker-group">
              {items.map((t) => (
                <span key={t} className="ticker-item">
                  {t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="ticker-toggle"
        aria-pressed={paused}
        aria-label={paused ? "流れる見出しを再生する" : "流れる見出しを一時停止する"}
        onClick={() => setPaused((p) => !p)}
      >
        <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
      </button>
    </div>
  );
}
