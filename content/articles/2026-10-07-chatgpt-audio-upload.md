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
<svg viewBox="0 0 720 486" role="img" aria-label="録音ファイルをChatGPTにアップロードすると、文字起こし・要約・ToDo・お礼メールが作れる流れの図">
<defs><marker id="ah1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-arrowhead"/></marker></defs>
<rect x="150" y="16" width="420" height="104" rx="12" class="d-box"/>
<text x="360" y="60" text-anchor="middle" class="d-text" font-size="28">会議の録音</text>
<text x="360" y="100" text-anchor="middle" class="d-sub" font-size="26">Zoom / Meet / Teams</text>
<path d="M360,124 L360,160" class="d-arrow" marker-end="url(#ah1)"/>
<rect x="150" y="166" width="420" height="104" rx="12" class="d-accent"/>
<text x="360" y="210" text-anchor="middle" class="d-text" font-size="28">ChatGPT</text>
<text x="360" y="250" text-anchor="middle" class="d-sub" font-size="26">ファイルをアップロード</text>
<path d="M360,274 L360,306" class="d-arrow" marker-end="url(#ah1)"/>
<rect x="16" y="312" width="336" height="72" rx="10" class="d-box"/>
<text x="184" y="358" text-anchor="middle" class="d-text" font-size="28">① 文字起こし</text>
<rect x="368" y="312" width="336" height="72" rx="10" class="d-box"/>
<text x="536" y="358" text-anchor="middle" class="d-text" font-size="28">② 要約・議事録</text>
<rect x="16" y="398" width="336" height="72" rx="10" class="d-box"/>
<text x="184" y="444" text-anchor="middle" class="d-text" font-size="28">③ ToDo・決定事項</text>
<rect x="368" y="398" width="336" height="72" rx="10" class="d-box"/>
<text x="536" y="444" text-anchor="middle" class="d-text" font-size="28">④ お礼・フォローメール</text>
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
<svg viewBox="0 0 720 416" role="img" aria-label="画面イメージ：チャットの入力欄で、①「＋」ボタンから録音ファイルを選び、②ファイルが添付されたら、③やりたいことを書いて送信する">
<rect x="16" y="12" width="688" height="392" rx="14" class="d-screen"/>
<text x="48" y="62" class="d-sub" font-size="26">①「＋」ボタンでファイルを選ぶ</text>
<text x="48" y="100" class="d-sub" font-size="26">② 録音ファイルが添付される</text>
<text x="48" y="138" class="d-sub" font-size="26">③ 依頼を書いて送信</text>
<rect x="40" y="170" width="640" height="210" rx="22" class="d-box"/>
<rect x="64" y="190" width="400" height="56" rx="8" class="d-accent"/>
<text x="80" y="228" class="d-text" font-size="28">♪ 定例会議_1007.m4a</text>
<text x="64" y="296" class="d-text" font-size="28">この会議の議事録を作って</text>
<circle cx="96" cy="342" r="22" class="d-box"/>
<text x="96" y="352" text-anchor="middle" class="d-text" font-size="28">＋</text>
<circle cx="632" cy="342" r="24" class="d-accent"/>
<text x="632" y="352" text-anchor="middle" class="d-text" font-size="28">↑</text>
<rect x="66" y="312" width="60" height="60" rx="10" class="d-mark"/>
<circle cx="66" cy="312" r="20" class="d-mark-dot"/>
<text x="66" y="321" text-anchor="middle" class="d-mark-num" font-size="26">1</text>
<rect x="54" y="180" width="420" height="76" rx="10" class="d-mark"/>
<circle cx="54" cy="180" r="20" class="d-mark-dot"/>
<text x="54" y="189" text-anchor="middle" class="d-mark-num" font-size="26">2</text>
<rect x="600" y="310" width="64" height="64" rx="10" class="d-mark"/>
<circle cx="664" cy="310" r="20" class="d-mark-dot"/>
<text x="664" y="319" text-anchor="middle" class="d-mark-num" font-size="26">3</text>
</svg>
<figcaption>画面イメージ：入力欄の添付ボタンから録音ファイルを付けて、やりたいことを書いて送るだけ（実際の画面とボタンの位置・形は異なる場合があります）</figcaption>
</figure>

すぐに使えるプロンプトは、同時公開の「[プロンプト：録音から議事録・ToDo・お礼メールを一発で](/articles/2026-10-07-prompt-meeting-minutes)」にまとめています。

## 使う前に気をつけること

- **社外秘の会議は、会社のルールを確認してから。** 法人プラン（ワークスペース）なのか、個人の有料プランなのかで、データの扱いが変わります。
- **参加者には「録音してAIでまとめます」と一言伝える**のがマナーです。
- **固有名詞や数字は必ず目で確認。** 人名・商品名・金額は聞き間違いが起きやすいところです。
