import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, categoryHref } from "@/lib/categories";
import { LECTEA_COURSES_URL, LINE_URL } from "@/lib/links";
import { MONEY_NAME } from "@/lib/money";
import { SITE_MAP } from "@/lib/navigation";
import { SCHEDULE, todayJST } from "@/lib/schedule";
import { LineBanner } from "@/components/LineBanner";

export const metadata: Metadata = { title: "サイトの見方" };

// 今日の曜日をハイライトするため、1時間ごとに作り直す
export const revalidate = 3600;

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

const CORNERS = [
  { key: "weekly", when: "忙しくて毎日は見られない。1週間分をまとめて知りたい", time: "5分" },
  { key: "news", when: "ChatGPT・Gemini・Claude・Copilotの新しい機能や、料金の変更を知りたい", time: "3分" },
  { key: "video", when: "実際の画面で、やり方を見ながら覚えたい（立場別に1本ずつ厳選）", time: "10〜20分" },
  { key: "howto", when: "メール・議事録・Excelなど、自分の仕事で今日から試したい", time: "5〜10分" },
  { key: "prompt", when: "AIへの頼み方（指示文）をコピーして、すぐ使いたい", time: "1分" },
] as const;

const TOC = [
  ["schedule", "更新スケジュール"],
  ["corners", "コーナーの使い分け"],
  ["how", "おすすめの読み方"],
  ["article", "記事の読み方"],
  ["help", "困ったときは"],
  ["map", "サイトの地図"],
] as const;

export default function GuidePage() {
  const today = todayJST();
  const days = [...SCHEDULE].sort((a, b) => ((a.wd + 6) % 7) - ((b.wd + 6) % 7));

  return (
    <article className="guide-page">
      <header className="page-head">
        <p className="page-en">GUIDE</p>
        <h1 className="page-title">サイトの見方</h1>
        <p className="page-desc">
          AIの新しい情報を、仕事に使える形で毎朝お届けするサイトです。全部読む必要はありません。1日3分、気になるものだけで大丈夫です。
        </p>
        <nav className="guide-toc" aria-label="このページの目次">
          {TOC.map(([id, label], i) => (
            <a key={id} href={`#${id}`}>
              <span>{i + 1}</span>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <section id="schedule" className="guide-section">
        <h2 className="guide-h2">
          <span>1</span>更新スケジュール
        </h2>
        <p>毎朝7時ごろに更新します。毎日ニュース2本、さらに曜日ごとにおすすめを1本追加します。</p>
        <table className="guide-table">
          <thead>
            <tr>
              <th scope="col">曜日</th>
              <th scope="col">毎日</th>
              <th scope="col">＋この日のおすすめ</th>
            </tr>
          </thead>
          <tbody>
            {days.map((s) => (
              <tr key={s.wd} className={s.wd === today.wd ? "is-today" : undefined}>
                <th scope="row">
                  {s.short}
                  {s.wd === today.wd && <span className="guide-today">今日</span>}
                </th>
                <td>ニュース2本</td>
                <td>
                  <Link href={s.href}>{s.detail}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section id="corners" className="guide-section">
        <h2 className="guide-h2">
          <span>2</span>コーナーの使い分け
        </h2>
        <ul className="guide-corners">
          {CORNERS.map((c) => (
            <li key={c.key}>
              <Link href={categoryHref(c.key)} className={`guide-corner guide-corner-${c.key}`}>
                <span className={`cat cat-${c.key}`}>{CATEGORIES[c.key].label}</span>
                <span className="guide-corner-when">{c.when}</span>
                <span className="guide-corner-time">1本の目安：{c.time}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/money" className="guide-corner guide-corner-money">
              <span className="cat cat-money">会員特典</span>
              <span className="guide-corner-when">
                YourLife「{MONEY_NAME}」。AI以外の、お金のお得情報です。公式LINEの配信をまとめています
              </span>
            </Link>
          </li>
        </ul>
      </section>

      <section id="how" className="guide-section">
        <h2 className="guide-h2">
          <span>3</span>おすすめの読み方
        </h2>
        <dl className="guide-how">
          <div>
            <dt>はじめての方</dt>
            <dd>
              まず月曜の<Link href="/c/weekly">「今週のTop」</Link>を見て、気になった記事を1本。次に
              <Link href="/c/howto#prompt">「プロンプト」</Link>をコピーして、実際にAIに貼ってみてください。
            </dd>
          </div>
          <div>
            <dt>毎日の習慣に</dt>
            <dd>朝、ホームの「今日の記事」だけ。タイトルと1行まとめを読んで、気になったら本文へ。</dd>
          </div>
          <div>
            <dt>経営者・管理職の方</dt>
            <dd>
              火曜の動画と<Link href="/for/executive">経営者・管理職向けのページ</Link>
              。ニュースの「爆速AIからのひとこと」に、会社として気にしたい点を書いています。
            </dd>
          </div>
          <div>
            <dt>事務・総務・経理の方</dt>
            <dd>
              木曜の動画と<Link href="/c/howto">使い方・プロンプト</Link>
              。Excel・議事録・メールのやり方が中心です（<Link href="/for/backoffice">まとめページ</Link>）。
            </dd>
          </div>
          <div>
            <dt>マーケ・営業の方</dt>
            <dd>
              土曜の動画と<Link href="/c/news">ニュース</Link>。新しいツールをいち早く試したい方向けです（
              <Link href="/for/sales">まとめページ</Link>）。
            </dd>
          </div>
          <div>
            <dt>スマホのホーム画面に追加すると便利</dt>
            <dd>
              iPhoneは Safari の共有ボタン →「ホーム画面に追加」、Androidは Chrome のメニュー →「ホーム画面に追加」。アプリのように1タップで開けます。
            </dd>
          </div>
        </dl>
      </section>

      <section id="article" className="guide-section">
        <h2 className="guide-h2">
          <span>4</span>記事の読み方
        </h2>
        <ul className="guide-marks">
          <li>
            <strong>3 POINTS（3行でわかる）</strong>：まずここだけ読めばOKです
          </li>
          <li>
            <strong>COLUMN 爆速AIからのひとこと</strong>：編集部が「仕事でどう使うか」を書いたコメントです
          </li>
          <li>
            <strong>元記事・出典</strong>：情報の出どころです。くわしく知りたいときに開いてください
          </li>
          <li>
            <span className="new">NEW</span>：公開から3日以内の記事／<span className="level">初級</span>
            <span className="level">中級</span>：むずかしさの目安
          </li>
          <li>
            カテゴリの色：
            {(["weekly", "news", "video", "howto", "prompt"] as const).map((k) => (
              <span key={k} className={`cat cat-${k}`}>
                {CATEGORIES[k].label}
              </span>
            ))}
          </li>
          <li>半年以上前の記事には「古い情報です」の注意が出ます。AIは変化が速いので、新しい記事もあわせて確認してください。</li>
        </ul>
      </section>

      <section id="help" className="guide-section">
        <h2 className="guide-h2">
          <span>5</span>困ったときは
        </h2>
        <ul className="guide-marks">
          <li>
            記事の内容やAIの使い方で分からないことは、<a href={LINE_URL} {...external}>公式LINE</a>
            で質問してください。「うちの業務だとどう使う？」のような相談も歓迎です。
          </li>
          <li>合言葉が分からなくなったときも、公式LINEでお問い合わせください。</li>
          <li>合言葉や記事・画像を、会員以外の方に共有するのはご遠慮ください。</li>
        </ul>
        <LineBanner title="AIのこと、公式LINEで気軽に質問できます" sub="記事のこと・AIの使い方・合言葉のことなど、なんでもどうぞ。" />
      </section>

      <section id="map" className="guide-section">
        <h2 className="guide-h2">
          <span>6</span>サイトの地図
        </h2>
        <div className="guide-map">
          {SITE_MAP.map((g) => (
            <div key={g.title} className="guide-map-group">
              <h3>{g.title}</h3>
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
                    {l.note && <span>{l.note}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="guide-section guide-courses">
        <h2 className="guide-h3">もっと体系的に学びたい方へ</h2>
        <p>
          基礎から順番に学びたい方は、爆速AIの講座（レクティ）もご利用いただけます。
          <a href={LECTEA_COURSES_URL} {...external}>
            講座の一覧を見る ↗
          </a>
        </p>
      </section>
    </article>
  );
}
