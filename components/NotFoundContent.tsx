import Link from "next/link";
import { LINE_URL } from "@/lib/links";

// 404の中身（ホーム・バックナンバー・公式LINEへの導線）
export function NotFoundContent() {
  return (
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
  );
}
