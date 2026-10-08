---
title: "【プロンプト】紙の書類や手書きメモの写真を、Excelに貼れる表に変える"
date: 2026-10-09
category: prompt
pickup: false
thumbLabel: "写真 → Excelの表"
summary:
  - 紙の申込書・手書きのメモ・ホワイトボードを写真に撮って、AIに「表」にしてもらうプロンプト
  - 読み取れない文字を勝手に埋めさせず「【要確認】」と書かせるのがコツ。入力し直す時間を減らし、確認だけに集中できる
  - ChatGPT・Gemini・Claude・Copilot など、画像を添付できるAIならどれでも使える
tags: [プロンプト, 画像の文字起こし, Excel]
audience: [経営者・管理職, 事務・総務・経理, マーケ・営業]
task: "画像の文字起こし"
level: 初級
saves: { before: 30, after: 10 }
sources: []
---

## こんなときに使う

- 紙で届いた申込書やアンケートを、1枚ずつExcelに打ち直している
- 会議のホワイトボードや、手書きのメモを清書したい
- 展示会でもらった資料の数字を、比較表にまとめたい

紙の内容をパソコンに打ち直す作業は、AIに任せられます。スマホで写真を撮って、AIに添付して頼むだけです。

ただし、AIは**読めない文字を、それらしい文字で埋めてしまう**ことがあります。そこで、このプロンプトでは「読めないところは【要確認】と書く」ように指示しています。人は【要確認】の部分だけを見直せばよくなります。

<figure class="diagram">
<svg viewBox="0 0 720 560" role="img" aria-label="紙の書類を写真に撮り、AIに添付してプロンプトを送ると表ができる。【要確認】の部分だけ人が見直してExcelに貼る">
<defs><marker id="pt1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-arrowhead"/></marker></defs>
<rect x="110" y="16" width="500" height="100" rx="12" class="d-box"/>
<text x="360" y="58" text-anchor="middle" class="d-text" font-size="28">① 紙を写真に撮る</text>
<text x="360" y="96" text-anchor="middle" class="d-sub" font-size="26">明るい場所で、まっすぐ</text>
<path d="M360,116 L360,148" class="d-arrow" marker-end="url(#pt1)"/>
<rect x="110" y="154" width="500" height="100" rx="12" class="d-accent"/>
<text x="360" y="196" text-anchor="middle" class="d-text" font-size="28">② AIに添付して頼む</text>
<text x="360" y="234" text-anchor="middle" class="d-sub" font-size="26">下のプロンプトを貼る</text>
<path d="M360,254 L360,286" class="d-arrow" marker-end="url(#pt1)"/>
<rect x="110" y="292" width="500" height="100" rx="12" class="d-box"/>
<text x="360" y="334" text-anchor="middle" class="d-text" font-size="28">③ 表ができる</text>
<text x="360" y="372" text-anchor="middle" class="d-sub" font-size="26">読めない所は【要確認】</text>
<path d="M360,392 L360,424" class="d-arrow" marker-end="url(#pt1)"/>
<rect x="110" y="430" width="500" height="100" rx="12" class="d-accent"/>
<text x="360" y="472" text-anchor="middle" class="d-text" font-size="28">④ 人が見直して貼る</text>
<text x="360" y="510" text-anchor="middle" class="d-sub" font-size="26">【要確認】と数字だけ</text>
</svg>
</figure>

## プロンプト（コピーして使えます）

写真を添付してから、次の文を貼って送ります。`【 】` の部分は、自分の書類に合わせて書きかえてください。

```
添付した写真は【紙の申込書】です。書かれている内容を読み取って、表にしてください。

# 表の列
【受付日｜会社名｜氏名｜電話番号｜申込コース｜備考】

# ルール
- 1枚（1人）を1行にする
- 読み取れない文字や、自信のない文字は、推測で埋めずに【要確認】と書く
- 数字（日付・電話番号・金額）は、1文字でも自信がなければ【要確認】にする
- 写真に書かれていないことは書き足さない
- 最後に、【要確認】にした箇所の一覧を「行・列・理由」で出す

# 出し方
Excelにそのまま貼れるよう、表はタブ区切りのテキストでも出してください。
```

手書きメモやホワイトボードを清書したいときは、「# 表の列」の部分を次のように変えます。

```
# まとめ方
- 見出しごとに箇条書きで清書する
- 矢印や丸囲みは「→」「（重要）」のように文字で表す
- 決まったこと・やること（担当者・期限）は、最後に別の表にまとめる
```

## うまく使うコツ

1. **写真は1枚ずつ、まっすぐ撮る。** 影や斜めの写真は、読みまちがいが増えます。
2. **列を先に決めて渡す。** 列を決めないと、AIが毎回ちがう形の表を作ります。決めた列は保存して使い回しましょう。
3. **【要確認】の一覧から直す。** 全部を見直すのではなく、AIが「自信がない」と言った所と、数字だけを元の紙と照らし合わせます。
4. **たくさんあるときは、まず3枚で試す。** 列やルールを直してから、残りを頼みます。

| 頼み方 | 結果 |
|---|---|
| 「この写真を文字にして」 | 形がバラバラ。読めない字もそれらしく埋められる |
| 列とルールを決めて頼む | そのまま貼れる表＋見直す場所の一覧が出る |

## 気をつけること

- **個人情報が入った書類は、会社のルールを確認してから。** 申込書や名簿は、会社が使ってよいと決めたAI（法人向けプランなど）で扱いましょう。
- **最後の確認は人がする。** 特に、金額・日付・電話番号の数字は、元の紙と必ず照らし合わせてください（[AIのウソを見抜く3つのチェック](/articles/2026-10-06-hallucination-check)）。
- 読み取った表をExcelで集計するときは、[売上表をAIで分析する手順](/articles/2026-10-08-howto-excel-ai-analysis)もあわせてどうぞ。
