import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "./(site)/layout";
import { LINE_URL } from "@/lib/links";

export const metadata: Metadata = { title: "ページが見つかりません" };

// 存在しないURL・記事を開いたときの画面。サイトのヘッダー・フッターの中に出して、行き止まりにしない
export default function NotFound() {
  return (
    <SiteLayout>
      <section className="not-found">
        <p className="sh-en">404 NOT FOUND</p>
        <h1 className="not-found-title">ページが見つかりませんでした</h1>
        <p className="not-found-text">
          URLが間違っているか、記事の公開が終わった可能性があります。下のリンクから探してみてください。
        </p>
        <div className="not-found-actions">
          <Link href="/" className="btn-primary">
            ホームへ戻る
          </Link>
          <Link href="/archive" className="btn-ghost">
            バックナンバーから探す
          </Link>
        </div>
        <p className="not-found-help">
          見つからないときは
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
            公式LINE ↗
          </a>
          でお知らせください。
        </p>
      </section>
    </SiteLayout>
  );
}
