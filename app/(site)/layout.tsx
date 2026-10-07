import Link from "next/link";
import { CATEGORIES, CATEGORY_KEYS } from "@/lib/categories";
import { LECTEA_COURSES_URL } from "@/lib/links";
import { MONEY_NAME } from "@/lib/money";

const TICKER = ["仕事に効くAI情報を、爆速で。", "毎週更新 WEEKLY TOP", "ChatGPT / Gemini / Claude / Copilot", "爆速AI会員限定"];

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <Link href="/" className="logo" aria-label="爆速AI NEWS トップへ">
            <img src="/brand/logo-header.png" alt="爆速AI" width={72} height={48} />
            <span className="logo-news">NEWS</span>
          </Link>
          <nav className="nav" aria-label="カテゴリ">
            {CATEGORY_KEYS.map((key) => (
              <Link key={key} href={`/c/${key}`} className={`nav-link nav-${key}`}>
                {CATEGORIES[key].label}
              </Link>
            ))}
            <Link href="/money" className="nav-link nav-money">
              {MONEY_NAME}
            </Link>
          </nav>
          <a href={LECTEA_COURSES_URL} target="_blank" rel="noopener noreferrer" className="course-btn">
            講座を見る <span aria-hidden="true">↗</span>
          </a>
          <form method="post" action="/logout" className="logout">
            <button type="submit">ログアウト</button>
          </form>
        </div>
      </header>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((n) => (
            <span key={n} className="ticker-group">
              {TICKER.map((t) => (
                <span key={t} className="ticker-item">
                  {t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <main className="wrap main">{children}</main>

      <footer className="site-footer">
        <div className="wrap">
          <p className="footer-mark">
            BAKUSOKU<span>AI</span>NEWS
          </p>
          <div className="footer-cols">
            <nav className="footer-nav" aria-label="フッター">
              {CATEGORY_KEYS.map((key) => (
                <Link key={key} href={`/c/${key}`}>
                  {CATEGORIES[key].label}
                </Link>
              ))}
              <Link href="/money">YourLife {MONEY_NAME}</Link>
              <Link href="/archive">バックナンバー</Link>
              <a href={LECTEA_COURSES_URL} target="_blank" rel="noopener noreferrer">
                爆速AIの講座（レクティ）↗
              </a>
            </nav>
            <div className="footer-note">
              <p>爆速AI NEWS は爆速AI会員専用サイトです。記事・画像の転載や合言葉の共有はご遠慮ください。</p>
              <p>体系的な講座はレクティ、ご質問は公式LINEへ。</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
