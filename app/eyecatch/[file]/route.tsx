import { getAllArticles } from "@/lib/articles";
import { renderEyecatch } from "@/lib/eyecatch";

// /eyecatch/<記事のスラッグ>.png — 記事ごとのオリジナル・アイキャッチ画像（ビルド時に生成）
export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ file: `${a.slug}.png` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const slug = (await params).file.replace(/\.png$/, "");
  const article = getAllArticles().find((a) => a.slug === slug);
  if (!article) return new Response("Not found", { status: 404 });
  return renderEyecatch(article);
}
