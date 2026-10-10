---
title: "メール返信をAIで速くする。Gmail・Outlook・ChatGPTで「下書き→確認→送信」の基本手順"
date: 2026-10-11
category: howto
pickup: false
thumbLabel: "返信メールは下書きをAIに"
summary:
  - 返信メールは「要点だけ自分で決めて、文章はAIに下書きさせる」と速くなる。GmailならGemini、OutlookならCopilot、ほかはChatGPTなどが使える
  - GmailとOutlookでは、返信画面からそのままAIに下書きを頼め、「よりフォーマルに」「短くする」などで調整できる（使えるプランを確認）
  - 送る前の確認は、宛名・日時・金額・約束したことの4点。AIが事実を足していないかを必ず見る
tags: [メール返信, Gmail, Outlook, Gemini, Copilot, ChatGPT]
audience: [経営者・管理職, 事務・総務・経理, マーケ・営業]
task: "メール返信"
level: 初級
saves: { before: 10, after: 4 }
sources:
  - title: "Gemini in Gmail でメールの下書きを作成する（Gmail ヘルプ）"
    url: "https://support.google.com/mail/answer/13955415?hl=ja"
    media: "Google"
  - title: "Draft an email message with Copilot in Outlook（Microsoft Support）"
    url: "https://support.microsoft.com/outlook/copilot-pages/draft-an-email-message-with-copilot-in-outlook"
    media: "Microsoft サポート"
---

## こんな人に

- 1日に何通も返信メールを書いていて、文面を考えるのに時間がかかる
- 断り・おわび・日程調整など、気をつかうメールほど手が止まる
- AIに書かせたことはあるが、そのまま送ってよいか不安

メール返信で時間がかかるのは、**「何を返すか」より「どう書くか」**に迷う部分です。そこで、返す内容（要点）だけを自分で決めて、**文章にする作業をAIに任せます**。最後に人が確認してから送ります。

<figure class="diagram">
<svg viewBox="0 0 720 420" role="img" aria-label="メール返信の流れ：要点を自分で決める、AIに下書きさせる、人が4点を確認して送る">
<defs><marker id="em1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-arrowhead"/></marker></defs>
<rect x="110" y="16" width="500" height="100" rx="12" class="d-box"/>
<text x="360" y="58" text-anchor="middle" class="d-text" font-size="28">① 要点を決める（人）</text>
<text x="360" y="96" text-anchor="middle" class="d-sub" font-size="26">返事・条件・期限を箇条書き</text>
<path d="M360,116 L360,148" class="d-arrow" marker-end="url(#em1)"/>
<rect x="110" y="154" width="500" height="100" rx="12" class="d-accent"/>
<text x="360" y="196" text-anchor="middle" class="d-text" font-size="28">② 下書きを作る（AI）</text>
<text x="360" y="234" text-anchor="middle" class="d-sub" font-size="26">トーンと長さも指定</text>
<path d="M360,254 L360,286" class="d-arrow" marker-end="url(#em1)"/>
<rect x="110" y="292" width="500" height="110" rx="12" class="d-box"/>
<text x="360" y="336" text-anchor="middle" class="d-text" font-size="28">③ 4点を確認して送る（人）</text>
<text x="360" y="376" text-anchor="middle" class="d-sub" font-size="26">宛名・日時・金額・約束</text>
</svg>
<figcaption>図：「何を返すか」は人が決め、「どう書くか」をAIに任せる</figcaption>
</figure>

## どのAIを使う？

| ふだん使っているメール | 使うAI | 使える条件 |
|---|---|---|
| Gmail | Gemini（文書作成サポート） | Google Workspaceの対象プランか、Google AIのプラン。個人の無料アカウントは米国のみ |
| Outlook | Copilot | 会社・学校のアカウントで、Copilotが使える契約。使えないときは情報システム担当に確認 |
| そのほか | ChatGPT・Claude・Geminiなど | 届いたメールを貼り付けて頼む（社外秘の扱いに注意） |

## Gmailで返信する（Gemini）

1. Gmailで、返信したいメールを開いて「返信」を押す
2. 返信画面の下に出る入力欄（プロンプトバー）に、要点を書く。出ていなければ「文書作成サポート」のアイコンを押す
3. 作成のアイコンを押すと、下書きが入る
4. 必要に応じて「よりフォーマルに」「フレンドリー」「短くする」を押すか、「もっと丁寧に」などと追加で頼む
5. 内容を確認して送信する

Googleのヘルプによると、Geminiはほかのメールやドライブのファイルから関連する情報（予約の番号など）を取り出して下書きに使うことがあります。**何を参考にしたかは「ソース」のアイコンで確認できます**。

## Outlookで返信する（Copilot）

1. 返信したいメールで「返信」を押す
2. 画面上部のCopilotのアイコンから、下書きを作る項目（英語の画面では「Draft with Copilot」）を選ぶ
3. 要点を入力して、下書きを作る
4. トーンや長さを調整するか、もう一度作り直す。よければ下書きを残すボタン（英語の画面では「Keep it」）を押す
5. 内容を確認して送信する

Microsoftのサポートによると、新しいOutlookとWeb版では、**メールの形式が「テキスト形式」だとCopilotの下書きが使えません**。設定の「メール」にある、メッセージの作成と返信の項目（英語の画面では「Compose and reply」）で、HTML形式に切り替えてください。

メニューの名前は、Outlookの種類（新しいOutlook・Web版・従来のWindows版・Mac版・スマホ）や表示の言語によって少しずつ違います。

## プロンプト（ChatGPTなどで使う場合）

届いたメールを貼り付けてから、次の文を送ります。GmailやOutlookのAIの入力欄でも、「# 返したい要点」から下を書けば同じように使えます。

```
次のメールへの返信の下書きを作ってください。

# 届いたメール
【ここに届いたメールを貼る】

# 返したい要点（この内容以外の事実は書かない）
- 【例）ご依頼の件は引き受ける】
- 【例）納品は10月24日（金）になる】
- 【例）見積書は明日までに送る】

# 条件
- 相手：【取引先の課長】、トーン：【丁寧だが堅すぎない】
- 長さ：【300字以内】
- 冒頭のあいさつは1文だけ。おわびや感謝は、くり返さない
- 足りない情報は推測で埋めず【要確認】と書く
```

ポイントは **「この内容以外の事実は書かない」** と **「足りない情報は【要確認】」** の2つです。AIは、自然な文章にするために、日付や約束を勝手に足してしまうことがあるからです。

## 送る前の4点チェック

| 確認すること | よくあるまちがい |
|---|---|
| 宛名・相手の名前 | 会社名や役職がちがう |
| 日時 | 曜日と日付が合っていない |
| 金額・数量 | 桁や単位がちがう |
| 約束したこと | 言っていない約束（「すぐに対応します」など）が入っている |

## 気をつけること

- **社外秘のメールは、会社が使ってよいと決めたAIで。** 個人のアカウントのChatGPTなどに、取引先とのやりとりを貼るのは避けましょう。
- **AIの下書きは「たたき台」。** 送るのは自分です。特に、おわびや断りのメールは、自分の言葉で一言足すと伝わり方が変わります。
- 報告メールを箇条書きから作りたいときは、[プロンプト：箇条書きのメモを「上司に送れる報告メール」に変える](/articles/2026-10-01-prompt-report-email)もあわせてどうぞ。
