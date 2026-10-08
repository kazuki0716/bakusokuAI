"use client";

import { useEffect } from "react";
import { formatMinutes, monthTotal, recordedToday, recordUse } from "@/lib/savedTime";

type Props = {
  slug: string;
  saves?: { before: number; after: number }; // この記事のプロンプト1回あたりの目安
};

// 記事本文のコードブロック（プロンプト）に「コピー」ボタンを付ける。スマホでも1タップでコピーできるように。
// saves がある記事では、コピーしたあとに「使えた」ボタンを出し、押すと節約した時間として記録する
export function CopyButtons({ slug, saves }: Props) {
  useEffect(() => {
    const blocks = document.querySelectorAll<HTMLPreElement>(".article-body pre");
    const min = saves ? saves.before - saves.after : 0;
    let ask: HTMLDivElement | null = null;

    // コピーしたブロックのすぐ下に「使えたら押してください」を出す（記事に1つだけ。別のブロックをコピーしたら移動）
    const showAsk = (after: HTMLElement) => {
      if (!saves) return;
      if (!ask) {
        ask = document.createElement("div");
        ask.className = "saved-ask";
        ask.setAttribute("role", "status");
      }
      after.after(ask);
      render();
    };

    const render = () => {
      if (!ask || !saves) return;
      ask.replaceChildren();
      const text = document.createElement("p");
      if (recordedToday(slug)) {
        text.textContent = `今日はこのプロンプトの分を記録済みです。今月の合計：${formatMinutes(monthTotal())}`;
        ask.append(text);
        return;
      }
      text.textContent = `このプロンプトは、1回あたり約${min}分の短縮が目安です（手作業${saves.before}分 → AIで${saves.after}分）。使えたら押してください。`;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "saved-ask-btn";
      btn.textContent = `使えた ✓（${min}分を記録）`;
      btn.addEventListener("click", () => {
        recordUse(slug, min);
        ask?.replaceChildren();
        const done = document.createElement("p");
        done.className = "saved-ask-done";
        done.textContent = `記録しました。今月の合計：${formatMinutes(monthTotal())}（ホームのメーターに反映されます）`;
        ask?.append(done);
      });
      ask.append(text, btn);
    };

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
          showAsk(wrap);
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
  }, [slug, saves]);

  return null;
}
