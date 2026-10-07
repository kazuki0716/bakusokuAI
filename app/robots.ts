import type { MetadataRoute } from "next";

// 会員限定サイトのため検索エンジンには載せない
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
