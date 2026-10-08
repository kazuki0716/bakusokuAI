---
title: "PowerPointのCopilotに「カスタムスキル」。社内のスライドのルールを覚えさせて、毎回の指示を省ける"
date: 2026-10-08
category: news
thumbLabel: "Copilotに社内ルールを"
summary:
  - Microsoft 365 Copilotのリリースノート（2026年10月6日）で、PowerPointのCopilotに自分で作る「カスタムスキル」が加わったと案内された
  - Copilotが使えるMicrosoft 365のプランが対象。スキルはOneDriveの専用フォルダに保存し、「@スキル名」で呼び出す
  - 「社内の体裁に直す」「誤字をチェックする」など、毎回同じお願いを1回で済ませられる
impact: "提案書や会議資料を作るたびに、Copilotへ「社内フォーマットの色で」「1枚3行まで」と同じ指示を書いていた人には、1回あたり数分の短縮が積み重なります。チームで同じスキルを使えば、誰が作っても資料の体裁がそろうのも大きな利点です。まずは、いちばんよく頼んでいる指示を1つだけスキルにしてみてください。"
tags: [Copilot, PowerPoint, Microsoft 365, プレゼン資料作成]
audience: [経営者・管理職, 事務・総務・経理, マーケ・営業]
task: "プレゼン資料作成"
level: 中級
saves: { before: 20, after: 10 }
sources:
  - title: "Release Notes for Microsoft 365 Copilot"
    url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/release-notes"
    media: "Microsoft Learn（公式）"
    image: "https://learn.microsoft.com/en-us/media/open-graph-image.png"
  - title: "Use custom skills with Copilot in PowerPoint"
    url: "https://support.microsoft.com/en-us/powerpoint/copilot/copilot-in-powerpoint-skills"
    media: "Microsoft サポート（公式）"
---

## 何が変わったの？

Microsoftは2026年10月6日付けのMicrosoft 365 Copilotのリリースノートで、**PowerPointのCopilotに、利用者が自分で作る「カスタムスキル」を追加した**と案内しました。

スキルとは、**よく頼む作業の手順やルールを書いておく「指示書」**のようなものです。これまでPowerPointのCopilotは、最初から用意された機能しか使えませんでした。これからは、たとえば次のような自分専用の指示を保存して、何度でも呼び出せます。

- 社内のスライドのルール（文字の大きさ、1枚あたりの行数、使う言葉）に合わせて直す
- 誤字・脱字や表記ゆれをチェックする
- 毎月の報告資料を、決まった構成でまとめる

<figure class="diagram">
<svg viewBox="0 0 720 560" role="img" aria-label="カスタムスキルの流れ：よく使う指示をSKILL.mdに書いてOneDriveのスキルフォルダに保存し、PowerPointのCopilotで@スキル名と入力して呼び出すと、同じルールで資料が仕上がる">
<defs><marker id="ps1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-arrowhead"/></marker></defs>
<rect x="110" y="16" width="500" height="92" rx="12" class="d-box"/>
<text x="360" y="56" text-anchor="middle" class="d-text" font-size="28">よく使う指示</text>
<text x="360" y="94" text-anchor="middle" class="d-sub" font-size="26">SKILL.md に書く</text>
<path d="M360,112 L360,138" class="d-arrow" marker-end="url(#ps1)"/>
<rect x="110" y="142" width="500" height="92" rx="12" class="d-box"/>
<text x="360" y="182" text-anchor="middle" class="d-text" font-size="28">OneDrive</text>
<text x="360" y="220" text-anchor="middle" class="d-sub" font-size="26">スキル用フォルダに保存</text>
<path d="M360,238 L360,264" class="d-arrow" marker-end="url(#ps1)"/>
<rect x="110" y="268" width="500" height="92" rx="12" class="d-accent"/>
<text x="360" y="308" text-anchor="middle" class="d-text" font-size="28">@スキル名</text>
<text x="360" y="346" text-anchor="middle" class="d-sub" font-size="26">で呼び出す</text>
<path d="M360,364 L360,390" class="d-arrow" marker-end="url(#ps1)"/>
<rect x="110" y="394" width="500" height="92" rx="12" class="d-box"/>
<text x="360" y="434" text-anchor="middle" class="d-text" font-size="28">同じルール</text>
<text x="360" y="472" text-anchor="middle" class="d-sub" font-size="26">で仕上がる</text>
<text x="360" y="540" text-anchor="middle" class="d-sub" font-size="26">一度作れば、毎回の長い指示を書かなくてよい</text>
</svg>
<figcaption>図：よく頼む指示を「スキル」として保存し、名前で呼び出す</figcaption>
</figure>

## 誰が使えるの？

| 項目 | 内容 |
|---|---|
| 対象 | Copilotが含まれるMicrosoft 365のプランで、会社の設定でCopilotが有効になっている人 |
| 対応するPowerPoint | Microsoft 365版のPowerPoint（Windows・Mac・iPad）。リリースノートではWindows版とWeb版の項目として案内 |
| 保存場所 | 自分のOneDriveの「スキル」フォルダ |
| 呼び出し方 | 「スキルを選択」メニューから選ぶか、「@スキル名」と入力 |

<div class="note">Microsoftのサポートページでは、まずは個人で使う機能で、組織全体に配る場合は別の手順になると説明されています。会社のPCで使えない場合は、情報システム担当に確認してください。</div>

## 使い方

Microsoftのサポートページによると、スキルは**フォルダ1つにつき1スキル**で、その中に `SKILL.md` というファイルを置きます。ファイルの最初に `name`（名前）と `description`（説明）を書き、その下に指示を自由に書きます。

```text
---
name: monthly-report-check
description: 月次報告スライドを社内ルールに合わせて直す
---
- 1枚のスライドは見出し＋3行までにする
- 数字には必ず単位（円・件・％）を付ける
- 「〜と思われる」などのあいまいな表現は言い切りに直す
- 最後に「直した箇所の一覧」を出す
```

1. PowerPointのCopilotの画面で「＋」→「スキルを選択」→「スキルの管理」→「スキルを追加」を選ぶ（設定メニューの「スキルの管理」からOneDriveのフォルダを作る方法もある）
2. 上のような内容を貼り付けるか、ファイルをアップロードして保存する
3. 資料を開いたら、Copilotに「`@monthly-report-check` このスライドを直して」と頼む
4. よく使うスキルは、「スキルの管理」でオン・オフを切り替えておく

## 気をつけること

- **画像やPDFはスキルに入れられない。** 対応するのはテキスト系のファイル（.md、.txt、.csvなど）です。
- **Copilotが直した内容は、最後に人が確認。** 数字の書き換えや、意味が変わる言い換えがないかを見ましょう。
- **社外秘のルールを書くときは、保存先に注意。** スキルは自分のOneDriveに保存されます。
