"use client";

import { useEffect, useRef } from "react";

// 数字を0から数え上げる。最初から最終値をHTMLに書いておき（読み上げ・JSなし用）、表示だけ動かす
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || value <= 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const duration = 1200;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = String(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      el.textContent = String(value);
    };
  }, [value]);

  return (
    <span ref={ref} className="stat-num">
      {value}
    </span>
  );
}
