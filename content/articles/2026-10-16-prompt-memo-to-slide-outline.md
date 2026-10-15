---
title: "【プロンプト】箇条書きのメモから、プレゼン資料の「1枚ずつの構成案」を作る"
date: 2026-10-16
category: prompt
pickup: false
thumbLabel: "メモ → スライド構成案"
summary:
  - 会議や提案のメモを貼るだけで、スライド1枚ずつの「見出し・伝えること・入れる図や表の案」をAIに出してもらうプロンプト
  - いきなりスライドを作らせず、先に構成だけを決めるのがコツ。直しが少なくなり、PowerPointやGoogleスライドで作る時間が短くなる
  - ChatGPT・Gemini・Claude・Copilotのどれでも使える。メモに無い数字を足させない指示も入れている
tags: [プロンプト, プレゼン資料作成, PowerPoint, スライド]
audience: [経営者・管理職, 事務・総務・経理, マーケ・営業]
task: "プレゼン資料作成"
level: 初級
saves: { before: 40, after: 15 }
sources: []
---

## こんなときに使う

- 会議で報告する資料を作るのに、何から書けばいいか毎回迷う
- 提案のアイデアはメモにあるが、スライドの順番が決まらない
- AIにスライドを丸ごと作らせたら、言いたいこととずれていて直すのに時間がかかった

プレゼン資料づくりで時間がかかるのは、**「何を、どの順番で、何枚で言うか」を決める部分**です。そこで、AIにはいきなりスライドを作らせず、**先に「1枚ずつの構成案」だけを作ってもらいます**。構成が決まれば、あとはPowerPointやGoogleスライドに流し込むだけです。

<figure class="diagram">
<svg viewBox="0 0 720 560" role="img" aria-label="メモを貼ってプロンプトを送ると、AIがスライド1枚ずつの構成案を出す。人が順番と中身を直してから、スライドを作る">
<defs><marker id="so1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-arrowhead"/></marker></defs>
<rect x="110" y="16" width="500" height="100" rx="12" class="d-box"/>
<text x="360" y="58" text-anchor="middle" class="d-text" font-size="28">① メモを貼る</text>
<text x="360" y="96" text-anchor="middle" class="d-sub" font-size="26">箇条書きのままでOK</text>
<path d="M360,116 L360,148" class="d-arrow" marker-end="url(#so1)"/>
<rect x="110" y="154" width="500" height="100" rx="12" class="d-accent"/>
<text x="360" y="196" text-anchor="middle" class="d-text" font-size="28">② 構成案が出る</text>
<text x="360" y="234" text-anchor="middle" class="d-sub" font-size="26">1枚ずつの見出しと要点</text>
<path d="M360,254 L360,286" class="d-arrow" marker-end="url(#so1)"/>
<rect x="110" y="292" width="500" height="100" rx="12" class="d-box"/>
<text x="360" y="334" text-anchor="middle" class="d-text" font-size="28">③ 人が直す</text>
<text x="360" y="372" text-anchor="middle" class="d-sub" font-size="26">順番・枚数・言いたいこと</text>
<path d="M360,392 L360,424" class="d-arrow" marker-end="url(#so1)"/>
<rect x="110" y="430" width="500" height="100" rx="12" class="d-accent"/>
<text x="360" y="472" text-anchor="middle" class="d-text" font-size="28">④ スライドにする</text>
<text x="360" y="510" text-anchor="middle" class="d-sub" font-size="26">決まった構成で作る</text>
</svg>
<figcaption>図：先に構成を決めてから、スライドを作る</figcaption>
</figure>

## プロンプト（コピーして使えます）

メモを貼ってから、次の文を送ります。`【 】` の部分は、自分の資料に合わせて書きかえてください。

```
次のメモをもとに、プレゼン資料の構成案を作ってください。スライドそのものはまだ作らないでください。

# メモ
【ここにメモを貼る】

# 資料の条件
- 目的：【例）来期の展示会出展を部長に承認してもらう】
- 聞く人：【例）営業部長と課長3名。細かい数字より結論を知りたい】
- 時間と枚数：【例）発表10分、表紙をのぞいて6枚まで】

# 出し方
スライドごとに、次の4つを表で出してください。
| 枚目 | 見出し（20字以内） | このスライドで伝えること（2〜3行） | 入れる図・表の案 |

# ルール
- 1枚目の次に「結論」のスライドを置く
- 1枚で伝えることは1つにしぼる
- メモに無い数字や事実は書き足さない。必要なのに無い情報は【要確認】と書く
- 最後に、聞く人から出そうな質問を3つと、その答えの準備に必要なものを挙げる
```

## 出てきた構成案の直し方

構成案が出たら、スライドを作る前に、次の順番で見直します。

| 見ること | 直し方の例 |
|---|---|
| 結論が2枚目にあるか | 「結論のスライドを2枚目に移して」と頼む |
| 1枚に言いたいことが2つ以上ないか | 「4枚目を2枚に分けて」と頼む |
| 【要確認】の所 | 自分で数字や事実を調べて埋める |
| 枚数と時間が合っているか | 「8枚を6枚にまとめて」と頼む |

構成が決まったら、「この構成で、各スライドの本文を箇条書きで書いて」と続けて頼むと、そのままスライドに貼れる文章になります。

## うまく使うコツ

1. **「聞く人」をくわしく書く。** 部長向けか、現場の担当者向けかで、結論の書き方や数字の出し方が変わります。
2. **枚数を先に決める。** 決めないと、AIは多めの枚数で作りがちです。
3. **構成案は保存して使い回す。** 毎月の報告資料など、同じ形の資料は一度決めた構成をひな形にしましょう。

## 気をつけること

- **社外秘のメモは、会社が使ってよいと決めたAIで。** 売上や顧客の名前が入ったメモは、個人のアカウントのAIに貼らないようにしましょう。
- **数字は人が確認。** グラフや表に入れる数字は、元のデータと照らし合わせてください（[AIのウソを見抜く3つのチェック](/articles/2026-10-06-hallucination-check)）。
- PowerPointのCopilotに社内のスライドのルールを覚えさせたいときは、[PowerPointのCopilotに「カスタムスキル」](/articles/2026-10-08-powerpoint-copilot-custom-skills)もあわせてどうぞ。
