import Link from "next/link";
import { getArticles } from "@/lib/articles";
import { CATEGORIES, CATEGORY_KEYS } from "@/lib/categories";
import { LINE_URL } from "@/lib/links";
import { MONEY_NAME } from "@/lib/money";
import { SITE_MAP } from "@/lib/navigation";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  // ティッカーには新着記事の見出しを流す（同じ内容はホームにリンクとしてあるので読み上げはしない）
  const latest = (await getArticles()).slice(0, 4).map((a) => a.title);
  const ticker = ["毎朝7時更新", ...latest, "今週のTopは毎週月曜更新"];

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
            {/* 会員特典はメインではないので、最後に控えめに */}
            <Link href="/money" className="nav-link nav-money">
              <span className="nav-money-tag">特典</span>
              {MONEY_NAME}
            </Link>
          </nav>
          <div className="header-actions">
            <Link href="/guide" className="header-guide">
              はじめての方へ
            </Link>
            <a href={LINE_URL} {...external} className="header-line-btn">
              LINEで質問 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </header>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((n) => (
            <span key={n} className="ticker-group">
              {ticker.map((t) => (
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
          <p className="footer-catch">仕事に効くAI情報を、爆速で。</p>
          <nav className="footer-groups" aria-label="サイトの地図">
            {SITE_MAP.map((g) => (
              <div key={g.title} className="footer-group">
                <p className="footer-group-title">{g.title}</p>
                <ul>
                  {g.links.map((l) => (
                    <li key={l.href}>
                      {l.external ? (
                        <a href={l.href} {...external}>
                          {l.label} ↗
                        </a>
                      ) : (
                        <Link href={l.href}>{l.label}</Link>
                      )}
                    </li>
                  ))}
                  {g.title === "このサイトについて" && (
                    <li>
                      <form method="post" action="/logout" className="footer-logout">
                        <button type="submit">ログアウト</button>
                      </form>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </nav>
          <div className="footer-note">
            <p>爆速AI NEWS は爆速AI会員専用サイトです。記事・画像の転載や合言葉の共有はご遠慮ください。</p>
            <p>
              記事やAIについてのご質問は
              <a href={LINE_URL} {...external}>
                公式LINE
              </a>
              へ。
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
