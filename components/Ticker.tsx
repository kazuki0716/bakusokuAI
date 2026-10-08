"use client";

import { useEffect, useState } from "react";

// 新着の見出しが流れる帯（ブランドの演出）。止めたい人のために一時停止ボタンを付ける（WCAG 2.2.2）。
// パソコンの「動きを減らす」設定がオンの人には、横に流さず、見出しを5秒ごとに切り替えて見せる
export function Ticker({ items }: { items: string[] }) {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!reduced || paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % items.length), 5000);
    return () => window.clearInterval(id);
  }, [reduced, paused, items.length]);

  return (
    <div className={`ticker${paused ? " is-paused" : ""}${reduced ? " is-stepped" : ""}`}>
      <span className="ticker-label" aria-hidden="true">
        LATEST
      </span>
      <div className="ticker-window" aria-hidden="true">
        {reduced ? (
          <span key={index} className="ticker-item ticker-step">
            {items[index]}
          </span>
        ) : (
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
        )}
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
