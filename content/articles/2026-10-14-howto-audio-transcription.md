---
title: "録音した会議や商談を、AIで文字起こしする。WordとGeminiでの手順と、読みやすく整えるプロンプト"
date: 2026-10-14
category: howto
pickup: false
thumbLabel: "録音をAIで文字に"
summary:
  - 録音の文字起こしは「① 録音を文字にする」「② 読みやすく整える」の2段階に分けると、速く正確になる
  - Microsoft 365を契約しているならWordの文字起こし機能（月300分まで）、GoogleならGeminiアプリに音声ファイルを添付する方法が使える（無料版は合計10分まで）
  - 整えるときは「聞き取れない所を推測で埋めない」と指示する。人は【要確認】の所と、数字・固有名詞だけを録音で聞き直せばよい
tags: [文字起こし, 録音, Word, Gemini, 議事録]
audience: [経営者・管理職, 事務・総務・経理, マーケ・営業]
task: "録音の文字起こし"
level: 初級
saves: { before: 60, after: 15 }
sources:
  - title: "Transcribe your recordings（Microsoft Support）"
    url: "https://support.microsoft.com/en-us/office/transcribe-your-recordings-7fc2efec-245e-45f0-b053-2a97531ecf57"
    media: "Microsoft サポート"
  - title: "Upload & analyze files in Gemini Apps（Gemini Apps Help）"
    url: "https://support.google.com/gemini/answer/14903178?hl=en"
    media: "Google"
---

## こんな人に

- 会議・商談・インタビューを録音しているが、聞き直して文字にする時間がない
- 1時間の録音を文字にするのに、半日かかってしまう
- AIで文字起こししたことはあるが、読みにくくて結局直している

録音の文字起こしは、**「① 録音を文字にする」と「② 読みやすく整える」の2段階**に分けるのがコツです。①は文字起こしの機能に任せ、②はAIにプロンプトで頼みます。人は最後に、AIが「自信がない」と言った所だけを確認します。

<figure class="diagram">
<svg viewBox="0 0 720 420" role="img" aria-label="録音の文字起こしの流れ：録音を文字にする、AIで読みやすく整える、要確認の所と数字だけ人が聞き直す">
<defs><marker id="at1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-arrowhead"/></marker></defs>
<rect x="110" y="16" width="500" height="100" rx="12" class="d-box"/>
<text x="360" y="58" text-anchor="middle" class="d-text" font-size="28">① 録音を文字にする</text>
<text x="360" y="96" text-anchor="middle" class="d-sub" font-size="26">WordやGeminiの機能で</text>
<path d="M360,116 L360,148" class="d-arrow" marker-end="url(#at1)"/>
<rect x="110" y="154" width="500" height="100" rx="12" class="d-accent"/>
<text x="360" y="196" text-anchor="middle" class="d-text" font-size="28">② 読みやすく整える</text>
<text x="360" y="234" text-anchor="middle" class="d-sub" font-size="26">下のプロンプトでAIに</text>
<path d="M360,254 L360,286" class="d-arrow" marker-end="url(#at1)"/>
<rect x="110" y="292" width="500" height="110" rx="12" class="d-box"/>
<text x="360" y="336" text-anchor="middle" class="d-text" font-size="28">③ 人が聞き直す</text>
<text x="360" y="376" text-anchor="middle" class="d-sub" font-size="26">【要確認】と数字だけ</text>
</svg>
<figcaption>図：全部を聞き直すのではなく、AIが迷った所だけを聞き直す</figcaption>
</figure>

## どの方法を使う？

| 使っているもの | 方法 | 使える量の目安 |
|---|---|---|
| Microsoft 365 | Wordの文字起こし機能 | 録音ファイルのアップロードは月300分まで（Copilotのライセンスがあれば月3万分まで） |
| Googleのアカウント | Geminiアプリに音声ファイルを添付 | 音声は合計10分まで。Google AI Pro・Ultraなら3時間まで |
| 会議そのものを記録したい | Google MeetやTeamsのAIのメモ機能 | 会社のプランによる |

## Wordで文字起こしする

Microsoftのサポートページによると、手順は次のとおりです。日本語にも対応しています。

1. Wordを開き、「ホーム」タブの「ディクテーション」の横の▼から、文字起こしの項目（英語の画面では「Transcribe」）を選ぶ
2. 右に出た画面で、音声ファイルをアップロードする（.wav・.mp4・.m4a・.mp3に対応）。その場で録音することもできる
3. 文字起こしが終わるまで、その画面を開いたまま待つ（録音の長さと同じくらいかかることがある）
4. 話し手は番号（英語の画面では「Speaker 1」「Speaker 2」）で分けて出るので、名前に書きかえる
5. すべてを本文に入れるボタン（英語の画面では「Add all to document」）で、文字起こしをWordの本文に入れる

文字起こしの各段落には時刻が付いていて、押すとその部分の録音を再生できます。**聞き直しは、この再生機能を使うと速く済みます。** 録音ファイルはOneDriveの文字起こし用のフォルダ（英語の画面では「Transcribed Files」）に保存されます。

<div class="note">Microsoftのサポートページでは、この機能の対象はWindows版とWeb版のWord（Microsoft 365）と案内されています。会社のWordで出てこないときは、情報システム担当に確認してください。</div>

## Geminiアプリで文字起こしする

1. Geminiアプリ（スマホまたはパソコンのブラウザ）を開く
2. 入力欄の「＋」から、録音した音声ファイルを添付する
3. 「この音声を、話し手ごとに分けて、話したとおりに文字起こしして」と送る
4. 出てきた文字起こしを、次のプロンプトで読みやすく整える

Googleのヘルプによると、無料のGeminiで添付できる音声は**合計10分まで**です。長い会議は、Google AI Pro・Ultra（3時間まで）か、Wordの文字起こしを使いましょう。

## プロンプト（文字起こしを読みやすく整える）

文字起こしを貼り付けてから、次の文を送ります。ChatGPT・Claude・Gemini・Copilotのどれでも使えます。

```
次の文字起こしを、読みやすい文章に整えてください。

# 文字起こし
【ここに文字起こしを貼る】

# 会議の情報
- 内容：【例）A社との新サービスの打ち合わせ】
- 話し手：【話者1＝自社の山田、話者2＝A社の佐藤様】
- よく出る言葉：【例）サービス名、商品名、人の名前】

# ルール
- 「えー」「あのー」や言いまちがい、くり返しは消す
- 話した内容は変えない。話していないことは足さない
- 聞き取りにくい所や、意味が通らない所は、推測で埋めずに【要確認】と書く
- 数字・日付・金額・人の名前は、文字起こしのとおりに残す
- 最後に「決まったこと」「やること（担当・期限）」を箇条書きで出す
```

ポイントは**「よく出る言葉」を先に渡すこと**です。商品名や人の名前は、文字起こしでまちがえやすい言葉です。正しい書き方を先に伝えておくと、AIが直してくれます。

## 聞き直すのは3か所だけ

| 確認すること | 理由 |
|---|---|
| 【要確認】の所 | AI自身が自信がないと言っている |
| 数字・日付・金額 | 「15」と「50」など、聞きまちがいが起きやすい |
| 人の名前・会社名 | 同じ読みの別の字になりやすい |

## 気をつけること

- **録音する前に、相手の了解をとる。** 特に社外の人との会議や商談では、最初に「記録のために録音します」と伝えましょう。
- **社外秘の録音は、会社が使ってよいと決めたAIで。** 個人のアカウントのAIに、取引先との会話を入れるのは避けましょう。
- 整えた文字起こしから議事録を作るときは、[議事録作成の記事一覧](/tasks/minutes)もあわせてどうぞ。
