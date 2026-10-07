---
title: "【今週のプロンプト】録音から「議事録・ToDo・お礼メール」を一発で作る"
date: 2026-10-07
category: prompt
photoQuery: "meeting notes notebook"
thumbLabel: "議事録プロンプト"
summary:
  - 会議の録音や文字起こしを渡すだけで、議事録・ToDo表・お礼メールの3点セットができるプロンプト
  - 「誰が・いつまでに・何をするか」を表で出させるのがコツ
  - ChatGPT・Gemini・Claudeどれでも使える
tags: [プロンプト, 議事録, 会議, ChatGPT]
audience: [経営者・管理職, 事務・総務・経理, マーケ・営業]
level: 初級
sources: []
---

## こんなときに使う

- 会議のあと、議事録づくりに30分以上かかっている
- 「結局、誰が何をやるんだっけ？」が毎回あいまいになる
- 取引先との打ち合わせのあと、お礼メールを書くのが面倒

## プロンプト（コピーして使えます）

録音ファイルまたは文字起こしのテキストと一緒に、下のプロンプトを送ってください。`【 】` の部分は自分の会議に合わせて書きかえます。

```
あなたは優秀な秘書です。添付した会議の録音（または文字起こし）をもとに、次の3つを作ってください。

【会議名】：例）10月定例営業会議
【参加者】：例）山田（部長）、佐藤、鈴木、取引先A社 田中様

# 1. 議事録
- 会議の目的、話し合った内容、決まったことを見出し付きで300〜500字にまとめる
- 発言者が分かる部分は「（山田）」のように名前を添える

# 2. ToDo表
- 「担当者｜やること｜期限｜メモ」の表にする
- 期限が会議で出ていないものは「要確認」と書く

# 3. お礼・フォローメール
- 宛先：【取引先A社 田中様】
- 本日のお礼、決まったことの確認、次回の予定を入れる
- 丁寧だが長すぎない文面（200字程度）

# 注意
- 録音から聞き取れなかった部分や、自信がない固有名詞・数字は【要確認】と書く
- 会議で出ていない内容は付け足さない
```

## うまくいくコツ

<figure class="diagram">
<svg viewBox="0 0 720 150" role="img" aria-label="プロンプトのコツ：役割を決める、参加者を書く、要確認を書かせる">
<rect x="16" y="20" width="216" height="110" rx="10" class="d-accent"/>
<text x="124" y="62" text-anchor="middle" class="d-text">① 役割を決める</text>
<text x="124" y="88" text-anchor="middle" class="d-sub">「あなたは優秀な秘書です」</text>
<rect x="252" y="20" width="216" height="110" rx="10" class="d-accent"/>
<text x="360" y="62" text-anchor="middle" class="d-text">② 参加者を書く</text>
<text x="360" y="88" text-anchor="middle" class="d-sub">名前の聞き間違いが減る</text>
<rect x="488" y="20" width="216" height="110" rx="10" class="d-accent"/>
<text x="596" y="62" text-anchor="middle" class="d-text">③【要確認】を書かせる</text>
<text x="596" y="88" text-anchor="middle" class="d-sub">AIの思い込みを防ぐ</text>
</svg>
<figcaption>図：このプロンプトで効いている3つの工夫</figcaption>
</figure>

- **参加者の名前を先に書いておく**と、録音の聞き間違い（「佐藤」と「加藤」など）が減ります。
- <strong>「会議で出ていない内容は付け足さない」</strong>の一文で、AIが話を盛るのを防げます。
- お礼メールが不要な社内会議なら、`# 3.` の部分を消して使ってください。

## 関連記事

- [ChatGPTに会議の録音をそのまま渡せる時代に](/articles/2026-10-07-chatgpt-audio-upload)
