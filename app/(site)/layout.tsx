import Link from "next/link";
import { CATEGORIES, CATEGORY_KEYS } from "@/lib/categories";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <Link href="/" className="logo" aria-label="爆速AI NEWS トップへ">
            <img src="/brand/logo-header.png" alt="爆速AI" width={72} height={48} />
            <small>NEWS</small>
          </Link>
          <p className="tagline">会員限定・仕事に効くAI情報</p>
          <form method="post" action="/logout" className="logout">
            <button type="submit">ログアウト</button>
          </form>
        </div>
        <nav className="cat-nav" aria-label="カテゴリ">
          <div className="wrap cat-nav-inner">
            <Link href="/">トップ</Link>
            {CATEGORY_KEYS.map((key) => (
              <Link key={key} href={`/c/${key}`}>
                {CATEGORIES[key].label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="wrap">{children}</main>
      <footer className="site-footer">
        <div className="wrap">
          <p>爆速AI NEWS は爆速AI会員専用サイトです。記事・画像の転載や合言葉の共有はご遠慮ください。</p>
          <p className="muted small">体系的な講座はレクティ、ご質問は公式LINEへ。</p>
        </div>
      </footer>
    </>
  );
}
