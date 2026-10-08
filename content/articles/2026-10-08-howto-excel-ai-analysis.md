---
title: "売上表をAIで分析する。Copilot・ChatGPTに数式・集計・グラフを作らせて検算する手順"
date: 2026-10-08
category: howto
pickup: false
thumbLabel: "売上表をAIで集計・検算"
summary:
  - Excelの売上表をAIに渡すと、SUMIFS・XLOOKUPなどの数式、ピボット集計、グラフまで作ってもらえる
  - Excelの中で使うならCopilot in Excel、ファイルを渡すならChatGPTやGeminiが使える（必要なプランを確認）
  - AIの集計は必ず「合計・件数・1件の手計算」で検算してから、会議資料や報告に使う
tags: [Excel, Copilot, ChatGPT, Gemini, データ分析]
audience: [事務・総務・経理, マーケ・営業]
task: "Excel活用"
level: 中級
sources:
  - title: "Excel の Copilot の使用を開始する（Microsoft サポート）"
    url: "https://support.microsoft.com/ja-jp/office/get-started-with-copilot-in-excel-d7110502-0334-4b4f-a175-a73abdfc118a"
    media: "Microsoft サポート"
  - title: "Frequently asked questions about Copilot in Excel（Microsoft Support）"
    url: "https://support.microsoft.com/en-us/office/frequently-asked-questions-about-copilot-in-excel-7a13758f-d61e-4a56-8440-f2c9a07802ec"
    media: "Microsoft サポート"
  - title: "Agent Mode in Excel is now generally available on desktop（Microsoft Excel Blog）"
    url: "https://techcommunity.microsoft.com/blog/excelblog/agent-mode-in-excel-is-now-generally-available-on-desktop/4457408"
    media: "Microsoft Tech Community"
  - title: "Data analysis with ChatGPT（OpenAI Help Center）"
    url: "https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt"
    media: "OpenAI"
  - title: "Using ChatGPT's Free plan（OpenAI Help Center）"
    url: "https://help.openai.com/en/articles/9275245-using-chatgpt-s-free-plan"
    media: "OpenAI"
  - title: "How your data is used to improve model performance（OpenAI Help Center）"
    url: "https://help.openai.com/en/articles/5722486"
    media: "OpenAI"
  - title: "Upload & analyze files in Gemini Apps（Gemini Apps Help）"
    url: "https://support.google.com/gemini/answer/14903178"
    media: "Google"
  - title: "Gemini Apps Privacy Hub（Gemini Apps Help）"
    url: "https://support.google.com/gemini/answer/13594961"
    media: "Google"
---

## この記事でできるようになること

毎月の売上表から「担当者別の合計」「商品別の推移」「グラフ」を作る作業は、慣れていても30分〜1時間かかります。

この作業をAIに手伝ってもらう手順を紹介します。ポイントは次の3つです。

- **数式は「説明つき」で作らせる**（自分で読めない数式は使わない）
- **集計とグラフはAIに任せる**（ピボットテーブル＝表を自動でまとめ直す機能も作れます）
- **最後は人が検算する**（AIの数字をそのまま資料に貼らない）

<figure class="diagram">
<svg viewBox="0 0 720 530" role="img" aria-label="AIで売上表を分析する4ステップ：表を整える、数式を作らせる、集計とグラフ、人が検算する">
<defs><marker id="xl1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-arrowhead"/></marker></defs>
<rect x="60" y="16" width="600" height="100" rx="12" class="d-box"/>
<text x="360" y="60" text-anchor="middle" class="d-text" font-size="28">① 表を整える</text>
<text x="360" y="98" text-anchor="middle" class="d-sub" font-size="26">見出しは1行・結合セルなし</text>
<path d="M360,118 L360,144" class="d-arrow" marker-end="url(#xl1)"/>
<rect x="60" y="148" width="600" height="100" rx="12" class="d-box"/>
<text x="360" y="192" text-anchor="middle" class="d-text" font-size="28">② 数式を作らせる</text>
<text x="360" y="230" text-anchor="middle" class="d-sub" font-size="26">SUMIFS・XLOOKUP＋説明</text>
<path d="M360,250 L360,276" class="d-arrow" marker-end="url(#xl1)"/>
<rect x="60" y="280" width="600" height="100" rx="12" class="d-box"/>
<text x="360" y="324" text-anchor="middle" class="d-text" font-size="28">③ 集計・グラフを作らせる</text>
<text x="360" y="362" text-anchor="middle" class="d-sub" font-size="26">ピボットテーブルと棒グラフ</text>
<path d="M360,382 L360,408" class="d-arrow" marker-end="url(#xl1)"/>
<rect x="60" y="412" width="600" height="100" rx="12" class="d-accent"/>
<text x="360" y="456" text-anchor="middle" class="d-text" font-size="28">④ 人が検算する</text>
<text x="360" y="494" text-anchor="middle" class="d-sub" font-size="26">合計・件数・1件を手で確認</text>
</svg>
<figcaption>図：AIに任せるのは②③。①の準備と④の検算は人がやる</figcaption>
</figure>

## どのAIを使えばいいの？

使い方は大きく2つあります。会社の契約と、データの中身で選びます。

| 使い方 | 向いている場面 | 必要なもの（2026年10月8日時点） |
|---|---|---|
| **Copilot in Excel**（Excelの中で使う） | 数式・ピボット・グラフを**ブックに直接**作りたい | 次のどれか：法人向けのMicrosoft 365 Copilot、Copilot Chatが使える法人向けMicrosoft 365／Office 365、個人向けのMicrosoft 365 Premium、AIクレジット付きのMicrosoft 365 Personal／Family |
| **ChatGPT**（ファイルを添付する） | Excel・CSVを渡して、集計結果や数式の案をもらいたい | 無料プランでも使えるが、ファイルのアップロードやデータ分析は有料プランより回数制限が厳しい |
| **Gemini**（ファイルを添付する） | スプレッドシートを渡して、要約やグラフを作りたい | Googleアカウントでサインイン。1回に最大10ファイル、1ファイル100MBまで（動画以外） |

- Copilot in Excel は、Windows・Mac・Web版のExcelで「編集」「プラン（計画）」「チャット」の3つのモードが使えます。iPhone・Androidではチャットのモードが中心です。
- Copilotが表示されない場合は、契約に含まれていないか、会社の設定で止められている可能性があります。社内の情報システム担当に確認しましょう。
- Copilotの料金の仕組みは [Microsoft 365 Copilotの料金が2本立てに](/articles/2026-10-02-copilot-pricing-credits) も参考にしてください。

## 準備：表を「AIが読みやすい形」にする

AIが読み間違えやすいのは、人が見やすく飾った表です。分析の前に、次の形に整えます。

1. 1行目だけを見出しにする（例：日付／担当者／地域／商品／数量／売上金額）
2. 結合セルをやめる
3. 小計・合計の行を表の途中に入れない
4. 日付は日付、金額は数値で入れる（「12,000円」のような文字にしない）
5. 表を選んで `Ctrl + T` で「テーブル」にしておくと、範囲がはっきりして指示しやすくなります

<div class="note">💡 ポイント：社外秘の数字や個人名が入っている表は、<strong>分析に必要な列だけ残したコピー</strong>を作ってから使いましょう。担当者名を「A・B・C」に置きかえるだけでも安心度が上がります。</div>

## 使い方① Copilot in Excel で分析する

<figure class="diagram">
<svg viewBox="0 0 720 440" role="img" aria-label="画面イメージ：Excelの右下のCopilotアイコンを押すと右側にCopilotの画面が開き、下の入力欄に依頼を書く">
<rect x="16" y="12" width="688" height="416" rx="14" class="d-screen"/>
<rect x="36" y="36" width="364" height="372" rx="10" class="d-box"/>
<text x="56" y="80" class="d-text" font-size="28">売上表</text>
<rect x="56" y="100" width="324" height="34" rx="6" class="d-accent"/>
<rect x="56" y="146" width="324" height="16" rx="6" class="d-box"/>
<rect x="56" y="174" width="324" height="16" rx="6" class="d-box"/>
<rect x="56" y="202" width="324" height="16" rx="6" class="d-box"/>
<rect x="56" y="230" width="324" height="16" rx="6" class="d-box"/>
<rect x="56" y="258" width="324" height="16" rx="6" class="d-box"/>
<rect x="320" y="340" width="56" height="48" rx="10" class="d-accent"/>
<text x="348" y="374" text-anchor="middle" class="d-text" font-size="28">✦</text>
<rect x="312" y="332" width="72" height="64" rx="12" class="d-mark"/>
<circle cx="312" cy="330" r="16" class="d-mark-dot"/>
<text x="312" y="339" text-anchor="middle" class="d-mark-num" font-size="26">1</text>
<rect x="420" y="36" width="264" height="372" rx="10" class="d-box"/>
<text x="440" y="80" class="d-text" font-size="28">Copilot</text>
<rect x="440" y="104" width="220" height="14" rx="7" class="d-accent"/>
<rect x="440" y="130" width="190" height="14" rx="7" class="d-accent"/>
<rect x="440" y="156" width="150" height="14" rx="7" class="d-accent"/>
<rect x="436" y="300" width="232" height="84" rx="10" class="d-screen"/>
<text x="452" y="350" class="d-sub" font-size="26">ここに依頼を書く</text>
<rect x="428" y="292" width="248" height="100" rx="12" class="d-mark"/>
<circle cx="676" cy="292" r="16" class="d-mark-dot"/>
<text x="676" y="301" text-anchor="middle" class="d-mark-num" font-size="26">2</text>
</svg>
<figcaption>画面イメージ：① Excelの右下のCopilotアイコンを選ぶ → ② 開いた画面の入力欄に依頼を書く（実際の画面と異なる場合があります）</figcaption>
</figure>

1. 売上表のブックを開き、念のため**コピーを保存**しておく
2. Excelの右下にある**Copilotアイコン**を選ぶ
3. まずは「チャット」のモードで、「この表で何が分かりますか？列の意味を説明して」と聞き、AIが表を正しく読めているか確かめる
4. 数式を頼む（例：「G列に、地域が東京で商品がAの売上合計を出す数式を、意味の説明つきで作って」）
5. 集計とグラフを頼む（例：「担当者×月の売上をピボットテーブルにして、新しいシートに月別の棒グラフを作って」）
6. 「プラン（計画）」のモードを使うと、すぐに変更せず、手順の案を先に見せてくれる。大きな変更の前はこちらで確認する
7. 結果を下の「検算」の手順で確かめる。止めたいときは入力欄の右下の停止ボタンを押す

<div class="note">💡 Copilot in Excel は、最初は「編集」のモードで開き、<strong>ブックを直接書きかえます</strong>。共同編集中のファイルでは、保存した変更がほかの人にも見えます。元に戻すときは「元に戻す」か、以前のバージョンから戻せます。</div>

## 使い方② ChatGPT・Gemini にファイルを渡して分析する

会社でCopilotが使えない場合や、Excel以外の形（CSV）で分析したい場合は、ChatGPTやGeminiにファイルを添付します。ChatGPTは .xls／.xlsx／.csv に対応しています。

1. 準備で整えた表のコピーを、.xlsx か .csv で保存する
2. ChatGPT（またはGemini）の入力欄にあるファイル追加のボタンから、ファイルを添付する（Geminiでは「ファイルを追加」）
3. 下のプロンプトを貼りつけて送る
4. 出てきた数式を、元のExcelに自分で貼りつけて計算させる
5. グラフは、気に入った形が出たらExcelで同じグラフを作り直す（会議資料はExcelの数字を正にする）

<figure class="diagram">
<svg viewBox="0 0 720 520" role="img" aria-label="画面イメージ：入力欄のファイル追加ボタンから売上表を添付して依頼すると、担当者別の集計表と棒グラフが返ってくる">
<rect x="16" y="16" width="688" height="496" rx="14" class="d-screen"/>
<rect x="300" y="36" width="384" height="116" rx="14" class="d-accent"/>
<rect x="320" y="52" width="200" height="42" rx="8" class="d-box"/>
<text x="336" y="82" class="d-sub" font-size="26">売上表.xlsx</text>
<text x="320" y="134" class="d-text" font-size="26">担当者別に集計して</text>
<rect x="36" y="176" width="648" height="248" rx="12" class="d-box"/>
<text x="60" y="222" class="d-text" font-size="26">担当者別の売上</text>
<text x="60" y="270" class="d-sub" font-size="26">佐藤　120万円</text>
<text x="60" y="316" class="d-sub" font-size="26">鈴木　 95万円</text>
<text x="60" y="362" class="d-sub" font-size="26">田中　 80万円</text>
<line x1="420" y1="396" x2="660" y2="396" class="d-arrow"/>
<rect x="440" y="246" width="50" height="150" rx="4" class="d-accent"/>
<rect x="520" y="278" width="50" height="118" rx="4" class="d-accent"/>
<rect x="600" y="296" width="50" height="100" rx="4" class="d-accent"/>
<rect x="36" y="444" width="648" height="56" rx="28" class="d-box"/>
<text x="70" y="482" text-anchor="middle" class="d-text" font-size="30">＋</text>
<text x="110" y="481" class="d-sub" font-size="26">質問や依頼を入力</text>
<rect x="42" y="446" width="56" height="52" rx="14" class="d-mark"/>
<circle cx="42" cy="446" r="16" class="d-mark-dot"/>
<text x="42" y="455" text-anchor="middle" class="d-mark-num" font-size="26">1</text>
<rect x="28" y="168" width="664" height="264" rx="16" class="d-mark"/>
<circle cx="692" cy="168" r="16" class="d-mark-dot"/>
<text x="692" y="177" text-anchor="middle" class="d-mark-num" font-size="26">2</text>
</svg>
<figcaption>画面イメージ：① 入力欄の「＋」（ファイルの追加）から表を添付して依頼する → ② 担当者別の集計表とグラフが返ってくる（実際の画面と異なる場合があります）</figcaption>
</figure>

## プロンプト（コピーして使えます）

Copilot in Excel のチャット、ChatGPT、Geminiのどれでも使えます。`【 】` の部分を自分の表に合わせて書きかえてください。

```
あなたはExcelに詳しい経理担当です。添付（または開いている）売上表を分析してください。

【表の列】：日付／担当者／地域／商品／数量／売上金額
【期間】：2026年4月〜9月

# 1. 数式
- 「地域が東京」かつ「商品がA」の売上合計を出すSUMIFSの数式
- 別シート「商品マスタ」から商品の単価を取ってくるXLOOKUPの数式（見つからないときは「該当なし」と表示）
- それぞれ、どの列を何の条件で使っているかを1行ずつ説明する

# 2. 集計
- 担当者×月の売上合計を表にする（ピボットテーブルの形）
- 前月より10%以上下がった担当者がいれば、その行を挙げる

# 3. グラフ
- 月別の売上合計を棒グラフにする

# 4. 検算用の情報
- 表全体の行数と、売上金額の総合計を最初に書く
- 集計表の合計が総合計と一致するかを確認して結果を書く
- 空欄・文字が入った数値・重複していそうな行があれば挙げる

# 注意
- 表にない数字や理由は付け足さない。原因の推測には【推測】と書く
```

## 検算：AIの数字をそのまま使わない

Microsoftの公式FAQでも、Copilotの数式や分析は**使う前に確認するよう**案内されています。AIは列の取り違えや、範囲の一部の読み落としをすることがあります。次の4つを確認しましょう。

| 確認すること | やり方 |
|---|---|
| ① 総合計が合うか | 元の表の売上金額列を `SUM` で合計し、AIの集計表の合計と比べる |
| ② 件数が合うか | 元の表の行数（`COUNTA`）と、AIが読んだ行数を比べる。少なければ読み落とし |
| ③ 1件を手で確かめる | フィルターで「東京・商品A」だけを表示し、画面下の合計とSUMIFSの結果を比べる |
| ④ 数式を読む | 説明と数式の範囲・条件が一致しているか。XLOOKUPで「該当なし」が出ていないか |

- AIが「前月より下がった理由」を書いてきても、それは**仮説**です。表にない理由は、担当者に確認してから資料に書きます。
- 確認のコツは [AIの「もっともらしいウソ」を見抜く3つのチェック](/articles/2026-10-06-hallucination-check) も参考にしてください。

## 気をつけること

- **社外秘のデータを個人アカウントに入れない。** ChatGPTの無料・Plus・Proなど個人向けプランは、初期設定では会話が学習に使われることがあります（「設定」の「データコントロール」でオフにできます）。法人向けのChatGPT Business・Enterpriseは、初期設定で学習に使われません。
- **Geminiの個人アカウントも同じです。** Googleは、人の目で見られたくない機密情報は入力しないよう案内しています。会社の表は、会社が契約したアカウントで扱いましょう。
- **会社のルールを先に確認する。** 顧客名・個人名・給与など、そもそもAIに入れてはいけないデータが決まっている会社もあります。
- **XLOOKUPは古いExcelでは使えません。** Excel 2019以前を使っている人に渡すファイルでは、VLOOKUPで作ってもらうよう頼みましょう。
- **Copilotで編集できないとき**は、Excelの計算方法が「自動」になっているか確認します。SharePointでチェックアウト中のファイルも、デスクトップ版ではうまく動かないことがあります（Web版のExcelなら使えます）。

## 関連記事

- [【事務・経理向け】Excelの売上データから「問題点と原因」をChatGPTで見つける実演](/articles/2026-10-05-video-admin-excel-sales-analysis)
- [AIの「もっともらしいウソ」を見抜く。仕事で使う前の3つのチェック](/articles/2026-10-06-hallucination-check)
- [Microsoft 365 Copilotの料金が2本立てに](/articles/2026-10-02-copilot-pricing-credits)
