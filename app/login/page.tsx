import type { Metadata } from "next";
import { LINE_URL } from "@/lib/links";

export const metadata: Metadata = { title: "会員ログイン" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string; loggedout?: string }>;
}) {
  const { error, next, loggedout } = await searchParams;
  const message =
    error === "1"
      ? "合言葉が違います。公式LINEのお知らせをご確認ください。"
      : error === "unset"
        ? "合言葉が未設定です（運営者：Vercelの環境変数 SITE_PASSWORD を設定してください）。"
        : undefined;

  return (
    <main className="login">
      <div className="login-card">
        <h1 className="login-logo">
          <img src="/brand/logo.png" alt="爆速AI" width={180} height={120} />
          <small>NEWS</small>
          <span className="visually-hidden">会員ログイン</span>
        </h1>
        {loggedout && !message && (
          <p className="login-notice" role="status">
            ログアウトしました。また合言葉を入力すると、いつでも読めます。
          </p>
        )}
        <p className="muted">爆速AI会員専用のニュースサイトです。会員向けにお知らせしている合言葉を入力してください。</p>
        <form method="post" action="/api/login">
          <input type="hidden" name="next" value={next ?? "/"} />
          <label htmlFor="password">合言葉</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            autoFocus
            aria-invalid={message ? true : undefined}
            aria-describedby={message ? "login-error" : undefined}
          />
          {message && (
            <p id="login-error" className="error" role="alert">
              ⚠ {message}
            </p>
          )}
          <button type="submit">ログイン</button>
        </form>
        <p className="muted small">
          合言葉が分からない場合は、
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="login-help-link">
            爆速AI公式LINE
            <span aria-hidden="true"> ↗</span>
            <span className="visually-hidden">（新しいタブで開きます）</span>
          </a>
          までお問い合わせください。
        </p>
      </div>
    </main>
  );
}
