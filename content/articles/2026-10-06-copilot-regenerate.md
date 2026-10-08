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
level: 初級
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
<svg viewBox="0 0 720 420" role="img" aria-label="Copilotの回答が気に入らないとき、もう一度試すか、モデルを切り替えて答え直す流れ">
<defs><marker id="ah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-arrowhead"/></marker></defs>
<rect x="16" y="16" width="688" height="110" rx="14" class="d-box"/>
<text x="360" y="63" text-anchor="middle" class="d-text" font-size="28">回答がイマイチ…</text>
<text x="360" y="105" text-anchor="middle" class="d-sub" font-size="26">質問は書き直さない</text>
<path d="M360,130 L360,156" class="d-arrow" marker-end="url(#ah2)"/>
<rect x="16" y="166" width="688" height="80" rx="14" class="d-accent"/>
<text x="360" y="216" text-anchor="middle" class="d-text" font-size="28">再生成ボタン</text>
<path d="M340,250 L196,286" class="d-arrow" marker-end="url(#ah2)"/>
<path d="M380,250 L524,286" class="d-arrow" marker-end="url(#ah2)"/>
<rect x="16" y="294" width="336" height="110" rx="14" class="d-box"/>
<text x="184" y="341" text-anchor="middle" class="d-text" font-size="28">もう一度試す</text>
<text x="184" y="383" text-anchor="middle" class="d-sub" font-size="26">同じモデルで別の答え</text>
<rect x="368" y="294" width="336" height="110" rx="14" class="d-box"/>
<text x="536" y="341" text-anchor="middle" class="d-text" font-size="28">モデルを切り替える</text>
<text x="536" y="383" text-anchor="middle" class="d-sub" font-size="26">別のAIで答え直す</text>
</svg>
<figcaption>図：質問を書き直す前に「再生成」を試す</figcaption>
</figure>

<figure class="diagram">
<svg viewBox="0 0 720 512" role="img" aria-label="画面イメージ：Copilotの回答の下にある再生成ボタンを押すと、もう一度試す・モデルを切り替えるが選べる">
<rect x="16" y="12" width="688" height="488" rx="14" class="d-screen"/>
<rect x="44" y="36" width="632" height="130" rx="12" class="d-box"/>
<text x="64" y="78" class="d-text" font-size="28">Copilotの回答</text>
<rect x="64" y="98" width="560" height="10" rx="5" class="d-accent"/>
<rect x="64" y="118" width="480" height="10" rx="5" class="d-accent"/>
<rect x="64" y="138" width="360" height="10" rx="5" class="d-accent"/>
<rect x="44" y="190" width="60" height="48" rx="10" class="d-box"/>
<text x="74" y="224" text-anchor="middle" class="d-sub" font-size="26">👍</text>
<rect x="116" y="190" width="60" height="48" rx="10" class="d-box"/>
<text x="146" y="224" text-anchor="middle" class="d-sub" font-size="26">👎</text>
<rect x="188" y="190" width="60" height="48" rx="10" class="d-box"/>
<text x="218" y="225" text-anchor="middle" class="d-text" font-size="28">⟳</text>
<rect x="180" y="182" width="76" height="64" rx="12" class="d-mark"/>
<circle cx="180" cy="182" r="20" class="d-mark-dot"/>
<text x="180" y="191" text-anchor="middle" class="d-mark-num" font-size="26">1</text>
<rect x="210" y="270" width="400" height="120" rx="12" class="d-box"/>
<text x="236" y="314" class="d-text" font-size="28">もう一度試す</text>
<text x="236" y="366" class="d-text" font-size="28">モデルを切り替える ›</text>
<rect x="222" y="334" width="376" height="46" rx="10" class="d-mark"/>
<circle cx="598" cy="334" r="20" class="d-mark-dot"/>
<text x="598" y="343" text-anchor="middle" class="d-mark-num" font-size="26">2</text>
<text x="44" y="440" class="d-sub" font-size="26">① 回答の下の再生成ボタンを押す</text>
<text x="44" y="478" class="d-sub" font-size="26">② 別のモデルで答え直すこともできる</text>
</svg>
<figcaption>画面イメージ：回答の下の再生成ボタンから選ぶ（実際の画面とボタンの位置・形は異なる場合があります）</figcaption>
</figure>

## 使いどころ

- **メールや報告文の言い回しを比べたいとき**：再生成を2〜3回押して、いちばん良いものを選ぶ
- **数字の読み取りに不安があるとき**：モデルを切り替えて答えが同じか確認する（違ったら元データを確認）

<div class="note">機能の展開は会社（テナント）ごとに順次行われるため、まだボタンが表示されない場合があります。また、選べるモデルは契約や管理者の設定によって異なります。</div>
