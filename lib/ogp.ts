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

export type StockPhoto = { image: string; credit: string; creditUrl?: string };

// 無料素材サイト Unsplash の API で、キーワードに合う写真を探す（環境変数 UNSPLASH_ACCESS_KEY が必要）
// https://unsplash.com/developers — 無料。撮影者名とUnsplashへのリンクの表記が必要
async function searchUnsplash(query: string): Promise<StockPhoto | undefined> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return undefined;
  const headers = { authorization: `Client-ID ${key}`, "accept-version": "v1" };
  const url = `https://api.unsplash.com/search/photos?${new URLSearchParams({ query, per_page: "1", orientation: "landscape", content_filter: "high" })}`;
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(6000), next: { revalidate: 60 * 60 * 24 * 7 } });
  if (!res.ok) return undefined;
  const photo = (await res.json()).results?.[0];
  if (!photo?.urls?.regular) return undefined;
  // Unsplashの規約：写真を使ったらダウンロード数を記録するAPIを呼ぶ
  if (photo.links?.download_location) {
    fetch(photo.links.download_location, { headers, signal: AbortSignal.timeout(6000) }).catch(() => {});
  }
  const utm = "utm_source=bakusoku_ai_news&utm_medium=referral";
  return {
    image: photo.urls.regular,
    credit: `Photo: ${photo.user?.name ?? "Unknown"} / Unsplash`,
    creditUrl: `${photo.links?.html ?? "https://unsplash.com"}?${utm}`,
  };
}

// 無料素材サイト Pexels の API（環境変数 PEXELS_API_KEY がある場合のみ）
async function searchPexels(query: string): Promise<StockPhoto | undefined> {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return undefined;
  const url = `https://api.pexels.com/v1/search?${new URLSearchParams({ query, per_page: "1", orientation: "landscape" })}`;
  const res = await fetch(url, { headers: { authorization: key }, signal: AbortSignal.timeout(6000), next: { revalidate: 60 * 60 * 24 * 7 } });
  if (!res.ok) return undefined;
  const photo = (await res.json()).photos?.[0];
  if (!photo?.src) return undefined;
  return { image: photo.src.landscape ?? photo.src.large, credit: `Photo: ${photo.photographer} / Pexels`, creditUrl: photo.url };
}

// キーワードに合う無料素材写真を探す（Unsplash → Pexels の順）
export async function searchStockPhoto(query: string): Promise<StockPhoto | undefined> {
  if (!query) return undefined;
  for (const search of [searchUnsplash, searchPexels]) {
    try {
      const photo = await search(query);
      if (photo) return photo;
    } catch {
      // 次の素材サイトを試す
    }
  }
  return undefined;
}
