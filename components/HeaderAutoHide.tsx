"use client";

import { useEffect } from "react";

// スマホで下へ読み進めている間は上の帯を隠し、少しでも上に戻すと出す（本文を広く読めるように）。
// 帯の中にフォーカスがあるときと、ページの一番上付近では常に出す
export function HeaderAutoHide() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!header) return;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const down = y > last + 4;
      const up = y < last - 4;
      if (y < 80 || up || header.contains(document.activeElement)) header.classList.remove("is-hidden");
      else if (down) header.classList.add("is-hidden");
      if (down || up) last = y;
    };
    const onFocus = () => header.classList.remove("is-hidden");
    window.addEventListener("scroll", onScroll, { passive: true });
    header.addEventListener("focusin", onFocus);
    return () => {
      window.removeEventListener("scroll", onScroll);
      header.removeEventListener("focusin", onFocus);
    };
  }, []);
  return null;
}
