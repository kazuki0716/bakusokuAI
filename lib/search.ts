import type { Article } from "./articles";
import { CATEGORIES } from "./categories";

// サイト内検索。全角・半角や大文字・小文字の違いをそろえてから、空白で区切った語を「すべて含む」記事を探す。
// タイトル・キーワードに出てくる記事ほど上に並べ、同じ点数なら新しい順
function normalize(s: string): string {
  return s.normalize("NFKC").toLowerCase();
}

function plainText(html: string): string {
  return html
    .replace(/<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ");
}

export function searchArticles(articles: Article[], query: string): Article[] {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const scored: { a: Article; score: number }[] = [];
  for (const a of articles) {
    const fields = {
      title: normalize(a.title),
      tags: normalize([...a.tags, a.task ?? "", a.skillup ?? "", CATEGORIES[a.category].label].join(" ")),
      summary: normalize(a.summary.join(" ")),
      body: normalize(plainText(a.html) + " " + a.ranking.map((r) => r.title).join(" ")),
    };
    let score = 0;
    let all = true;
    for (const w of words) {
      const s =
        (fields.title.includes(w) ? 5 : 0) +
        (fields.tags.includes(w) ? 3 : 0) +
        (fields.summary.includes(w) ? 2 : 0) +
        (fields.body.includes(w) ? 1 : 0);
      if (s === 0) {
        all = false;
        break;
      }
      score += s;
    }
    if (all) scored.push({ a, score });
  }
  return scored.sort((x, y) => y.score - x.score || (x.a.date < y.a.date ? 1 : -1)).map((x) => x.a);
}
