import Link from "next/link";
import { getArticles } from "@/lib/articles";
import { LINE_URL } from "@/lib/links";
import { MONEY_NAME } from "@/lib/money";
import { SITE_MAP } from "@/lib/navigation";
import { NavLinks } from "@/components/NavLinks";
import { Ticker } from "@/components/Ticker";
import { HeaderIcon } from "@/components/HeaderIcon";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  // ティッカーには新着記事の見出しを流す（同じ内容はホームにリンクとしてあるので読み上げはしない）
  const latest = (await getArticles()).slice(0, 4).map((a) => a.title);
  const ticker = ["毎朝7時更新", ...latest, "今週のTopは毎週月曜更新"];

  return (
    <>
      <a href="#main" className="skip-link">
        本文へスキップ
      </a>
      <header className="site-header">
        <div className="wrap header-inner">
          <Link href="/" className="logo" aria-label="爆速AI NEWS トップへ">
            <img src="/brand/logo-header.png" alt="爆速AI" width={72} height={48} />
            <span className="logo-news">NEWS</span>
          </Link>
          <NavLinks moneyName={MONEY_NAME} />
          <div className="header-actions">
            {/* ヘッダーのボタンは「アイコン＋2文字」で統一。読み上げとマウスを重ねたときは正式名 */}
            <Link href="/guide" className="header-guide" aria-label="サイトの見方" title="サイトの見方">
              <HeaderIcon name="guide" />
              見方
            </Link>
            <Link href="/money" className="header-money" aria-label={`会員特典：${MONEY_NAME}`} title={`会員特典：${MONEY_NAME}`}>
              <HeaderIcon name="gift" />
              特典
            </Link>
            <a
              href={LINE_URL}
              {...external}
              className="header-line-btn"
              aria-label="LINEで質問（新しいタブで開く）"
              title="公式LINEで質問する"
            >
              <HeaderIcon name="chat" />
              質問
              <span className="header-ext" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>
      </header>

      <Ticker items={ticker} />

      <main id="main" className="wrap main" tabIndex={-1}>
        {children}
      </main>

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
