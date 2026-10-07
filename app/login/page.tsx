import type { Metadata } from "next";

export const metadata: Metadata = { title: "会員ログイン" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <div className="login">
      <div className="login-card">
        <div className="logo logo-lg">
          爆速<span>AI</span> <small>NEWS</small>
        </div>
        <p className="muted">爆速AI会員専用のニュースサイトです。会員向けにお知らせしている合言葉を入力してください。</p>
        <form method="post" action="/api/login">
          <input type="hidden" name="next" value={next ?? "/"} />
          <label htmlFor="password">合言葉</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus />
          {error === "1" && <p className="error">合言葉が違います。公式LINEのお知らせをご確認ください。</p>}
          {error === "unset" && <p className="error">合言葉が未設定です（運営者：Vercelの環境変数 SITE_PASSWORD を設定してください）。</p>}
          <button type="submit">ログイン</button>
        </form>
        <p className="muted small">合言葉が分からない場合は、爆速AI公式LINEまでお問い合わせください。</p>
      </div>
    </div>
  );
}
