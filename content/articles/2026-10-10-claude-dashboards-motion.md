---
title: "Claudeに「Dashboards」「Motion」登場。データから最新のグラフ画面、資料から解説アニメを作れる"
date: 2026-10-10
category: news
pickup: true
thumbLabel: "グラフも解説動画もClaudeで"
thumbnail: "https://forest.watch.impress.co.jp/img/wf/list/2146/954/claude.jpg"
thumbnailCredit: "出典：窓の杜「Anthropic、「Claude」の新機能「Dashboards」「Motion」を発表。「Docs」「Slides」「Design」は無償でも提供」"
thumbnailCreditUrl: "https://forest.watch.impress.co.jp/docs/news/2146954.html"
summary:
  - Anthropicは2026年10月8日、Claudeの新機能「Dashboards」（データから自動で更新されるグラフ画面）と「Motion」（解説アニメの作成）をベータ版で発表した
  - Dashboardsは有料プラン、MotionはTeam・Enterpriseプランが対象。あわせて「Docs」「Slides」「Design」は無料プランを含む全プランで使えるようになった
  - 売上の集計画面づくりや、報告資料のグラフに動きをつけた社内向けの短い動画づくりを、Claudeに頼めるようになる
impact: "毎週の会議用に、同じ集計表とグラフを手で作り直している方は多いはずです。Dashboardsなら「今四半期の地域別売上の画面を作って」と頼むだけで、データが更新されるたびにグラフも新しくなります。会社のデータとつなぐ設定が必要なので、まずは無料でも使えるSlidesで報告資料を1本作り、Claudeの資料づくりの感覚をつかんでみてください。"
tags: [Claude, Anthropic, プレゼン資料作成, データ分析]
audience: [経営者・管理職, 事務・総務・経理, マーケ・営業]
task: "会議資料のデータ分析"
level: 中級
sources:
  - title: "Build live dashboards and animate explainers with Claude"
    url: "https://claude.com/ja/resources/articles/dashboards-and-motion"
    media: "Anthropic（公式）"
    image: "https://claude.com/ja/resources/articles/dashboards-and-motion/opengraph-image/og"
  - title: "Anthropic、「Claude」の新機能「Dashboards」「Motion」を発表。「Docs」「Slides」「Design」は無償でも提供"
    url: "https://forest.watch.impress.co.jp/docs/news/2146954.html"
    media: "窓の杜"
---

## 何が変わったの？

Anthropicは2026年10月8日、Claudeに2つの新機能を加えると発表しました。どちらもベータ版（試験提供）です。

- **Claude Dashboards（ダッシュボード）**：会社のデータとつなぐと、ふつうの言葉で頼むだけで、**データが変わるたびに自動で新しくなるグラフ画面**を作ります。SQL（データを取り出すための専門の言葉）の知識はいりません。
- **Claude Motion（モーション）**：説明したい内容を伝えると、**文字・グラフ・図形が動く短い解説アニメ**を作ります。MP4の動画ファイルで保存できます。

あわせて、試験提供だった **Docs・Slides・Design** の3つが正式版になり、**無料プランを含むすべてのプランで使える**ようになりました。

<figure class="diagram">
<svg viewBox="0 0 720 520" role="img" aria-label="Claude Dashboardsは会社のデータから自動で更新されるグラフ画面を作る。Claude Motionは資料の内容から動く解説アニメを作りMP4で保存できる">
<defs><marker id="cm1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-arrowhead"/></marker></defs>
<text x="190" y="40" text-anchor="middle" class="d-text" font-size="28">Dashboards</text>
<text x="530" y="40" text-anchor="middle" class="d-text" font-size="28">Motion</text>
<rect x="24" y="64" width="332" height="110" rx="12" class="d-box"/>
<text x="190" y="110" text-anchor="middle" class="d-text" font-size="28">会社のデータ</text>
<text x="190" y="148" text-anchor="middle" class="d-sub" font-size="26">売上・顧客など</text>
<rect x="364" y="64" width="332" height="110" rx="12" class="d-box"/>
<text x="530" y="110" text-anchor="middle" class="d-text" font-size="28">伝えたい内容</text>
<text x="530" y="148" text-anchor="middle" class="d-sub" font-size="26">報告・グラフ</text>
<path d="M190,174 L190,214" class="d-arrow" marker-end="url(#cm1)"/>
<path d="M530,174 L530,214" class="d-arrow" marker-end="url(#cm1)"/>
<rect x="24" y="220" width="332" height="110" rx="12" class="d-accent"/>
<text x="190" y="266" text-anchor="middle" class="d-text" font-size="28">言葉で頼む</text>
<text x="190" y="304" text-anchor="middle" class="d-sub" font-size="26">SQLはいらない</text>
<rect x="364" y="220" width="332" height="110" rx="12" class="d-accent"/>
<text x="530" y="266" text-anchor="middle" class="d-text" font-size="28">/motion で頼む</text>
<text x="530" y="304" text-anchor="middle" class="d-sub" font-size="26">言葉や数字も直せる</text>
<path d="M190,330 L190,370" class="d-arrow" marker-end="url(#cm1)"/>
<path d="M530,330 L530,370" class="d-arrow" marker-end="url(#cm1)"/>
<rect x="24" y="376" width="332" height="120" rx="12" class="d-box"/>
<text x="190" y="424" text-anchor="middle" class="d-text" font-size="28">自動で更新</text>
<text x="190" y="462" text-anchor="middle" class="d-sub" font-size="26">グラフ画面</text>
<rect x="364" y="376" width="332" height="120" rx="12" class="d-box"/>
<text x="530" y="424" text-anchor="middle" class="d-text" font-size="28">解説アニメ</text>
<text x="530" y="462" text-anchor="middle" class="d-sub" font-size="26">MP4で保存</text>
</svg>
<figcaption>図：Dashboardsは「データ → 更新されるグラフ画面」、Motionは「伝えたい内容 → 動く解説」</figcaption>
</figure>

## 誰が使えるの？

| 機能 | 対象プラン | 状態 |
|---|---|---|
| Dashboards | 有料プラン | ベータ版 |
| Motion | Team・Enterprise | ベータ版 |
| Docs・Slides・Design | 無料を含むすべてのプラン | 正式版 |

- **Enterprise（法人向け）では、DashboardsとMotionは最初はオフ**です。管理者が「組織の設定」から有効にする必要があります。Docs・Slides・Designは、2026年10月15日に自動でオンになります。
- Dashboardsがつなげるデータは、BigQuery・Snowflake・Databricks・Amazon Redshift・ClickHouseなどのデータ基盤と、顧客管理のSalesforceです。
- 独立したサイトとして使えた「Claude Design」（claude.ai/design）は、2026年12月14日に終わり、Claudeの会話の中で使う形にまとまると報じられています。

## 仕事ではこう使う

**Dashboards（データをつないだ会社向け）**
1. Claudeに「今四半期の地域別の売上をダッシュボードにして」と頼む
2. できた画面の数字をクリックすると、その数字をどう取り出したか（クエリ）を確認できる。分からなければClaudeに説明を頼む
3. 各グラフには、データを最後に取り込んだ時刻が表示される。会議の前にここを確認する

**Motion（Team・Enterpriseの方）**
1. メッセージ欄に「/motion」と入力して選ぶ
2. 「四半期の報告を、全社会議用の30秒の解説アニメにして」のように頼む
3. 言葉・数字・タイミングを直してから、MP4で保存する

Motionは動画を生成するAIではなく、文字やグラフを動かすプログラムを書く仕組みです。そのため、実在しない人物が登場するような映像は作られません。

## 気をつけること

- **DashboardsとMotionはベータ版です。** 使えるプランが限られ、一部の連携先は「近日対応」です。
- **会社のデータをつなぐ前に、社内のルールと権限を確認。** どのデータをAIに見せてよいかは、情報システム担当と相談しましょう。
- **数字は元のデータで確かめる。** グラフの数字はクリックで取り出し方を確認できます（[AIのウソを見抜く3つのチェック](/articles/2026-10-06-hallucination-check)）。
