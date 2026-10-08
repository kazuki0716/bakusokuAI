---
title: "毎回の定型業務を「チーム専用AI」にする。指示書の書き方から共有・運用ルールまで"
date: 2026-10-08
category: howto
pickup: false
thumbLabel: "定型業務をチーム専用AIに"
summary:
  - 報告書やお客様への返信など、毎回同じ指示を書いている仕事は「専用AI」にしてチームで使い回せる
  - 指示書は「役割・手順・出力形式・禁止事項」の4つに分けて書き、サンプルで試して直してから共有する
  - 管理する人・入れてはいけない情報・見直しのルールを先に決めておくと、チームに広げても品質がそろう
tags: [ChatGPT, Gemini, Claude, Copilot, プロンプト, 文章作成]
audience: [経営者・管理職, 事務・総務・経理, マーケ・営業]
task: "文章作成"
level: 上級
sources:
  - title: "Introducing skills in the Gemini app and Workspace, plus what's next for Gems（Google Workspace Updates）"
    url: "https://workspaceupdates.googleblog.com/2026/09/skills-gemini-app-workspace.html"
    media: "Google Workspace Updates（公式）"
  - title: "Build agents with Agent Builder in Microsoft 365 Copilot（Microsoft Learn）"
    url: "https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/agent-builder-build-agents"
    media: "Microsoft Learn（公式）"
  - title: "Share and manage agents built in Agent Builder（Microsoft Learn）"
    url: "https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/agent-builder-share-manage-agents"
    media: "Microsoft Learn（公式）"
  - title: "What are projects?（Claude ヘルプセンター）"
    url: "https://support.claude.com/en/articles/9517075-what-are-projects"
    media: "Anthropic（公式）"
  - title: "Skills in ChatGPT（OpenAI ヘルプセンター）"
    url: "https://help.openai.com/en/articles/20001066-skills-in-chatgpt"
    media: "OpenAI（公式）"
  - title: "Custom GPT retirement and migration FAQ（OpenAI ヘルプセンター）"
    url: "https://help.openai.com/en/articles/20001519-custom-gpt-retirement-and-migration-faq"
    media: "OpenAI（公式）"
  - title: "OpenAI to retire custom GPTs in December as creators move to plugins"
    url: "https://www.edtechinnovationhub.com/news/openai-to-retire-custom-gpts-in-december-as-creators-move-to-plugins"
    media: "EdTech Innovation Hub"
---

## 「専用AI」って何？

毎週の報告書、お客様への返信文、社内のお知らせ。こうした**決まった型がある仕事**で、毎回AIに長い指示を書いていませんか。

その指示を一度ちゃんと書いて保存し、**チーム全員が呼び出せるようにしたもの**を、この記事では「専用AI」と呼びます。

- 毎回の長い指示を書かなくてよい
- 誰が使っても、同じ型・同じ言葉づかいで仕上がる
- 「上手な人のやり方」をチームの共有財産にできる

この記事は、プロンプトを書くことに慣れていて、**次はチームの仕組みにしたい人**向けの上級編です。

## どのツールで作れる？（2026年10月時点）

各社とも、名前は違いますが「指示書＋参考資料を保存して、チームで使う」仕組みを用意しています。ここ1〜2か月で名前や仕組みが大きく変わっているので、最新の状況をまとめます。

| ツール | 機能の名前 | チームでの共有 | 確認できた条件・注意 |
|---|---|---|---|
| Gemini | スキル（Gemの後継） | Googleドキュメントの「スキルビルダー」で作って、チームと一緒に直せる | 会社のWorkspaceでは2026年10月5日から順次提供。Geminiアプリ側とWorkspace側のスキルは同期しないので、両方で使うならそれぞれで作る |
| Copilot | エージェント（Agent Builder） | 作成後に「共有」から人・グループに配る。権限は「Can edit（編集できる）」と「Can chat（使うだけ）」 | 指示は8,000字まで。使える参考資料はライセンスによって違う。会社のポリシーで共有が制限されることもある |
| Claude | プロジェクト（指示＋ナレッジ） | 「Can view（見て使える）」「Can edit（編集できる）」で共有 | プロジェクトはどのプランでも使えるが、共有はTeam・Enterpriseプランだけ |
| ChatGPT | スキル（プラグインの一部） | ワークスペース内で共有できる | 使えるプランや共有の範囲はワークスペースの設定しだい。OpenAIのヘルプで確認を。カスタムGPTは終了予定と報じられている（下の注意） |

<div class="note">⚠️ ChatGPTの「カスタムGPT（GPTs）」は、<strong>2026年12月11日に終了する予定</strong>と報じられています。指示などをまとめた「プラグイン（スキルを含む）」への移行がすすめられており、日付は契約によって異なる場合があるとされています。お使いのワークスペースのお知らせで確認してください。これから新しく作るなら、GPTではなくスキルで作るのが安全です。Geminiの「Gem」も同じく、スキルに置きかわっていきます（<a href="/articles/2026-09-30-gemini-skills-replace-gems">Geminiのスキルの記事</a>）。</div>

GeminiのスキルとPowerPointのCopilotのスキルは、どちらも <code>SKILL.md</code> というMarkdown（見出しや箇条書きを記号で書くシンプルな書式）のファイルが土台です（<a href="/articles/2026-10-08-powerpoint-copilot-custom-skills">PowerPointのCopilotのスキルの記事</a>）。つまり、**指示書をMarkdownで1つ書いておけば、ツールを乗りかえても使い回しやすい**ということです。この記事のテンプレートもMarkdownで書いています。

## 全体の流れ

<figure class="diagram">
<svg viewBox="0 0 720 630" role="img" aria-label="専用AIを作る流れ：指示書を書く、資料を付ける、サンプルで試す、採点して直す、チームに共有する。合格するまで試すと直すをくり返す">
<defs><marker id="ah-tc1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-arrowhead"/></marker></defs>
<rect x="24" y="16" width="500" height="90" rx="12" class="d-box"/>
<text x="274" y="56" text-anchor="middle" class="d-text" font-size="28">① 指示書を書く</text>
<text x="274" y="92" text-anchor="middle" class="d-sub" font-size="26">役割・手順・形式・禁止</text>
<path d="M274,106 L274,136" class="d-arrow" marker-end="url(#ah-tc1)"/>
<rect x="24" y="142" width="500" height="90" rx="12" class="d-box"/>
<text x="274" y="182" text-anchor="middle" class="d-text" font-size="28">② 参考資料を付ける</text>
<text x="274" y="218" text-anchor="middle" class="d-sub" font-size="26">ひな形・良い例・用語集</text>
<path d="M274,232 L274,262" class="d-arrow" marker-end="url(#ah-tc1)"/>
<rect x="24" y="268" width="500" height="90" rx="12" class="d-box"/>
<text x="274" y="308" text-anchor="middle" class="d-text" font-size="28">③ サンプルで試す</text>
<text x="274" y="344" text-anchor="middle" class="d-sub" font-size="26">ふつう・難しい・例外</text>
<path d="M274,358 L274,388" class="d-arrow" marker-end="url(#ah-tc1)"/>
<rect x="24" y="394" width="500" height="90" rx="12" class="d-accent"/>
<text x="274" y="434" text-anchor="middle" class="d-text" font-size="28">④ 採点して直す</text>
<text x="274" y="470" text-anchor="middle" class="d-sub" font-size="26">チェック表で人が見る</text>
<path d="M524,439 L590,439 L590,61 L530,61" class="d-arrow" fill="none" marker-end="url(#ah-tc1)"/>
<text x="654" y="234" text-anchor="middle" class="d-sub" font-size="26">合格まで</text>
<text x="654" y="268" text-anchor="middle" class="d-sub" font-size="26">くり返す</text>
<path d="M274,484 L274,514" class="d-arrow" marker-end="url(#ah-tc1)"/>
<rect x="24" y="520" width="500" height="94" rx="12" class="d-accent"/>
<text x="274" y="560" text-anchor="middle" class="d-text" font-size="28">⑤ チームに共有</text>
<text x="274" y="598" text-anchor="middle" class="d-sub" font-size="26">管理者と運用ルールを決める</text>
</svg>
<figcaption>図：いきなり共有せず、合格するまで「試す→直す」を回してから配る</figcaption>
</figure>

1. 専用AIにする仕事を1つ決める
2. 指示書を書く
3. 参考資料を付ける
4. サンプルの入力で試す
5. チェック表で採点して、指示書を直す
6. チームに共有し、運用ルールを決める

以下、順番に説明します。

## 手順1：専用AIにする仕事を1つ決める

最初の1本は、次の3つがそろった仕事を選ぶと失敗しにくいです。

- **月に何回もある**（週1回以上が目安）
- **良い・悪いの基準を言葉で説明できる**（「この形で、この言葉づかいなら合格」）
- **最後に人が読んでから外に出す**（AIの文章がそのまま出ていかない）

たとえば「お客様からの問い合わせへの返信文の下書き」「週次の営業報告書」「社内のお知らせ文」などが向いています。逆に、毎回状況が大きく違う仕事や、判断そのものが仕事の中心になるもの（値引きの可否など）は、専用AIには向きません。

<div class="note">💡 欲ばって「何でもできる専用AI」を作ると、どの仕事も中途半端になります。<strong>1つの専用AIに、1つの仕事</strong>が基本です。</div>

## 手順2：指示書を書く

指示書は、次の4つのブロックに分けて書きます。

<figure class="diagram">
<svg viewBox="0 0 720 430" role="img" aria-label="指示書の4ブロック：役割、手順、出力形式、禁止事項。その下に参考資料を付ける">
<rect x="16" y="16" width="336" height="130" rx="12" class="d-accent"/>
<text x="184" y="70" text-anchor="middle" class="d-text" font-size="28">① 役割</text>
<text x="184" y="110" text-anchor="middle" class="d-sub" font-size="26">誰が誰に書くか</text>
<rect x="368" y="16" width="336" height="130" rx="12" class="d-accent"/>
<text x="536" y="70" text-anchor="middle" class="d-text" font-size="28">② 手順</text>
<text x="536" y="110" text-anchor="middle" class="d-sub" font-size="26">どの順で進めるか</text>
<rect x="16" y="162" width="336" height="130" rx="12" class="d-accent"/>
<text x="184" y="216" text-anchor="middle" class="d-text" font-size="28">③ 出力形式</text>
<text x="184" y="256" text-anchor="middle" class="d-sub" font-size="26">見出し・字数・表</text>
<rect x="368" y="162" width="336" height="130" rx="12" class="d-accent"/>
<text x="536" y="216" text-anchor="middle" class="d-text" font-size="28">④ 禁止事項</text>
<text x="536" y="256" text-anchor="middle" class="d-sub" font-size="26">やってはいけないこと</text>
<rect x="16" y="308" width="688" height="106" rx="12" class="d-box"/>
<text x="360" y="352" text-anchor="middle" class="d-text" font-size="28">＋ 参考資料</text>
<text x="360" y="392" text-anchor="middle" class="d-sub" font-size="26">ひな形・過去の良い例・用語集</text>
</svg>
<figcaption>図：指示書は4つのブロックに分ける。会社ごとの「正解の例」は参考資料で渡す</figcaption>
</figure>

| ブロック | 書くこと | よくある失敗 |
|---|---|---|
| ① 役割 | AIの立場、読む人、目的 | 「あなたはプロです」だけで、読む人が書いていない |
| ② 手順 | 読む→確認する→書く→見直す、の順番 | 手順がなく、いきなり書き始めてしまう |
| ③ 出力形式 | 見出し、字数、表、敬語のレベル | 「いい感じに」など、人によって受け取り方が違う言葉 |
| ④ 禁止事項 | 約束してはいけないこと、書いてはいけない情報 | 「足りない情報を想像で補う」ことを止めていない |

下は「お客様への返信文」の指示書テンプレートです。`【 】` を自分の会社に合わせて書きかえてください。そのまま、Geminiのスキル、Copilotのエージェントの「指示」、Claudeのプロジェクトの指示、ChatGPTのスキルに貼り付けて使えます。

```
# 専用AI：お客様への返信文（下書き）
版：v1.0（【2026-10-08】）／管理者：【山田（営業部）】

## 役割
あなたは【株式会社〇〇】のカスタマーサポート担当です。
お客様からの問い合わせに対する、返信メールの「下書き」を作ります。
読む人はお客様です。最終的には社員が確認してから送ります。

## 手順
1. 問い合わせ文を読み、「質問」「要望」「不満」に分けて箇条書きで整理する
2. 参考資料（FAQ・返信のひな形）の中から、答えになる部分を探す
3. 参考資料に答えがない点は、返信文に書かず【要確認】として一覧にする
4. 下の「出力形式」で返信文を書く
5. 書き終えたら、禁止事項に当てはまる表現がないか見直す

## 出力形式
次の3つを、この順番で出してください。
### 1. 問い合わせの整理（箇条書き）
### 2. 返信文の下書き
- 件名を1行で付ける
- 書き出しは「いつも【〇〇】をご利用いただき、ありがとうございます。」
- 本文は400字以内。1文は60字以内
- 結びは「ご不明な点がございましたら、お気軽にお問い合わせください。」
### 3. 担当者への申し送り
- 【要確認】の項目と、その理由
- 参考資料のどこを根拠にしたか（ファイル名と見出し）

## 禁止事項
- 返金・値引き・納期・補償を約束しない（「担当者より改めてご連絡します」と書く）
- 参考資料に書いていない料金・仕様・日付を書かない
- お客様の個人情報（電話番号・住所など）を返信文にくり返し書かない
- 他社の名前や、他社と比べる表現を書かない
- 謝罪は1回まで。「大変申し訳ございません」をくり返さない
```

<div class="note">💡 指示書の先頭に<strong>「版」と「管理者」</strong>を書いておくと、あとで「誰が、いつの版を使っているか」が分かり、運用がぐっと楽になります。</div>

## 手順3：参考資料を付ける

指示書には「ルール」を、参考資料には「正解の例」を入れます。AIは、ゼロから書くより**渡された資料をもとに書く**ほうが、事実と違う内容を書きにくくなります（<a href="/articles/2026-10-06-hallucination-check">AIのウソを見抜く3チェック</a>）。

1. 返信のひな形・よくある質問（FAQ）・用語集など、**社内で「正しい」と決まっている資料**を集める
2. 過去の返信から、**「これは良い」と上司がOKした例**を3〜5件選ぶ
3. お客様の名前・メールアドレス・電話番号は、`【お客様名】` のように置きかえてから入れる
4. 古い料金表など、**今は使っていない資料は入れない**
5. 各ツールの「ナレッジ」「参考資料」「ファイル」の欄にアップロードする

ツールごとの入れ方は次のとおりです。

- **Copilot**：エージェントの「Knowledge（ナレッジ）」に、SharePointのファイルやフォルダなどを指定します。使える種類はライセンスによって違います
- **Claude**：プロジェクトの「ナレッジ」にファイルやテキストを入れます
- **Gemini**：スキルには、テキストやPDF、画像などの参考ファイルを入れられると案内されています

<figure class="diagram">
<svg viewBox="0 0 720 476" role="img" aria-label="画面イメージ：専用AIの設定画面。指示の欄に指示書を貼り、参考資料の欄に良い返信の例や用語集を入れる">
<rect x="16" y="16" width="688" height="444" rx="14" class="d-screen"/>
<text x="40" y="70" class="d-text" font-size="28">専用AIの設定</text>
<text x="40" y="124" class="d-text" font-size="26">名前</text>
<rect x="200" y="94" width="480" height="44" rx="8" class="d-box"/>
<text x="216" y="125" class="d-sub" font-size="26">お客様返信アシスタント</text>
<text x="40" y="190" class="d-text" font-size="26">指示</text>
<rect x="200" y="160" width="480" height="150" rx="8" class="d-accent"/>
<text x="216" y="194" class="d-sub" font-size="26"># 役割</text>
<text x="216" y="228" class="d-sub" font-size="26"># 手順</text>
<text x="216" y="262" class="d-sub" font-size="26"># 出力形式</text>
<text x="216" y="296" class="d-sub" font-size="26"># 禁止事項</text>
<text x="40" y="374" class="d-text" font-size="26">参考資料</text>
<rect x="200" y="340" width="480" height="100" rx="8" class="d-box"/>
<rect x="216" y="356" width="196" height="44" rx="8" class="d-screen"/>
<text x="232" y="387" class="d-sub" font-size="26">良い返信の例</text>
<rect x="428" y="356" width="120" height="44" rx="8" class="d-screen"/>
<text x="444" y="387" class="d-sub" font-size="26">用語集</text>
<rect x="192" y="152" width="496" height="166" rx="12" class="d-mark"/>
<circle cx="192" cy="152" r="16" class="d-mark-dot"/>
<text x="192" y="158" text-anchor="middle" class="d-mark-num">1</text>
<rect x="192" y="332" width="496" height="116" rx="12" class="d-mark"/>
<circle cx="192" cy="332" r="16" class="d-mark-dot"/>
<text x="192" y="338" text-anchor="middle" class="d-mark-num">2</text>
</svg>
<figcaption>画面イメージ：① 指示書を「指示」の欄に貼る → ② 良い例や用語集を「参考資料」として入れる。欄の名前はツールによって違います（実際の画面と異なる場合があります）</figcaption>
</figure>

## 手順4：サンプルの入力で試す

共有する前に、**実際の仕事に近い入力で10件ほど試します**。1件だけ試して「うまくいった」で終わらせないのがコツです。

1. 過去の問い合わせから、次の3種類を選ぶ（個人情報は置きかえる）
   - **ふつうのもの**（よくある質問）：5件
   - **難しいもの**（質問が3つ以上ある、怒っている）：3件
   - **例外**（参考資料に答えがない、返金を求めている）：2件
2. 1件ずつ、新しいチャットで専用AIに入力する
3. 結果を、下の「チェック表」で採点する
4. 同じ入力を2回試して、**毎回ほぼ同じ品質で出るか**も見る

Copilotのエージェントは、作成画面の「Try it（試してみる）」タブで、作りながら試せます。

## 手順5：チェック表で採点して、指示書を直す

採点は、AIではなく**その仕事をよく知っている人**が行います。

| チェック項目 | 合格の基準 | ダメなときに直す場所 |
|---|---|---|
| 事実 | 料金・日付・仕様が参考資料と一致している | 参考資料を見直す／禁止事項に「資料にないことは書かない」を足す |
| 約束 | 返金・値引き・納期を約束していない | 禁止事項をもっと具体的に書く |
| 例外の扱い | 答えられない点が【要確認】になっている | 手順3を見直す |
| 形式 | 件名・書き出し・結び・字数がルールどおり | 出力形式に「例」を1つ足す |
| 言葉づかい | 自社らしい敬語。くどい謝罪がない | 参考資料に「良い例」を足す |
| 個人情報 | 不要な個人情報をくり返していない | 禁止事項に追記する |
| 安定性 | 同じ入力で2回試しても、品質が大きくぶれない | 手順をもっと細かく番号で書く |

直すときは、**一度に1か所だけ**直して、もう一度同じサンプルで試します。何か所も同時に直すと、どれが効いたのか分からなくなります。全項目が合格したら「v1.0」として共有します。

<div class="note">💡 採点そのものをAIに手伝わせる方法は、<a href="/articles/2026-10-08-prompt-draft-review-rewrite">「作る→採点→直す」プロンプト</a>が参考になります。ただし、合格の判断は必ず人がします。</div>

## 手順6：チームに共有する

ツールごとの共有のしかたです（会社の設定によっては、共有のボタンが出ない・管理者の承認が必要なことがあります）。

- **Copilot**：エージェントを「作成（Create）」すると、最初は自分だけが使える状態です。「共有（Share）」から人やグループを追加します。管理する人は「Can edit（編集できる）」、使うだけの人は「Can chat」にします。グループは「Can chat」にしかできないので、管理する人は個人で追加します
- **Claude**（Team・Enterpriseプラン）：プロジェクトを共有し、管理する人は「Can edit」、使う人は「Can view」にします
- **Gemini**（Workspace）：Googleドキュメントのスキルビルダーで作ったスキルを、チームと共有して一緒に直せます。Geminiアプリで作ったスキルはWorkspace側には自動で出ないので、使う場所で作ります
- **ChatGPT**：共有の方法と範囲はプランやワークスペースの設定で変わります。OpenAIのヘルプ「Skills in ChatGPT」で確認してから共有してください

<div class="note">💡 <strong>編集できる人は2人まで</strong>にしぼり、ほかのメンバーは「使うだけ」の権限にするのがおすすめです。誰でも直せる状態だと、いつの間にか指示書が変わり、品質がぶれます。</div>

## 運用ルール（ガバナンス）を決める

「ガバナンス」とは、**みんなが安全に使い続けるためのルールと管理のしかた**のことです。共有する前に、次の表を埋めておきましょう。

| 決めること | おすすめのルール |
|---|---|
| 管理者 | 専用AIごとに「正」「副」の2人を決め、指示書の先頭に名前を書く |
| 入れてはいけない情報 | お客様の個人情報、未発表の数字、契約書の原本、パスワード。社外秘の資料は会社のルールで使ってよいツールにだけ入れる |
| 使ってよいアカウント | 会社が契約したアカウントだけ。個人の無料アカウントには入れない |
| 出す前の確認 | AIの下書きは、必ず人が読んでから送る・提出する。「約束」「金額」は二重チェック |
| 変更のルール | 直したら版を上げ（v1.0→v1.1）、変更点を1行メモする。大きな変更は管理者2人で確認 |
| 見直しの時期 | 3か月に1回、サンプルで試し直す。料金改定・ツールの仕様変更のときはその都度 |
| 困ったときの窓口 | 「おかしな出力が出たら、入力と出力を管理者に送る」と決めておく |

<div class="note">💡 経営者・管理職の方へ：専用AIを全社に広げるときは、<strong>1つの部署で1本作り、1か月使って効果を測ってから</strong>横に広げるのが近道です。「1件あたり何分短くなったか」を記録しておくと、次の投資の判断材料になります。</div>

## 気をつけること

- **ツールの名前と仕組みが変わる時期です。** GeminiのGemとChatGPTのカスタムGPTは、どちらもスキルなどへの移行が案内されています。今あるものを使っている方は、移行の時期をお知らせで確認してください。
- **会社の設定しだいで使えないことがあります。** 作成や共有は、管理者の設定やプランで制限されることがあります。ボタンが見当たらないときは、情報システム担当に確認しましょう。
- **専用AIでも、ハルシネーション（AIがもっともらしいウソを書くこと）はゼロになりません。** 数字・固有名詞・約束にかかわる部分は、毎回人が確認します。
- **参考資料が古いと、古い答えが出ます。** 料金表やFAQを更新したら、専用AIの参考資料も差しかえましょう。
- **「専用AIが書いたから」は言いわけになりません。** 送った文章の責任は、送った人と会社にあります。

## 関連記事

- [Geminiに「スキル」登場、Gemは置き換えへ](/articles/2026-09-30-gemini-skills-replace-gems)
- [PowerPointのCopilotに「カスタムスキル」](/articles/2026-10-08-powerpoint-copilot-custom-skills)
- [AIの「もっともらしいウソ」を見抜く3つのチェック](/articles/2026-10-06-hallucination-check)
- [【プロンプト】大事な社外文書は「作る→採点する→直す」の3段階でAIに仕上げさせる](/articles/2026-10-08-prompt-draft-review-rewrite)
