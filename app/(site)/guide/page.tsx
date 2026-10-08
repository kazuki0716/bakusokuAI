import type { Metadata } from "next";
import Link from "next/link";
import { LevelBadge } from "@/components/LevelBadge";
import { CATEGORIES, MENU } from "@/lib/categories";
import { LECTEA_COURSES_URL, LINE_URL } from "@/lib/links";
import { MONEY_NAME } from "@/lib/money";
import { SITE_MAP } from "@/lib/navigation";
import { SCHEDULE, todayJST } from "@/lib/schedule";
import { LineBanner } from "@/components/LineBanner";

export const metadata: Metadata = { title: "サイトの見方" };

// 今日の曜日をハイライトするため、1時間ごとに作り直す
export const revalidate = 3600;

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// メニューの4つのコーナー（MENU と同じ並び）。更新の回数は lib/schedule.ts・編集ガイド3章と合わせる
const CORNERS: {
  key: "weekly" | "news" | "video" | "howto";
  when: string;
  update: string;
  time?: string;
  parts?: { label: string; text: string; time: string }[];
}[] = [
  {
    key: "weekly",
    when: "忙しくて毎日は見られない。1週間分をまとめて知りたい",
    update: "毎週月曜",
    time: "5分",
  },
  {
    key: "news",
    when: "ChatGPT・Gemini・Claude・Copilotの新しい機能や、料金・ルールの変更を知りたい",
    update: "毎朝2本",
    time: "3分",
  },
  {
    key: "video",
    when: "実際の画面で、やり方を見ながら覚えたい（立場別と「AIで自分磨き」の動画を厳選）",
    update: "週4本（火・木・土は立場別）",
    time: "5〜20分",
  },
  {
    key: "howto",
    when: "メール・議事録・Excelなど、自分の仕事で今日から試したい",
    update: "週3本",
    parts: [
      { label: "ノウハウ", text: "仕事ごとの手順を図解で（水・日）", time: "5〜10分" },
      { label: "プロンプト", text: "AIへの頼み方をコピーしてすぐ使う（金）", time: "1分" },
    ],
  },
];

const TOC = [
  ["schedule", "更新スケジュール"],
  ["corners", "コーナーの使い分け"],
  ["find", "記事の探し方"],
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
        <p className="guide-note">
          動画は「公開から1週間以内・5分以上・ある程度見られて反応がある」動画だけを選んでいます。条件に合う動画が無い日はお休みします。
        </p>
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
        <p>上のメニュー（スマホでは画面の下）の4つのコーナーです。</p>
        <ul className="guide-corners">
          {CORNERS.map((c) => {
            const menu = MENU.find((m) => m.key === c.key)!;
            return (
              <li key={c.key}>
                <Link href={`/c/${c.key}`} className={`guide-corner guide-corner-${c.key}`}>
                  <span className={`cat cat-${c.key}`}>{menu.label}</span>
                  <span className="guide-corner-when">{c.when}</span>
                  {c.parts && (
                    <span className="guide-corner-parts">
                      {c.parts.map((p) => (
                        <span key={p.label}>
                          <strong>{p.label}</strong>：{p.text}（1本{p.time}）
                        </span>
                      ))}
                    </span>
                  )}
                  <span className="guide-corner-time">
                    更新：{c.update}
                    {c.time && `／1本の目安：${c.time}`}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="guide-note">
          会員特典のYourLife「{MONEY_NAME}」（AI以外の、お金のお得情報）は、AIのコーナーとは別に、画面右上の
          <Link href="/money">「特典」</Link>から見られます。
        </p>
      </section>

      <section id="find" className="guide-section">
        <h2 className="guide-h2">
          <span>3</span>記事の探し方
        </h2>
        <dl className="guide-how">
          <div>
            <dt>メニュー</dt>
            <dd>
              PCは画面の上、スマホは画面の下にあります。どのページからでも、ホームと4つのコーナーへ1回で移れます。画面右上の「見方」はこのページ、「特典」は会員特典、「質問」は公式LINEです。
            </dd>
          </div>
          <div>
            <dt>自分の立場から</dt>
            <dd>
              ホームの「あなたの立場から探す」で、
              <Link href="/for/executive">経営者・管理職</Link>／<Link href="/for/backoffice">事務・総務・経理</Link>／
              <Link href="/for/sales">マーケ・営業</Link>向けの記事をまとめて見られます。
            </dd>
          </div>
          <div>
            <dt>やりたい仕事から</dt>
            <dd>
              ホームの<Link href="/#tasks">「やりたい仕事から探す」</Link>で、メール・議事録・Excelなど10の仕事ごとに記事を探せます。
            </dd>
          </div>
          <div>
            <dt>むずかしさで</dt>
            <dd>記事の一覧の上にある「むずかしさ」のボタンで、初級・中級・上級に絞り込めます。</dd>
          </div>
          <div>
            <dt>キーワード・過去の記事</dt>
            <dd>
              ホームの下の「もっと探す」から、よく出てくるキーワード（#ChatGPT など）や、月ごとの
              <Link href="/archive">バックナンバー</Link>で探せます。
            </dd>
          </div>
        </dl>
      </section>

      <section id="how" className="guide-section">
        <h2 className="guide-h2">
          <span>4</span>おすすめの読み方
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
              木曜の動画と<Link href="/c/howto">ノウハウ</Link>
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
              iPhoneは Safari の共有ボタン →「ホーム画面に追加」、Androidは Chrome のメニュー →「ホーム画面に追加」。1タップで開けます。
            </dd>
          </div>
        </dl>
      </section>

      <section id="article" className="guide-section">
        <h2 className="guide-h2">
          <span>5</span>記事の読み方
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
            <strong>コピー</strong>：プロンプトなどの枠の右上のボタンで、中身をそのままコピーできます。AIに貼り付けて使ってください
          </li>
          <li id="saved">
            <strong>節約した時間</strong>：プロンプトを「コピー」して使えたら、すぐ下に出る「使えた」を押してください。記事ごとの目安（例：手作業30分 → AIで10分なら20分）が、ホームの「今月節約した時間」にたまります。爆速AIの目標「月10時間」まで、どれだけ近づいたかが分かります。同じ記事は1日1回まで、毎月1日に0から始まります。記録はこの端末のブラウザに保存されるので、スマホとPCでは別々に数えます（ブラウザの履歴を消すと0に戻ります）
          </li>
          <li>
            <span className="new">NEW</span>：公開から3日以内の記事
          </li>
          <li>
            むずかしさ：<LevelBadge level="初級" />AIをほとんど使ったことがなくてもできる／
            <LevelBadge level="中級" />ふだんAIを使っている人向け（ファイルの読み込みや機能の組み合わせ）／
            <LevelBadge level="上級" />
            仕組み化・チームへの展開まで。一覧の「むずかしさ」ボタンで絞り込めます
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
          <span>6</span>困ったときは
        </h2>
        <ul className="guide-marks">
          <li>
            記事の内容やAIの使い方で分からないことは、<a href={LINE_URL} {...external}>公式LINE</a>
            で質問してください。「うちの業務だとどう使う？」のような相談も歓迎です。
          </li>
          <li>合言葉が分からなくなったときも、公式LINEでお問い合わせください。</li>
          <li>共用のパソコンで読んだあとは、ページのいちばん下の「ログアウト」を押してください。</li>
          <li>合言葉や記事・画像を、会員以外の方に共有するのはご遠慮ください。</li>
        </ul>
        <LineBanner title="AIのこと、公式LINEで気軽に質問できます" sub="記事のこと・AIの使い方・合言葉のことなど、なんでもどうぞ。" />
      </section>

      <section id="map" className="guide-section">
        <h2 className="guide-h2">
          <span>7</span>サイトの地図
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
