import Link from "next/link";
import { formatDate, formatMonth, type Article } from "@/lib/articles";
import { CATEGORIES, isForTask, PERSONAS, SKILLUP, TASK_LIST, type CategoryKey } from "@/lib/categories";
import { shortDate } from "@/lib/schedule";
import { ArticleCard, CategoryLabel, NewBadge, SectionHeading, Thumb } from "../ArticleParts";

// ② 今日の記事（PICK UP と新着をまとめたもの）
export function TodayUpdates({ list, isFallback, date }: { list: Article[]; isFallback: boolean; date: string }) {
  if (list.length === 0) return null;
  return (
    <section id="today" className="block home-section reveal">
      <SectionHeading en="TODAY" ja={isFallback ? `最新の記事（${shortDate(date)}）` : "今日の記事"} />
      <ul className="today-list">
        {list.map((a, i) => (
          <li key={a.slug} className={i === 0 ? "today-item today-item-lg" : "today-item"}>
            <Link href={`/articles/${a.slug}`} className="today-card">
              <span className="today-thumb">
                <Thumb article={a} large={i === 0} />
              </span>
              <span className="today-body">
                <span className="card-meta">
                  <CategoryLabel article={a} />
                  <NewBadge date={a.date} />
                  {a.level && <span className="level">{a.level}</span>}
                </span>
                <span className="today-title">{a.title}</span>
                {a.summary[0] && <span className="today-sum">{a.summary[0]}</span>}
                <span className="today-go">
                  記事を読む <span aria-hidden="true">→</span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="archive-link">
        <Link href="/archive">それより前の記事はバックナンバーへ →</Link>
      </p>
    </section>
  );
}

// ③ 今週のTop（ランキングの上位3件を見せる）
export function WeeklyTopPreview({ articles, next }: { articles: Article[]; next: string }) {
  if (articles.length === 0) return null;
  return (
    <section id="weekly" className="block home-section reveal">
      <div className="section-heading">
        <h2>
          <span className="sh-en">WEEKLY TOP</span>
          <span className="sh-ja">今週のTop</span>
        </h2>
        <span className="next-update">次回は{shortDate(next)}更新</span>
      </div>
      <p className="section-lead">
        毎週月曜更新。1週間分から「これだけ見ればOK」を選びました。忙しい方はここだけでも。
      </p>
      <ul className="weekly-cards">
        {articles.map((a) => {
          // 文字入りの自動生成アイキャッチは背景にしない（文字が重なって読めなくなるため）
          const photo = a.image && !a.image.startsWith("/eyecatch/") ? a.image : undefined;
          return (
            <li key={a.slug}>
              <Link
                href={`/articles/${a.slug}`}
                className={`weekly-card${photo ? " weekly-card-photo" : ""}`}
                style={photo ? { backgroundImage: `url("${photo}")` } : undefined}
              >
                <span className="weekly-count">
                  TOP<strong>{a.ranking.length}</strong>
                </span>
                <span className="weekly-title">{a.title}</span>
                <span className="weekly-mini">
                  {a.ranking.slice(0, 3).map((r, i) => (
                    <span key={r.url} className="weekly-mini-item" style={{ "--i": i } as React.CSSProperties}>
                      <span className="weekly-mini-no">{i + 1}</span>
                      {r.title}
                    </span>
                  ))}
                </span>
                <span className="weekly-date">{formatDate(a.date)} 更新</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// ④ はじめての方へ
export function GuideBanner() {
  const steps = [
    {
      no: 1,
      title: "毎朝：今日の記事を読む",
      text: "ニュース2本と、曜日ごとのおすすめ1本。1本3分です。",
    },
    {
      no: 2,
      title: "月曜：今週のTopをチェック",
      text: "1週間分の大事な話と、見るべき動画をまとめています。",
    },
    {
      no: 3,
      title: "分からなければ：公式LINEで質問",
      text: "「うちの仕事だとどう使う？」も気軽にどうぞ。",
    },
  ];
  return (
    <section className="block guide-banner reveal">
      <div className="guide-banner-head">
        <p className="guide-banner-en">HOW TO USE</p>
        <h2 className="guide-banner-title">はじめての方へ｜このサイトの使い方は3つだけ</h2>
      </div>
      <ol className="guide-steps">
        {steps.map((s) => (
          <li key={s.no} className="guide-step">
            <span className="guide-step-no">{s.no}</span>
            <span className="guide-step-body">
              <strong>{s.title}</strong>
              <span>{s.text}</span>
            </span>
          </li>
        ))}
      </ol>
      <Link href="/guide" className="btn-ghost guide-banner-btn">
        サイトの見方をくわしく見る <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

const PERSONA_ICONS: Record<string, React.ReactNode> = {
  // ネクタイ
  executive: <path d="M12 3l3 2-2 3 3 9-4 4-4-4 3-9-2-3z" />,
  // 書類
  backoffice: <path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6" />,
  // グラフ
  sales: <path d="M4 20h16M7 16v-4M12 16V8M17 16V5" />,
  // 本
  skillup: <path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1zM12 6v14" />,
};

function PersonaIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" className="persona-icon" aria-hidden="true">
      {PERSONA_ICONS[name]}
    </svg>
  );
}

// ⑤ あなたの立場から探す
export function PersonaPicker({ articles }: { articles: Article[] }) {
  const cards = [
    ...PERSONAS.map((p) => {
      const list = articles.filter((a) => a.audience.includes(p.name));
      return {
        key: p.slug,
        name: p.name,
        lead: p.lead,
        href: `/for/${p.slug}`,
        count: list.length,
        latest: list[0],
      };
    }),
    (() => {
      const list = articles.filter((a) => a.skillup);
      return {
        key: "skillup",
        name: SKILLUP.label,
        lead: "英語・調べもの・学び直しに毎日使う",
        href: "/c/video#skillup",
        count: list.length,
        latest: list[0],
      };
    })(),
  ];
  return (
    <section className="block home-section reveal">
      <SectionHeading en="FOR YOU" ja="あなたの立場から探す" />
      <p className="section-lead">お仕事に近いものを選ぶと、あなた向けの記事と動画がまとめて見られます。</p>
      <ul className="persona-grid">
        {cards.map((c) => (
          <li key={c.key}>
            {c.count > 0 ? (
              <Link href={c.href} className={`persona-card persona-card-${c.key}`}>
                <PersonaIcon name={c.key} />
                <span className="persona-name">{c.name}</span>
                <span className="persona-lead">{c.lead}</span>
                <span className="persona-count">{c.count}本の記事 →</span>
                {c.latest && <span className="persona-latest">最新：{c.latest.title}</span>}
              </Link>
            ) : (
              <div className={`persona-card persona-card-${c.key} is-empty`}>
                <PersonaIcon name={c.key} />
                <span className="persona-name">{c.name}</span>
                <span className="persona-lead">{c.lead}</span>
                <span className="persona-count">準備中（毎週月曜に追加します）</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

// ⑥ やりたい仕事から探す
export function TaskGrid({ articles }: { articles: Article[] }) {
  return (
    <section id="tasks" className="block home-section reveal">
      <SectionHeading en="BY TASK" ja="やりたい仕事から探す" />
      <p className="section-lead">10の業務ごとに、使い方・動画・プロンプト・ニュースをまとめています。</p>
      <ul className="task-grid">
        {TASK_LIST.map((t, i) => {
          const count = articles.filter((a) => isForTask(a, t)).length;
          return (
            <li key={t.slug}>
              {count > 0 ? (
                <Link href={`/tasks/${t.slug}`} className="task-tile">
                  <span className="task-no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="task-name">{t.name}</span>
                  <span className="task-count">{count}本</span>
                </Link>
              ) : (
                // 記事がまだ無い業務は押せない表示にする（記事が入れば自動でリンクになる）
                <div className="task-tile is-empty">
                  <span className="task-no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="task-name">{t.name}</span>
                  <span className="task-count">準備中</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const RAIL_KEYS: CategoryKey[] = ["news", "video", "howto", "prompt"];

// ⑦ カテゴリ別の新着（上で出した記事は除く。スマホは横スクロール）
export function CategoryRails({ articles, exclude }: { articles: Article[]; exclude: Set<string> }) {
  return (
    <>
      {RAIL_KEYS.map((key) => {
        const list = articles.filter((a) => a.category === key && !exclude.has(a.slug)).slice(0, 4);
        if (list.length === 0) return null;
        const label = CATEGORIES[key].label;
        return (
          <section key={key} className="block home-section reveal">
            <SectionHeading en={CATEGORIES[key].en} ja={label} href={`/c/${key}`} more={`${label}の一覧へ`} />
            <ul className="cards rail">
              {list.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
              <li className="rail-more">
                <Link href={`/c/${key}`}>
                  {label}を
                  <br />
                  もっと見る <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </section>
        );
      })}
    </>
  );
}

// ⑪ もっと探す（バックナンバー・キーワード）
export function MoreToExplore({ months, tags }: { months: string[]; tags: { tag: string; count: number }[] }) {
  const tagLink = (t: { tag: string; count: number }) => (
    <Link key={t.tag} href={`/tags/${encodeURIComponent(t.tag)}`} className="tag">
      #{t.tag}
      <span className="tag-count">{t.count}</span>
    </Link>
  );
  return (
    <section className="block home-section reveal">
      <SectionHeading en="EXPLORE" ja="もっと探す" />
      <div className="explore">
        <div className="explore-col">
          <h3 className="explore-title">バックナンバー（月ごと）</h3>
          <ul className="explore-months">
            {months.slice(0, 3).map((m) => (
              <li key={m}>
                <Link href={`/archive/${m}`}>
                  {formatMonth(m)}の記事 <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/archive" className="more">
            すべての月を見る <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="explore-col">
          <h3 className="explore-title">よく出てくるキーワード</h3>
          <div className="tag-list">{tags.slice(0, 12).map(tagLink)}</div>
          {tags.length > 12 && (
            <details className="more-tags">
              <summary>すべてのキーワード（{tags.length}個）</summary>
              <div className="tag-list">{tags.slice(12).map(tagLink)}</div>
            </details>
          )}
        </div>
      </div>
    </section>
  );
}
