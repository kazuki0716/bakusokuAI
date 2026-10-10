---
title: "Google Workspace Studioに新機能。Gmailの「返信は無視」や会議後のお礼メール下書きなど、自動化の幅が広がる"
date: 2026-10-11
category: news
thumbLabel: "メールの自動化が細かく"
thumbnail: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjzrgd99622hL8SAYEGlVK8MHK5ItWSp6jWzc0wBSNVzv7rpU_CkW3VsyH0j4qv4HUIM1irSFEC6dYU-CjKPppZddzJWn_RE2Q-fzshklWKWlxbB4k85ZVkx9QtyscDLxe0BXsAQytBhXwrSjrL_7lrRYTJ-TgLIVFArrohnxUL01eggUUgK4i7fDtXevc/s2048/New%20logic%20and%20search%20steps%20in%20Workspace%20Studio%20help%20expand%20automation%20capabilities%20-%201.png"
thumbnailCredit: "出典：Google Workspace Updates「New logic and search steps in Workspace Studio help expand automation capabilities」"
thumbnailCreditUrl: "http://workspaceupdates.googleblog.com/2026/10/new-logic-and-search-steps-in-workspace-Studio-help-expand-automation-capabilities.html"
summary:
  - プログラムを書かずに仕事の自動化の流れを作れる「Workspace Studio」に、4つの新しい部品が加わる（2026年10月13日から順次）
  - 「条件の中に条件」を入れる分岐、Gmailで返信メールを無視する設定、会議後のお礼メール下書きのひな形、ドライブで文書を探す手順が使えるようになる
  - Workspace Studioが使えるGoogle Workspaceの利用者と、Workspace Individualの契約者が対象
impact: "「お問い合わせメールが来たら担当に回す」のような自動化は、返信メールにまで反応してしまうのが悩みの種でした。今回の更新で、最初のメールだけに反応させたり、会議の参加者全員にお礼メールの下書きを作らせたりと、事務の細かい手間を自動化しやすくなります。まずは、毎週同じように送っている会議後のフォローメールを1つ自動化してみてください。"
tags: [Google Workspace, Gmail, 自動化, メール返信]
audience: [事務・総務・経理, マーケ・営業]
task: "メール返信"
level: 中級
sources:
  - title: "New logic and search steps in Workspace Studio help expand automation capabilities"
    url: "http://workspaceupdates.googleblog.com/2026/10/new-logic-and-search-steps-in-workspace-Studio-help-expand-automation-capabilities.html"
    media: "Google Workspace Updates（公式ブログ）"
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjzrgd99622hL8SAYEGlVK8MHK5ItWSp6jWzc0wBSNVzv7rpU_CkW3VsyH0j4qv4HUIM1irSFEC6dYU-CjKPppZddzJWn_RE2Q-fzshklWKWlxbB4k85ZVkx9QtyscDLxe0BXsAQytBhXwrSjrL_7lrRYTJ-TgLIVFArrohnxUL01eggUUgK4i7fDtXevc/s2048/New%20logic%20and%20search%20steps%20in%20Workspace%20Studio%20help%20expand%20automation%20capabilities%20-%201.png"
---

## 何が変わったの？

Googleは2026年10月9日、**Workspace Studio**（プログラムを書かずに、Gmail・Meet・ドライブなどをつないだ仕事の自動化の流れを作れる機能）に、新しい部品を4つ加えると公式ブログで発表しました。

| 新しい部品 | できること |
|---|---|
| 条件の中に条件（入れ子の分岐） | 「Aなら、さらにBかCかで分ける」のような、何段階もの判断を組み込める |
| Gmailで返信を無視 | メールのスレッドで動く自動化を、最初のメールだけに反応させ、その後の返信では動かないようにできる |
| Meetのカレンダー情報 | 会議の招待者の一覧などを取り出せる。会議後のフォローメールの下書きを作るひな形も追加 |
| ドキュメントを探す | 条件を指定して、ドライブの中から文書ファイルを探す手順を入れられる |

<figure class="diagram">
<svg viewBox="0 0 720 520" role="img" aria-label="自動化の例：お問い合わせメールが届く。返信メールなら何もしない。最初のメールなら内容で分け、見積もりの依頼なら営業へ、それ以外なら総務へ回す">
<defs><marker id="ws1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-arrowhead"/></marker></defs>
<rect x="110" y="16" width="500" height="96" rx="12" class="d-box"/>
<text x="360" y="58" text-anchor="middle" class="d-text" font-size="28">お問い合わせメール</text>
<text x="360" y="94" text-anchor="middle" class="d-sub" font-size="26">Gmailに届く</text>
<path d="M300,112 L190,150" class="d-arrow" marker-end="url(#ws1)"/>
<path d="M420,112 L530,150" class="d-arrow" marker-end="url(#ws1)"/>
<rect x="24" y="156" width="332" height="100" rx="12" class="d-box"/>
<text x="190" y="198" text-anchor="middle" class="d-text" font-size="28">返信メール</text>
<text x="190" y="236" text-anchor="middle" class="d-sub" font-size="26">何もしない（新機能）</text>
<rect x="364" y="156" width="332" height="100" rx="12" class="d-accent"/>
<text x="530" y="198" text-anchor="middle" class="d-text" font-size="28">最初のメール</text>
<text x="530" y="236" text-anchor="middle" class="d-sub" font-size="26">内容でさらに分ける</text>
<path d="M480,256 L380,300" class="d-arrow" marker-end="url(#ws1)"/>
<path d="M580,256 L600,300" class="d-arrow" marker-end="url(#ws1)"/>
<rect x="190" y="306" width="300" height="100" rx="12" class="d-box"/>
<text x="340" y="348" text-anchor="middle" class="d-text" font-size="28">見積もり依頼</text>
<text x="340" y="386" text-anchor="middle" class="d-sub" font-size="26">→ 営業へ</text>
<rect x="500" y="306" width="196" height="100" rx="12" class="d-box"/>
<text x="598" y="348" text-anchor="middle" class="d-text" font-size="28">それ以外</text>
<text x="598" y="386" text-anchor="middle" class="d-sub" font-size="26">→ 総務へ</text>
<text x="360" y="474" text-anchor="middle" class="d-sub" font-size="26">「条件の中に条件」で何段階も分けられる</text>
</svg>
<figcaption>図：新しい部品を組み合わせた自動化の例（イメージ）</figcaption>
</figure>

## 誰が使えるの？いつから？

| 項目 | 内容 |
|---|---|
| 対象 | Workspace Studioが使えるGoogle Workspaceの利用者と、Workspace Individualの契約者 |
| 提供開始 | 2026年10月13日から順次（画面に出るまで最大15日ほど） |
| 利用者の設定 | 不要（作成画面で最初から使える） |
| 管理者の設定 | Workspace Studioの既存の設定（組織ごとの許可・禁止）がそのまま適用される |

## 気をつけること

- **自動で送るのではなく「下書き」から始める。** 会議後のフォローメールなども、最初は下書きを作るところまでにして、人が確認してから送りましょう。
- **分岐の条件はテストしてから本番に。** 条件の中に条件を入れるほど、思わぬメールに反応したり、反応しなかったりします。数通のテストメールで確かめてから使いましょう。
- **会社で使えない場合**は、管理者がWorkspace Studioを許可していない可能性があります。情報システム担当に確認してください。

AIでメールの返信を速くする基本の手順は、同時公開の「[メール返信をAIで速くする](/articles/2026-10-11-howto-email-reply-ai)」で解説しています。
