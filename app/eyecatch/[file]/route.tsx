import { getAllArticles, isPrebuilt } from "@/lib/articles";
import { renderEyecatch } from "@/lib/eyecatch";

// /eyecatch/<記事のスラッグ>.png — 記事ごとのオリジナル・アイキャッチ画像（ビルド時に生成）
// /eyecatch/<記事のスラッグ>.sm.png — 一覧のサムネイル用の小さい版（600×315。見た目は同じ）
export const dynamic = "force-static";

export function generateStaticParams() {
  // 最近の記事だけビルド時に作る。古い記事の画像は最初に読まれたときに作って保存する
  return getAllArticles()
    .filter(isPrebuilt)
    .flatMap((a) => [{ file: `${a.slug}.png` }, { file: `${a.slug}.sm.png` }]);
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const file = (await params).file;
  const small = file.endsWith(".sm.png");
  const slug = file.replace(/(\.sm)?\.png$/, "");
  const article = getAllArticles().find((a) => a.slug === slug);
  if (!article) return new Response("Not found", { status: 404 });
  return renderEyecatch(article, small ? 0.5 : 1);
}
