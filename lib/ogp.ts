// 外部ページのアイキャッチ画像（og:image / twitter:image）をビルド時に取得する。
// 取得できなかった場合は undefined を返し、呼び出し側でカテゴリ柄のサムネに切り替える。

const UA = "Mozilla/5.0 (compatible; BakusokuAINewsBot/1.0; +https://bakusokuai.vercel.app)";
const cache = new Map<string, Promise<string | undefined>>();

function pickMeta(html: string, key: string): string | undefined {
  // <meta property="og:image" content="..."> と属性順が逆のパターンの両方に対応
  const patterns = [
    new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]*content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["']${key}["']`, "i"),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1].replace(/&amp;/g, "&");
  }
  return undefined;
}

async function fetchOgImage(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA, accept: "text/html" },
      signal: AbortSignal.timeout(6000),
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) return undefined;
    const html = (await res.text()).slice(0, 200_000);
    const image = pickMeta(html, "og:image") ?? pickMeta(html, "twitter:image") ?? pickMeta(html, "twitter:image:src");
    return image ? new URL(image, res.url || url).toString() : undefined;
  } catch {
    return undefined;
  }
}

export function getOgImage(url: string | undefined): Promise<string | undefined> {
  if (!url || !/^https?:\/\//.test(url)) return Promise.resolve(undefined);
  if (!cache.has(url)) cache.set(url, fetchOgImage(url));
  return cache.get(url)!;
}

export function youtubeThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
