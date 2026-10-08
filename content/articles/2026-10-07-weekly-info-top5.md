---
title: "今週の「仕事に役立つAI情報」Top5｜ChatGPTの録音読み込み、Copilotの回答再生成ほか（10月第2週）"
date: 2026-10-07
category: weekly
pickup: false
thumbLabel: "仕事に役立つAI情報 Top5"
summary:
  - 1位はChatGPTの録音ファイル読み込み。会議の録音から議事録まで、ChatGPTだけで作れるようになった
  - Microsoft 365 Copilotの「回答の再生成」や、Gemini・Workspaceの「スキル」など、毎日の操作が楽になる新機能が多い週だった
  - Claudeの無料プランの性能アップなど、追加の費用なしで試せる話題も選んでいます
tags: [ChatGPT, Copilot, Gemini, Claude, 議事録]
audience: [経営者・管理職, 事務・総務・経理, マーケ・営業]
ranking:
  - title: "ChatGPTに録音ファイルを渡すだけで、文字起こし・要約・質問ができるように（10月6日）"
    url: "/articles/2026-10-07-chatgpt-audio-upload"
    channel: "爆速AI NEWS"
    comment: "会議の録音から議事録・ToDo・お礼メールまでChatGPTだけで作れるように。有料プランが対象です。使い方は解説記事とプロンプトをご覧ください。"
  - title: "Microsoft 365 Copilotに「回答の再生成」。別のAIモデルで答え直しも（10月6日）"
    url: "/articles/2026-10-06-copilot-regenerate"
    channel: "爆速AI NEWS"
    comment: "イマイチな回答をボタンひとつで作り直せるように。Word・Excelでの文章づくりやデータの読み取りで、モデルを切り替えて比べられます。"
  - title: "Gemini・Google Workspaceに「スキル」登場。よく使う指示を保存して使い回せる"
    url: "/articles/2026-09-30-gemini-skills-replace-gems"
    channel: "爆速AI NEWS"
    comment: "よく使うプロンプトを「スキル」として保存し、何度でも使えるようになると報じられています。これまでの「Gem」を置き換えていく予定とのこと。定型業務のプロンプトを登録しておくと便利です。"
  - title: "Microsoft 365 CopilotでClaude Opus 5.5とGPT-6 Solが選べるように（9月22日）"
    url: "https://releasebot.io/updates/microsoft"
    channel: "Releasebot（Microsoftのリリースノートまとめ）"
    comment: "Copilotの中で、AnthropicとOpenAIの最新モデルを選べるようになると報じられています。Word・Excel・PowerPointなどに順次展開。2位の「再生成」と組み合わせると、モデルの比較がしやすくなります。"
  - title: "Claudeの無料プランでも上位モデル「Sonnet 5.5」が使えるように（9月28日）"
    url: "/articles/2026-09-28-claude-sonnet-5-5-free"
    channel: "爆速AI NEWS"
    comment: "無料のままで、文章づくりに強いClaudeの上位モデルが使えるようになったと報じられています。「有料プランを契約する前に試したい」という方はこの機会にどうぞ。"
sources:
  - title: "ChatGPT Audio Uploads Add Transcripts for Paid Plans（DigitBin）"
    url: "https://www.digitbin.com/chatgpt-audio-uploads-transcripts/"
  - title: "Release Notes for Microsoft 365 Copilot（Microsoft Learn）"
    url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/release-notes"
  - title: "Google Release Notes - October 2026（Releasebot）"
    url: "https://releasebot.io/updates/google"
  - title: "Microsoft Release Notes - October 2026（Releasebot）"
    url: "https://releasebot.io/updates/microsoft"
  - title: "Claude Updates by Anthropic - October 2026（Releasebot）"
    url: "https://releasebot.io/updates/anthropic/claude"
---

## 今週の選び方

今週公開された情報の中から、<strong>「爆速AI会員の仕事に、どれだけすぐ役立つか」</strong>を基準に5本を選びました。

<figure class="diagram">
<svg viewBox="0 0 720 376" role="img" aria-label="ランキングの選び方：すぐ使える、多くの会員に関係する、知らないと損をする、の3つの基準">
<rect x="16" y="16" width="688" height="104" rx="12" class="d-accent"/>
<text x="360" y="60" text-anchor="middle" class="d-text" font-size="28">① すぐ使える</text>
<text x="360" y="100" text-anchor="middle" class="d-sub" font-size="26">明日の仕事で試せる新機能・使い方</text>
<rect x="16" y="136" width="688" height="104" rx="12" class="d-accent"/>
<text x="360" y="180" text-anchor="middle" class="d-text" font-size="28">② 多くの人に関係</text>
<text x="360" y="220" text-anchor="middle" class="d-sub" font-size="26">ChatGPT・Copilot・Gemini など会員が使うツール</text>
<rect x="16" y="256" width="688" height="104" rx="12" class="d-accent"/>
<text x="360" y="300" text-anchor="middle" class="d-text" font-size="28">③ 知らないと損</text>
<text x="360" y="340" text-anchor="middle" class="d-sub" font-size="26">料金・データの扱いなどの変更</text>
</svg>
</figure>

## 今週のひとこと

今週は<strong>「会議」と「毎日の操作」</strong>が楽になる新機能が目立ちました。まずは1位の「録音から議事録」を、次の社内会議で試してみてください。プロンプトは「[議事録のプロンプト](/articles/2026-10-07-prompt-meeting-minutes)」にあります。
