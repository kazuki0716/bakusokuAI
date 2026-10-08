---
title: "【プロンプト】箇条書きのメモを「上司に送れる報告メール」に3秒で変える"
date: 2026-10-01
category: prompt
thumbLabel: "報告メールプロンプト"
summary:
  - 走り書きのメモを貼るだけで、上司向けの報告メールに整えるプロンプト
  - 「結論→理由→次にやること」の順に並べさせるのがコツ
  - ChatGPT・Gemini・Claudeどれでも使える
tags: [プロンプト, メール, ChatGPT]
audience: [経営者・管理職, 事務・総務・経理, マーケ・営業]
level: 初級
saves: { before: 15, after: 5 }
sources: []
---

## こんなときに使う

- 仕事の進み具合を上司に報告したいが、文章にするのが面倒
- メモはあるけど、何から書けばいいか分からない
- 「で、結論は？」と言われがち

## プロンプト（コピーして使えます）

```
次のメモをもとに、上司に送る報告メールを作ってください。

# 条件
- 宛先：【山田部長】
- 「結論 → 理由 → 次にやること」の順で書く
- 全体で200字程度。丁寧だが回りくどくしない
- 件名も3案つける
- メモに書いていないことは付け足さない

# メモ
【ここに箇条書きのメモを貼る】
例）
・A社見積もり、先方OK
・ただし納期を1週間早めたいと
・工場に確認中、明日回答
```

<figure class="diagram">
<svg viewBox="0 0 720 536" role="img" aria-label="報告メールを結論、理由、次にやることの順に並べる">
<defs><marker id="pr1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-arrowhead"/></marker></defs>
<rect x="24" y="16" width="672" height="136" rx="14" class="d-accent"/>
<text x="200" y="94" text-anchor="middle" class="d-text" font-size="28">結論</text>
<text x="520" y="74" text-anchor="middle" class="d-sub" font-size="26">A社の見積もりは</text>
<text x="520" y="112" text-anchor="middle" class="d-sub" font-size="26">承認いただけた</text>
<path d="M360,156 L360,196" class="d-arrow" marker-end="url(#pr1)"/>
<rect x="24" y="200" width="672" height="136" rx="14" class="d-box"/>
<text x="200" y="278" text-anchor="middle" class="d-text" font-size="28">理由・状況</text>
<text x="520" y="258" text-anchor="middle" class="d-sub" font-size="26">納期を1週間</text>
<text x="520" y="296" text-anchor="middle" class="d-sub" font-size="26">早めたいとの要望</text>
<path d="M360,340 L360,380" class="d-arrow" marker-end="url(#pr1)"/>
<rect x="24" y="384" width="672" height="136" rx="14" class="d-box"/>
<text x="200" y="462" text-anchor="middle" class="d-text" font-size="28">次にやること</text>
<text x="520" y="442" text-anchor="middle" class="d-sub" font-size="26">工場に確認し</text>
<text x="520" y="480" text-anchor="middle" class="d-sub" font-size="26">明日ご報告</text>
</svg>
<figcaption>図：「結論 → 理由 → 次にやること」の順で並べると、伝わる報告になる</figcaption>
</figure>

## うまくいくコツ

- <strong>「結論 → 理由 → 次にやること」</strong>の順番を指定すると、上司が知りたいことが最初に来ます
- 宛先を書くと、敬語のレベルを合わせてくれます
- 件名を複数案出させると、メールボックスで目立つ件名を選べます
