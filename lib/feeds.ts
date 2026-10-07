import { XMLParser } from "fast-xml-parser";
import { getOgImage } from "./ogp";

// 外部ニュースサイトのRSS。AI関連の記事だけを拾って「ニュースフィード」に並べる。
// 見出し・画像・リンクのみ表示し、本文は元サイトで読んでもらう（転載はしない）。
// 取得に失敗したフィードは自動的に無視されるので、追加・削除は気軽にしてOK。
export const FEEDS = [
  { name: "ITmedia AI+", url: "https://rss.itmedia.co.jp/rss/2.0/aiplus.xml", aiOnly: true },
  { name: "窓の杜", url: "https://forest.watch.impress.co.jp/data/rss/1.0/wf/feed.rdf", aiOnly: false },
  { name: "INTERNET Watch", url: "https://internet.watch.impress.co.jp/data/rss/1.0/iw/feed.rdf", aiOnly: false },
  { name: "GIGAZINE", url: "https://gigazine.net/news/rss_2.0/", aiOnly: false },
  { name: "OpenAI", url: "https://openai.com/news/rss.xml", aiOnly: true },
  { name: "Google AI Blog", url: "https://blog.google/technology/ai/rss/", aiOnly: true },
];

// aiOnly: false のフィードは、タイトルにこれらの語を含む記事だけを使う
const AI_KEYWORDS = /AI|ＡＩ|生成|ChatGPT|GPT|Gemini|Claude|Copilot|NotebookLM|OpenAI|Anthropic|LLM|エージェント|人工知能/i;

const MAX_ITEMS = 12;
const OGP_LOOKUPS = 12;

export type FeedItem = {
  title: string;
  url: string;
  source: string;
  date?: string; // ISO
  image?: string;
};

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_", textNodeName: "#text" });

function text(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string" || typeof v === "number") return String(v);
  if (typeof v === "object" && "#text" in (v as Record<string, unknown>)) return String((v as Record<string, unknown>)["#text"]);
  return "";
}

function asArray<T>(v: T | T[] | undefined): T[] {
  return v == null ? [] : Array.isArray(v) ? v : [v];
}

function imageFrom(item: Record<string, unknown>): string | undefined {
  const media = [item["media:thumbnail"], item["media:content"], item.enclosure].flatMap((m) => asArray(m as never));
  for (const m of media as Record<string, string>[]) {
    const url = m?.["@_url"];
    if (url && (!m["@_type"] || m["@_type"].startsWith("image"))) return url;
  }
  const html = text(item["content:encoded"]) || text(item.description);
  return html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
}

// RSS 2.0 / RSS 1.0(RDF) / Atom に対応
export function parseFeed(xml: string, source: string): FeedItem[] {
  const doc = parser.parse(xml);
  const raw = doc.rss?.channel?.item ?? doc["rdf:RDF"]?.item ?? doc.feed?.entry;
  return asArray<Record<string, unknown>>(raw).map((item) => {
    const link = item.link;
    const url =
      typeof link === "string"
        ? link
        : (asArray(link as never) as Record<string, string>[]).find((l) => !l["@_rel"] || l["@_rel"] === "alternate")?.["@_href"] ?? "";
    const dateRaw = text(item.pubDate) || text(item["dc:date"]) || text(item.published) || text(item.updated);
    const date = dateRaw && !Number.isNaN(Date.parse(dateRaw)) ? new Date(dateRaw).toISOString() : undefined;
    return { title: text(item.title).trim(), url: url.trim(), source, date, image: imageFrom(item) };
  });
}

async function fetchFeed(feed: (typeof FEEDS)[number]): Promise<FeedItem[]> {
  try {
    const res = await fetch(feed.url, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; BakusokuAINewsBot/1.0)" },
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 60 * 60 },
    });
    if (!res.ok) return [];
    const items = parseFeed(await res.text(), feed.name);
    return items.filter((i) => i.title && i.url && (feed.aiOnly || AI_KEYWORDS.test(i.title)));
  } catch {
    return [];
  }
}

export async function getFeedItems(): Promise<FeedItem[]> {
  const all = (await Promise.all(FEEDS.map(fetchFeed))).flat();
  const seen = new Set<string>();
  const items = all
    .filter((i) => (seen.has(i.url) ? false : (seen.add(i.url), true)))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
    .slice(0, MAX_ITEMS);

  // RSSに画像が無い記事は、記事ページのOGP画像を使う
  await Promise.all(
    items.slice(0, OGP_LOOKUPS).map(async (i) => {
      i.image ??= await getOgImage(i.url);
    }),
  );
  return items;
}
