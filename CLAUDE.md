# 爆速AI NEWS

爆速AI（AIスクール）会員向けの、合言葉付きAIニュースキュレーションサイト。Next.js（App Router）で作り、Vercelで公開している。体系的な講座はレクティ側にあり、このサイトはニュース・動画・使い方・プロンプトの配信に絞っている。

## 構成

- `content/articles/*.md` — 記事（Markdown＋frontmatter）。`_` で始まるファイルは表示されない
- `public/images/articles/<slug>/` — 記事の画像・スクショ
- `lib/articles.ts` — 記事の読み込み、`lib/categories.ts` — カテゴリ定義
- `proxy.ts` ＋ `app/api/login` — 合言葉ログイン。合言葉はVercelの環境変数 `SITE_PASSWORD`
- `app/(site)/` — 会員ページ、`app/login/` — ログイン画面

## YourLife「お金の秘密辞典」（会員特典・AIニュースとは別枠）

- 公式LINEで配信しているお金のお得情報を `content/money-secrets.yaml` で管理する（新しいものを上に追加）
- 画像は `public/images/money/` に正方形で置く。表示は `/money` ページとトップページの特典枠
- AIニュースの定期実行ではこのファイルを触らない

### LINEの投稿を貼り付けられたときの追加手順

運営者がYourLife公式LINEの投稿（画像＋テキスト）をチャットに貼り付けたら、次の手順で追加する。

1. 画像を正方形（500×500のJPG）にして `public/images/money/<英語のスラッグ>.jpg` に保存する
2. `content/money-secrets.yaml` の**先頭**に1件追加する。`no` は既存の最大値＋1
   - `title`：画像の見出しから付ける（例：「チャンスは道端に落ちている｜運がいい人の視点の違い」）
   - `points`：「内容まとめ」の ✅ の行をそのまま入れる
   - `url`：「イラスト解説」「イラストまとめ」のリンク。`label` にはその見出し（例：イラスト解説）
   - LINEの絵文字表記（`(Brown hug)` `(documents)` `(pencil)` など）は取り除く
   - リンクが無い回は `url` を省略する（「公式LINEで配信中」と表示される）
3. `npm run build` が通ることを確認し、コミットして本番ブランチに push する

## 記事を書くとき

必ず `docs/editorial-guide.md` を読んでから書くこと。テンプレートは `content/articles/_template.md`。

- 事実は WebSearch などで確認し、出典を `sources` に入れる。確認できないことは書かない
- 図解はインラインSVG（ガイドの「図解」参照）。各AIツールの画面スクショは撮れないので差し込み枠を置く

## 確認コマンド

```
npm run build        # 記事のfrontmatterの誤りもここで検出される
SITE_PASSWORD=test npm run dev
```
