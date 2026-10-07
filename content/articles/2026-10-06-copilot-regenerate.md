---
title: "Microsoft 365 Copilotに「回答を作り直す」ボタン。別のAIモデルに切り替えて答え直しも"
date: 2026-10-06
category: news
thumbLabel: "Copilot 回答の再生成"
summary:
  - Microsoft 365 Copilotに、直前の回答を作り直す「Regenerate（再生成）」が追加された（2026年10月6日のリリースノート）
  - 「もう一度試す」だけでなく、別のAIモデルに切り替えて答え直させることもできる
  - 検索結果の画面からそのままチャットで深掘りできるようになった
impact: "WordやExcelでCopilotを使っている会社では、「イマイチな回答をもらったら、聞き直す前にまず再生成」が新しい基本動作になります。同じ質問でもモデルによって得意・不得意があるので、文章づくりやデータの読み取りで比べてみるのがおすすめです。"
tags: [Copilot, Microsoft365]
audience: [経営者・管理職, 事務・総務・経理]
sources:
  - title: "Release Notes for Microsoft 365 Copilot（Microsoft Learn）"
    url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/release-notes"
  - title: "Microsoft Release Notes - October 2026（Releasebot）"
    url: "https://releasebot.io/updates/microsoft"
---

## 何が変わったの？

Microsoftは2026年10月6日のMicrosoft 365 Copilotのリリースノートで、次の2つを発表しました。

1. **回答の再生成（Regenerate）**：直前の回答が気に入らないとき、ボタンひとつで別の回答を出し直せる。「もう一度試す（Try Again）」のほかに、**AIモデルを切り替えて答え直す（Switch Model）**こともできる
2. **検索とチャットの一体化**：Microsoft 365の検索結果から、そのままチャットで追加の質問をしたり、資料の下書きを作ったりできる

<figure class="diagram">
<svg viewBox="0 0 720 190" role="img" aria-label="Copilotの回答が気に入らないとき、もう一度試すか、モデルを切り替えて答え直す流れ">
<defs><marker id="ah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-arrowhead"/></marker></defs>
<rect x="16" y="60" width="190" height="70" rx="10" class="d-box"/>
<text x="111" y="92" text-anchor="middle" class="d-text">回答がイマイチ…</text>
<text x="111" y="114" text-anchor="middle" class="d-sub">質問は書き直さない</text>
<path d="M210,95 L268,95" class="d-arrow" marker-end="url(#ah2)"/>
<rect x="274" y="60" width="160" height="70" rx="10" class="d-accent"/>
<text x="354" y="102" text-anchor="middle" class="d-text">再生成ボタン</text>
<path d="M438,95 L496,48" class="d-arrow" marker-end="url(#ah2)"/>
<path d="M438,95 L496,142" class="d-arrow" marker-end="url(#ah2)"/>
<rect x="502" y="16" width="202" height="64" rx="10" class="d-box"/>
<text x="603" y="44" text-anchor="middle" class="d-text">もう一度試す</text>
<text x="603" y="64" text-anchor="middle" class="d-sub">同じモデルで別の答え</text>
<rect x="502" y="110" width="202" height="64" rx="10" class="d-box"/>
<text x="603" y="138" text-anchor="middle" class="d-text">モデルを切り替える</text>
<text x="603" y="158" text-anchor="middle" class="d-sub">別のAIで答え直す</text>
</svg>
<figcaption>図：質問を書き直す前に「再生成」を試す</figcaption>
</figure>

<div class="shot-placeholder">📷 スクショ差し込み枠：Copilotの回答の下に表示される「再生成」ボタン<br>（編集部で撮影して <code>/images/articles/2026-10-06-copilot-regenerate/regenerate.png</code> に保存）</div>

## 使いどころ

- **メールや報告文の言い回しを比べたいとき**：再生成を2〜3回押して、いちばん良いものを選ぶ
- **数字の読み取りに不安があるとき**：モデルを切り替えて答えが同じか確認する（違ったら元データを確認）

<div class="note">機能の展開は会社（テナント）ごとに順次行われるため、まだボタンが表示されない場合があります。また、選べるモデルは契約や管理者の設定によって異なります。</div>
