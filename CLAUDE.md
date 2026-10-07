# 爆速AI NEWS

爆速AI（AIスクール）会員向けの、合言葉付きAIニュースキュレーションサイト。Next.js（App Router）で作り、Vercelで公開している。体系的な講座はレクティ側にあり、このサイトはニュース・動画・使い方・プロンプトの配信に絞っている。

## 構成

- `content/articles/*.md` — 記事（Markdown＋frontmatter）。`_` で始まるファイルは表示されない
- `public/images/articles/<slug>/` — 記事の画像・スクショ
- `lib/articles.ts` — 記事の読み込み、`lib/categories.ts` — カテゴリ定義
- `proxy.ts` ＋ `app/api/login` — 合言葉ログイン。合言葉はVercelの環境変数 `SITE_PASSWORD`
- `app/(site)/` — 会員ページ、`app/login/` — ログイン画面

## 記事を書くとき

必ず `docs/editorial-guide.md` を読んでから書くこと。テンプレートは `content/articles/_template.md`。

- 事実は WebSearch などで確認し、出典を `sources` に入れる。確認できないことは書かない
- 図解はインラインSVG（ガイドの「図解」参照）。各AIツールの画面スクショは撮れないので差し込み枠を置く

## 確認コマンド

```
npm run build        # 記事のfrontmatterの誤りもここで検出される
SITE_PASSWORD=test npm run dev
```
