import type { Metadata } from "next";
import { NotFoundContent } from "@/components/NotFoundContent";

export const metadata: Metadata = { title: "ページが見つかりません" };

// 会員ページの中で記事などが見つからないとき（ヘッダー・フッターは (site)/layout が付ける）
export default function NotFound() {
  return <NotFoundContent />;
}
