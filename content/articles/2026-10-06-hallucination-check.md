---
title: "AIの「もっともらしいウソ」を見抜く。仕事で使う前の3つのチェック"
date: 2026-10-06
category: howto
photoQuery: "magnifying glass documents"
thumbLabel: "AIのウソを見抜く3チェック"
summary:
  - 生成AIは、事実と違う内容を自信満々に書くことがある（ハルシネーション）
  - 「数字・固有名詞・出典」の3か所を確認するだけで、大きなミスはほぼ防げる
  - 確認用のプロンプトを1行足すだけで、AI自身に怪しい部分を申告させられる
tags: [ハルシネーション, ChatGPT, 基礎]
audience: [経営者・管理職, 事務・総務・経理, マーケ・営業]
level: 初級
sources: []
---

## ハルシネーションとは？

生成AIが、**事実と違う内容を、もっともらしく自信満々に書いてしまう**ことを「ハルシネーション（幻覚）」と呼びます。

どのAIツールでも起こりえます。モデルが新しくなるたびに減ってはいますが、ゼロにはなりません。仕事で使うときは「AIの文章は**下書き**。最後は人がチェックする」と考えるのが安全です。

## チェックするのはこの3か所

<figure class="diagram">
<svg viewBox="0 0 720 200" role="img" aria-label="AIの回答で確認すべき3か所：数字、固有名詞、出典">
<rect x="16" y="20" width="216" height="160" rx="12" class="d-accent"/>
<text x="124" y="70" text-anchor="middle" class="d-text">① 数字</text>
<text x="124" y="102" text-anchor="middle" class="d-sub">金額・日付・割合・件数</text>
<text x="124" y="124" text-anchor="middle" class="d-sub">→ 元の資料と照らし合わせる</text>
<rect x="252" y="20" width="216" height="160" rx="12" class="d-accent"/>
<text x="360" y="70" text-anchor="middle" class="d-text">② 固有名詞</text>
<text x="360" y="102" text-anchor="middle" class="d-sub">人名・社名・商品名・法律名</text>
<text x="360" y="124" text-anchor="middle" class="d-sub">→ 公式サイトで検索する</text>
<rect x="488" y="20" width="216" height="160" rx="12" class="d-accent"/>
<text x="596" y="70" text-anchor="middle" class="d-text">③ 出典</text>
<text x="596" y="102" text-anchor="middle" class="d-sub">「〜によると」「調査では」</text>
<text x="596" y="124" text-anchor="middle" class="d-sub">→ リンク先が本当にあるか</text>
</svg>
<figcaption>図：全部を疑う必要はない。間違いが起きやすい3か所だけ確認する</figcaption>
</figure>

| チェック項目 | よくある間違い | 確認方法 |
|---|---|---|
| ① 数字 | 売上の桁ちがい、存在しない統計データ | 元の資料・Excelと照らし合わせる |
| ② 固有名詞 | 実在しない商品名、肩書きの間違い | 公式サイトで検索する |
| ③ 出典 | それらしいが存在しないURLや論文 | リンクを実際に開いてみる |

## AI自身に「怪しいところ」を申告させる

回答のあとに、次の1行を送るだけで、AIが自信のない部分を教えてくれます。

```
今の回答の中で、事実確認が必要な部分・自信がない部分を箇条書きで教えてください。
```

さらに、最初の質問に次の一文を入れておくのも効果的です。

```
分からないことは「分かりません」と答えてください。推測で補った部分には【推測】と書いてください。
```

## 調べものには「検索できるAI」を使う

最新の情報や事実を調べたいときは、Web検索して出典を示してくれるAI（ChatGPTの検索機能、Perplexity、Geminiなど）を使いましょう。出典のリンクが付くので、③の確認がぐっと楽になります。

<div class="note">💡 ポイント：AIに<strong>ゼロから事実を書かせる</strong>より、<strong>自分が渡した資料をもとに書かせる</strong>ほうが、ハルシネーションはずっと起きにくくなります。</div>
