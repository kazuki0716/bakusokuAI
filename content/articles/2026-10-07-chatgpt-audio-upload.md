---
title: "ChatGPTに会議の録音をそのまま渡せる時代に。文字起こし・要約・次のアクションまで一気に"
date: 2026-10-07
category: news
pickup: false
thumbLabel: "録音ファイル → 議事録"
summary:
  - ChatGPTに音声ファイルをアップロードすると、文字起こし・要約・内容への質問ができるようになった（2026年10月6日のリリースノート）
  - 有料プランとワークスペース（法人プラン）が対象。無料プランは対象外と報じられている
  - Zoom・Google Meet・Teamsの録画音声から、議事録やお礼メールまでChatGPTだけで完結できる
impact: "爆速AIの初級レシピ「議事録作成」「録音の文字起こし」が、Nottaなど別ツールを使わずChatGPTだけでできるようになります。会議1回あたり30分前後かかっていた議事録づくりが、確認作業だけで済むようになるはずです。まずは社内の定例会議など、外部に出しても問題ない録音から試してみてください。"
tags: [ChatGPT, 議事録, 文字起こし, 会議]
audience: [経営者・管理職, 事務・総務・経理, マーケ・営業]
level: 初級
sources:
  - title: "ChatGPT Audio Uploads Add Transcripts for Paid Plans（DigitBin）"
    url: "https://www.digitbin.com/chatgpt-audio-uploads-transcripts/"
  - title: "ChatGPT Now Transcribes Zoom and Meet Recordings（Inside AI News）"
    url: "https://insideai.news/news/ai-tools/chatgpt-audio-transcription/13759/"
  - title: "ChatGPT Updates by OpenAI - October 2026（Releasebot）"
    url: "https://releasebot.io/updates/openai/chatgpt"
---

## 何が変わったの？

OpenAIは2026年10月6日のリリースノートで、**ChatGPTに音声ファイルをアップロードすると「文字起こし」「要約」「話の内容への質問」ができる**ようになったと発表しました。

これまでも、ChatGPTに話しかける「音声入力」や、その場で録音する機能はありました。今回は**すでに録ってある会議の録音ファイル**をそのまま渡せるようになったのがポイントです。

<figure class="diagram">
<svg viewBox="0 0 720 230" role="img" aria-label="録音ファイルをChatGPTにアップロードすると、文字起こし・要約・ToDo・お礼メールが作れる流れの図">
<defs><marker id="ah1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-arrowhead"/></marker></defs>
<rect x="16" y="75" width="170" height="80" rx="10" class="d-box"/>
<text x="101" y="110" text-anchor="middle" class="d-text">会議の録音</text>
<text x="101" y="132" text-anchor="middle" class="d-sub">Zoom / Meet / Teams</text>
<path d="M190,115 L262,115" class="d-arrow" marker-end="url(#ah1)"/>
<rect x="268" y="65" width="170" height="100" rx="10" class="d-accent"/>
<text x="353" y="108" text-anchor="middle" class="d-text">ChatGPT</text>
<text x="353" y="130" text-anchor="middle" class="d-sub">ファイルをアップロード</text>
<path d="M442,115 L492,40" class="d-arrow" marker-end="url(#ah1)"/>
<path d="M442,115 L492,92" class="d-arrow" marker-end="url(#ah1)"/>
<path d="M442,115 L492,140" class="d-arrow" marker-end="url(#ah1)"/>
<path d="M442,115 L492,190" class="d-arrow" marker-end="url(#ah1)"/>
<rect x="498" y="18" width="206" height="42" rx="8" class="d-box"/>
<text x="601" y="45" text-anchor="middle" class="d-text">① 文字起こし</text>
<rect x="498" y="70" width="206" height="42" rx="8" class="d-box"/>
<text x="601" y="97" text-anchor="middle" class="d-text">② 要約・議事録</text>
<rect x="498" y="120" width="206" height="42" rx="8" class="d-box"/>
<text x="601" y="147" text-anchor="middle" class="d-text">③ ToDo・決定事項</text>
<rect x="498" y="170" width="206" height="42" rx="8" class="d-box"/>
<text x="601" y="197" text-anchor="middle" class="d-text">④ お礼・フォローメール</text>
</svg>
<figcaption>図：録音ファイル1つから、議事録づくりに必要なものがまとめて作れる</figcaption>
</figure>

## 誰が使えるの？

| 項目 | 内容 |
|---|---|
| 対象プラン | 有料プラン（Plusなど）・ワークスペース（法人向けプラン） |
| 無料プラン | 対象外と報じられています |
| 主な使い道 | 録音の文字起こし／要約／「◯◯さんは何と言っていた？」などの質問／フォローメールの下書き |

<div class="note">対応しているファイル形式やサイズの上限は、プランや時期によって変わる可能性があります。うまく読み込めない場合は、ChatGPTの画面に表示される案内を確認してください。</div>

## 使い方（3ステップ）

1. ChatGPTの入力欄にある **ファイル添付ボタン**（「＋」やクリップのアイコン）から、録音ファイル（例：`定例会議_1007.m4a`）を選ぶ
2. 「この会議の議事録を作って」など、やりたいことを書いて送信
3. 出てきた議事録を確認し、必要なら「決定事項だけ表にして」「参加者へのお礼メールも書いて」と追加で頼む

<figure class="diagram">
<svg viewBox="0 0 720 300" role="img" aria-label="画面イメージ：チャットの入力欄で、①添付ボタンから録音ファイルを選び、②やりたいことを書いて送信する">
<rect x="16" y="12" width="688" height="276" rx="14" class="d-screen"/>
<rect x="150" y="34" width="420" height="44" rx="12" class="d-box"/>
<text x="360" y="62" text-anchor="middle" class="d-sub">（これまでの会話がここに表示されます）</text>
<rect x="60" y="150" width="600" height="110" rx="22" class="d-box"/>
<rect x="84" y="164" width="230" height="40" rx="8" class="d-accent"/>
<text x="102" y="189" class="d-text">♪ 定例会議_1007.m4a</text>
<text x="84" y="234" class="d-text">この会議の議事録を作って</text>
<circle cx="606" cy="232" r="18" class="d-accent"/>
<text x="606" y="238" text-anchor="middle" class="d-text">↑</text>
<circle cx="560" cy="232" r="16" class="d-box"/>
<text x="560" y="238" text-anchor="middle" class="d-text">＋</text>
<rect x="538" y="210" width="44" height="44" rx="10" class="d-mark"/>
<circle cx="538" cy="206" r="12" class="d-mark-dot"/>
<text x="538" y="211" text-anchor="middle" class="d-mark-num">1</text>
<rect x="74" y="156" width="250" height="56" rx="10" class="d-mark"/>
<circle cx="74" cy="152" r="12" class="d-mark-dot"/>
<text x="74" y="157" text-anchor="middle" class="d-mark-num">2</text>
<rect x="582" y="208" width="48" height="48" rx="10" class="d-mark"/>
<circle cx="630" cy="206" r="12" class="d-mark-dot"/>
<text x="630" y="211" text-anchor="middle" class="d-mark-num">3</text>
<text x="360" y="118" text-anchor="middle" class="d-sub">①「＋」やクリップのボタン → ②録音ファイルが添付される → ③送信</text>
</svg>
<figcaption>画面イメージ：入力欄の添付ボタンから録音ファイルを付けて、やりたいことを書いて送るだけ（実際の画面とボタンの位置・形は異なる場合があります）</figcaption>
</figure>

すぐに使えるプロンプトは、同時公開の「[今週のプロンプト：録音から議事録・ToDo・お礼メールを一発で](/articles/2026-10-07-prompt-meeting-minutes)」にまとめています。

## 使う前に気をつけること

- **社外秘の会議は、会社のルールを確認してから。** 法人プラン（ワークスペース）なのか、個人の有料プランなのかで、データの扱いが変わります。
- **参加者には「録音してAIでまとめます」と一言伝える**のがマナーです。
- **固有名詞や数字は必ず目で確認。** 人名・商品名・金額は聞き間違いが起きやすいところです。
