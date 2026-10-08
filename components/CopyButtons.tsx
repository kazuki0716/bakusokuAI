"use client";

import { useEffect } from "react";

// 記事本文のコードブロック（プロンプト）に「コピー」ボタンを付ける。スマホでも1タップでコピーできるように
export function CopyButtons() {
  useEffect(() => {
    const blocks = document.querySelectorAll<HTMLPreElement>(".article-body pre");
    blocks.forEach((pre) => {
      if (pre.parentElement?.classList.contains("code-wrap")) return;
      const wrap = document.createElement("div");
      wrap.className = "code-wrap";
      pre.before(wrap);
      wrap.append(pre);

      const button = document.createElement("button");
      button.type = "button";
      button.className = "copy-btn";
      button.textContent = "コピー";
      const status = document.createElement("span");
      status.className = "visually-hidden";
      status.setAttribute("aria-live", "polite");

      button.addEventListener("click", async () => {
        const text = pre.innerText.replace(/\n$/, "");
        try {
          await navigator.clipboard.writeText(text);
          button.textContent = "コピーしました";
          button.classList.add("is-done");
          status.textContent = "プロンプトをコピーしました";
        } catch {
          button.textContent = "コピーできませんでした";
          status.textContent = "コピーできませんでした。長押しで選んでコピーしてください";
        }
        window.setTimeout(() => {
          button.textContent = "コピー";
          button.classList.remove("is-done");
        }, 2000);
      });
      wrap.append(button, status);
    });
  }, []);

  return null;
}
