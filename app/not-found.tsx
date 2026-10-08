import type { Metadata } from "next";
import SiteLayout from "./(site)/layout";
import { NotFoundContent } from "@/components/NotFoundContent";

export const metadata: Metadata = { title: "ページが見つかりません" };

// 存在しないURLを開いたときの画面。サイトのヘッダー・フッターの中に出して、行き止まりにしない
export default function NotFound() {
  return (
    <SiteLayout>
      <NotFoundContent />
    </SiteLayout>
  );
}
