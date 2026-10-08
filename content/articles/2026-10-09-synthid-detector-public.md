---
title: "その画像、AIで作られた？　Googleの判定ツール「SynthID Detector」が誰でも無料で使えるように"
date: 2026-10-09
category: news
thumbLabel: "AI製の画像を見分ける"
thumbnail: "https://forest.watch.impress.co.jp/img/wf/list/2146/802/synthid_detector.jpg"
thumbnailCredit: "出典：窓の杜「Google、AI生成コンテンツを見分ける「SynthID Detector」を一般に開放」"
thumbnailCreditUrl: "https://forest.watch.impress.co.jp/docs/news/2146802.html"
summary:
  - Googleは2026年10月7日（米国時間）、画像・動画・音声がAIで作られたかを調べる「SynthID Detector」を、世界中の誰でも使えるようにした（画面は英語のみ）
  - Google・Apple・ChatGPTのアカウントでログインしてファイルを上げるだけ。Googleのほか、OpenAI・NVIDIA・Kakaoの生成AIで作られたものも判定できる
  - 取引先から届いた画像や、SNSで広がる動画の「本物かどうか」を確かめる手がかりが、無料で手に入る
impact: "広報や営業で、SNSや取引先から届いた画像・動画を資料に使う前に「これは本物？」と迷う場面は増えています。SynthID Detectorにファイルを上げれば、GoogleやOpenAIなどのAIで作られたものかを、ファイルを上げるだけで確かめられます。ただし「検出されなかった＝本物」ではないので、まずは判定の結果を、確認の手がかりの1つとして使ってみてください。"
tags: [Google, AIの注意点, 画像生成]
audience: [経営者・管理職, 事務・総務・経理, マーケ・営業]
level: 初級
sources:
  - title: "We're making it easier to identify AI-generated content globally."
    url: "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/synth-id-ai-content/"
    media: "Google公式ブログ"
    image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Raccoon_Video_SynthIDDetector.max-1440x810.png"
  - title: "Google、AI生成コンテンツを見分ける「SynthID Detector」を一般に開放"
    url: "https://forest.watch.impress.co.jp/docs/news/2146802.html"
    media: "窓の杜"
  - title: "Google、AI生成物の判定ツールを一般公開　OpenAIやNVIDIA製サービスも対象に"
    url: "https://www.itmedia.co.jp/news/article/2610/08/2000002128/"
    media: "ITmedia NEWS"
---

## 何が変わったの？

Googleは2026年10月7日（米国時間）、**画像・動画・音声がAIで作られたかを調べるツール「SynthID Detector」を、世界中の誰でも使えるようにした**と公式ブログで発表しました。これまでは、報道関係者向けの試験版でした。

SynthID（シンスアイディー）とは、AIで作った画像や動画に入れる、**人の目には見えない「透かし」**です。Googleは2023年から使っていて、これまでに1,800億点以上の画像・動画に入れたと説明しています。SynthID Detectorは、この透かしが入っているかを調べます。

| 項目 | 内容 |
|---|---|
| 使える人 | 世界中の誰でも（画面は英語のみ） |
| 使い方 | Google・Apple・ChatGPTのいずれかのアカウントでログインし、ファイルを上げる |
| 調べられるもの | 画像・動画・音声（窓の杜によると、画像はJPEG・PNG・HEICなど、動画はMP4・MOVなど、音声はMP3・M4Aなど） |
| 判定できるAI | Googleのほか、OpenAI・NVIDIA・Kakao。Appleも対応予定 |
| 料金 | 無料（1日に使える回数には上限があると報じられています） |

<figure class="diagram">
<svg viewBox="0 0 720 560" role="img" aria-label="SynthID Detectorの使い方：アカウントでログインし、画像・動画・音声のファイルを上げると、AIの透かしが検出されたか、検出されなかったかが表示される。検出されなかった場合も本物とは限らない">
<defs><marker id="sd1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-arrowhead"/></marker></defs>
<rect x="110" y="16" width="500" height="100" rx="12" class="d-box"/>
<text x="360" y="58" text-anchor="middle" class="d-text" font-size="28">① ログイン</text>
<text x="360" y="96" text-anchor="middle" class="d-sub" font-size="26">Google・Apple・ChatGPT</text>
<path d="M360,116 L360,148" class="d-arrow" marker-end="url(#sd1)"/>
<rect x="110" y="154" width="500" height="100" rx="12" class="d-box"/>
<text x="360" y="196" text-anchor="middle" class="d-text" font-size="28">② ファイルを上げる</text>
<text x="360" y="234" text-anchor="middle" class="d-sub" font-size="26">画像・動画・音声</text>
<path d="M300,254 L190,300" class="d-arrow" marker-end="url(#sd1)"/>
<path d="M420,254 L530,300" class="d-arrow" marker-end="url(#sd1)"/>
<rect x="24" y="306" width="332" height="120" rx="12" class="d-accent"/>
<text x="190" y="354" text-anchor="middle" class="d-text" font-size="28">検出された</text>
<text x="190" y="394" text-anchor="middle" class="d-sub" font-size="26">AIで作られた・直された</text>
<rect x="364" y="306" width="332" height="120" rx="12" class="d-box"/>
<text x="530" y="354" text-anchor="middle" class="d-text" font-size="28">検出されなかった</text>
<text x="530" y="394" text-anchor="middle" class="d-sub" font-size="26">本物とは限らない</text>
<text x="360" y="480" text-anchor="middle" class="d-sub" font-size="26">対応していないAIで作ったものや、</text>
<text x="360" y="518" text-anchor="middle" class="d-sub" font-size="26">大きく加工したものは見分けられない</text>
</svg>
<figcaption>図：「検出された」は強い手がかり。「検出されなかった」は本物の証明ではない</figcaption>
</figure>

## 仕事ではこう使う

1. ブラウザで [synthid.com](https://synthid.com/) を開き、Google・Apple・ChatGPTのアカウントでログインする
2. 確かめたい画像・動画・音声のファイルを上げる
3. 結果を見る。動画と音声は、透かしが入っている部分の場所も表示されると報じられています

たとえば、次のような場面で役立ちます。

- SNSで話題の「事故・災害の写真」を、社内の注意喚起に使う前に確かめる
- 取引先や応募者から届いた画像に、AIで加工した跡がないか見る
- 自社で生成AIを使って作った画像に、透かしがきちんと入っているか確かめる

## 気をつけること

- **「検出されなかった」は「本物」の証明ではありません。** 調べられるのは、SynthIDの透かしを入れているAI（GoogleとOpenAI・NVIDIA・Kakao）で作られたものだけです。ほかのAIで作られたものは見分けられません。
- **大きく加工された画像では、透かしが読み取れないことがある**と報じられています。
- **社外秘のファイルは上げない。** 上げたファイルは判定後すぐに消されると報じられていますが、会社の情報の扱いのルールに従ってください。
- 文章（テキスト）がAIで書かれたかどうかの判定には触れられていません。
