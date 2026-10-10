---
title: "Googleが仕事用の「Gemini agent」を発表。目標を伝えるとGmailやドキュメントで仕事を進めるAI"
date: 2026-10-11
category: news
pickup: true
thumbLabel: "AIに仕事を任せる時代へ"
thumbnail: "https://9to5google.com/wp-content/uploads/sites/4/2026/10/Gemini-agent.jpg?quality=82&strip=all&resize=1200,628"
thumbnailCredit: "出典：9to5Google「Google Cloud announces 'Gemini agent' as 'universal agent for work'」"
thumbnailCreditUrl: "https://9to5google.com/2026/10/08/gemini-agent-google-cloud/"
summary:
  - Google Cloudは2026年10月8日、仕事用のAIエージェント「Gemini agent」を発表した。手順ではなく目標を伝えると、計画を立てて仕事を進め、ふだん使うドキュメントやメールに成果物を返す
  - Googleのアプリ（Gmail・ドキュメント・スライドなど）のほか、Microsoft 365やSlackからも使える。仕事に合わせてGeminiとClaudeのモデルを使い分ける
  - まだ一部の企業向けの限定公開。Google Workspaceの一部の法人向けプランで「近く広く提供」と報じられている
impact: "これまでのAIは「1回聞いて1回答える」使い方が中心でしたが、Gemini agentは「この資料を作っておいて」と目標を渡すと、何時間もかかる仕事をパソコンを閉じたあとも進めてくれる形を目指しています。会社で使えるようになるのはもう少し先ですが、今のうちに「AIに丸ごと任せたい定型業務」を1つ書き出しておくと、使い始めたときにすぐ試せます。"
tags: [Gemini, Google, AIエージェント, Google Workspace]
audience: [経営者・管理職, 事務・総務・経理, マーケ・営業]
level: 中級
sources:
  - title: "Google Cloud announces 'Gemini agent' as 'universal agent for work'"
    url: "https://9to5google.com/2026/10/08/gemini-agent-google-cloud/"
    media: "9to5Google"
    image: "https://9to5google.com/wp-content/uploads/sites/4/2026/10/Gemini-agent.jpg?quality=82&strip=all&resize=1200,628"
  - title: "Welcome to Gemini at Work 2026: Introducing the Gemini agent"
    url: "https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026"
    media: "Google Cloud 公式ブログ"
  - title: "Google Cloud introduces the Gemini agent."
    url: "https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/gemini-at-work/"
    media: "Google 公式ブログ"
---

## 何が変わったの？

Google Cloudは2026年10月8日、イベント「Gemini at Work 2026」で、仕事用のAIエージェント **「Gemini agent」** を発表しました。Google Cloudのトーマス・クリアンCEOは、公式ブログで「仕事のための万能エージェント」と説明しています。

AIエージェントとは、**目標を伝えると、AIが自分で手順を考えて、ツールを使いながら仕事を進める仕組み**のことです。Gemini agentの特徴は次のとおりです。

- **手順ではなく目標を渡す。** 質問への回答、資料づくり、画像づくり、プログラムの作成までを、1つの入力欄から頼めます
- **クラウドで動き続ける。** 何時間・何日もかかる仕事も、パソコンを閉じたあとに進みます
- **大きな仕事は分担する。** 仕事に合わせて小さなエージェント（サブエージェント）を作り、並行して進めます
- **モデルを使い分ける。** 今はGoogleのGeminiと、AnthropicのClaudeのモデルから、仕事に合うものを選びます

<figure class="diagram">
<svg viewBox="0 0 720 560" role="img" aria-label="Gemini agentの流れ：目標を伝えると、AIが計画を立て、小さなエージェントに分担して進め、Gmailやドキュメントなどに成果物を返す。最後は人が確認する">
<defs><marker id="ga1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-arrowhead"/></marker></defs>
<rect x="110" y="16" width="500" height="100" rx="12" class="d-box"/>
<text x="360" y="58" text-anchor="middle" class="d-text" font-size="28">① 目標を伝える</text>
<text x="360" y="96" text-anchor="middle" class="d-sub" font-size="26">「来週の報告資料を作って」</text>
<path d="M360,116 L360,148" class="d-arrow" marker-end="url(#ga1)"/>
<rect x="110" y="154" width="500" height="100" rx="12" class="d-accent"/>
<text x="360" y="196" text-anchor="middle" class="d-text" font-size="28">② AIが計画を立てる</text>
<text x="360" y="234" text-anchor="middle" class="d-sub" font-size="26">合うモデルを選ぶ</text>
<path d="M360,254 L360,286" class="d-arrow" marker-end="url(#ga1)"/>
<rect x="110" y="292" width="500" height="100" rx="12" class="d-accent"/>
<text x="360" y="334" text-anchor="middle" class="d-text" font-size="28">③ 分担して進める</text>
<text x="360" y="372" text-anchor="middle" class="d-sub" font-size="26">閉じたあとも動き続ける</text>
<path d="M360,392 L360,424" class="d-arrow" marker-end="url(#ga1)"/>
<rect x="110" y="430" width="500" height="100" rx="12" class="d-box"/>
<text x="360" y="472" text-anchor="middle" class="d-text" font-size="28">④ いつもの場所に届く</text>
<text x="360" y="510" text-anchor="middle" class="d-sub" font-size="26">Gmail・ドキュメントなど</text>
</svg>
<figcaption>図：「聞いて答える」から「目標を渡して任せる」へ</figcaption>
</figure>

## どこで使えるの？

公式ブログによると、Gemini agentはWebやスマホ・パソコンのアプリのほか、次の場所から使えます。

| 使える場所 | 内容 |
|---|---|
| Google Workspace | Gmail・ドライブ・ドキュメント・スライド・スプレッドシート・Chat・カレンダーの中で使える |
| Microsoft 365・Slack | Googleのアプリ以外からも呼び出せる |
| つなげるサービス | Salesforce・Jira・Confluence・Teamsなど、会社の仕事のシステム |

さらに、**「coworker agent（同僚エージェント）」** という使い方も示されています。決まった役割を持つエージェントに、専用のメールアドレスやカレンダーを持たせ、チームの一員としてChatやドキュメントのコメントで呼びかけられるようにするものです。

## いつから使えるの？

- 9to5Googleによると、**今は一部の企業向けの限定公開（プライベートプレビュー）**です。
- Googleは、Google Workspaceの一部の **Business・Enterpriseプラン** の利用者に「近く広く提供する」と説明していると報じられています。
- 料金や、個人向けのGeminiアプリで使えるかどうかは、発表では示されていません。日本語への対応も、公式の資料では確認できませんでした。

## 気をつけること

- **任せる範囲を決めてから使う。** エージェントはメールや会社のシステムにつながって動きます。どのデータに触れてよいか、会社のルールと管理者の設定を先に確認しましょう。Googleは、管理者が権限を決めたり、エージェントの行動を記録したりする仕組みも用意すると説明しています。
- **成果物は必ず人が確認する。** 長い仕事を任せるほど、途中のまちがいに気づきにくくなります（[AIのウソを見抜く3つのチェック](/articles/2026-10-06-hallucination-check)）。
