import Link from "next/link";
import { SCHEDULE, type Today } from "@/lib/schedule";
import { CountUp } from "./CountUp";

type Props = {
  today: Today;
  isFallback: boolean; // 今日の記事がまだ無く、直近の日の記事を出しているとき
  shownCount: number;
  weekCount: number;
  total: number;
};

const WEEKDAY = "日月火水木金土";

// ① 今日の爆速AI：開いた瞬間に「今日は何本・どこから読むか」が分かるヒーロー
export function HomeHero({ today, isFallback, shownCount, weekCount, total }: Props) {
  const isMonday = today.wd === 1;
  const lead = isFallback ? (
    <>
      今日の記事は朝7時ごろ届きます。
      <br />
      まずは最新の<strong>{shownCount}本</strong>をどうぞ。
    </>
  ) : isMonday ? (
    <>
      月曜は<strong>「今週のTop」</strong>の日。
      <br />
      まずはランキングからどうぞ。
    </>
  ) : (
    <>
      今日の更新は<strong>{shownCount}本</strong>。
      <br />
      通勤中の3分で読めます。
    </>
  );

  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <div className="hero-main hero-enter">
        <p className="hero-en" style={{ "--i": 0 } as React.CSSProperties}>
          TODAY&apos;S <span>BAKUSOKU</span> AI
        </p>
        <p className="hero-date" style={{ "--i": 1 } as React.CSSProperties}>
          {today.m}月{today.d}日<span>（{WEEKDAY[today.wd]}）</span>
        </p>
        <h1 id="hero-title" className="hero-lead" style={{ "--i": 2 } as React.CSSProperties}>
          {lead}
        </h1>
        <dl className="stats" style={{ "--i": 3 } as React.CSSProperties}>
          <div className="stat">
            <dt>{isFallback ? "最新の更新" : "今日の更新"}</dt>
            <dd>
              <CountUp value={shownCount} />
              <span className="stat-unit">本</span>
            </dd>
          </div>
          <div className="stat">
            <dt>今週</dt>
            <dd>
              <CountUp value={weekCount} />
              <span className="stat-unit">本</span>
            </dd>
          </div>
          <div className="stat">
            <dt>これまで</dt>
            <dd>
              <CountUp value={total} />
              <span className="stat-unit">本</span>
            </dd>
          </div>
        </dl>
        <div className="hero-actions" style={{ "--i": 4 } as React.CSSProperties}>
          <a href={isMonday && !isFallback ? "#weekly" : "#today"} className="btn-primary">
            {isMonday && !isFallback ? "今週のTopを見る" : isFallback ? "最新の記事を読む" : "今日の記事を読む"}{" "}
            <span aria-hidden="true">↓</span>
          </a>
          <Link href="/guide" className="btn-ghost">
            はじめての方へ <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <ScheduleStrip today={today} />
    </section>
  );
}

// 曜日ごとの更新スケジュール（今日が光る）
function ScheduleStrip({ today }: { today: Today }) {
  // 月曜はじまりで並べる
  const days = [...SCHEDULE].sort((a, b) => ((a.wd + 6) % 7) - ((b.wd + 6) % 7));
  const todayIndex = (today.wd + 6) % 7;
  return (
    <div className="sched">
      <p className="sched-title">
        <strong>毎朝7時に更新</strong>
        <span>毎日ニュース2本 ＋ 曜日ごとの1本</span>
      </p>
      <ol className="sched-list">
        {days.map((s, i) => {
          const state = i === todayIndex ? "is-today" : i === (todayIndex + 1) % 7 ? "is-next" : i < todayIndex ? "is-past" : "";
          return (
            // スマホでは今日を先頭にして横に並べる
            <li key={s.wd} style={{ "--o": (i - todayIndex + 7) % 7 } as React.CSSProperties}>
              <Link href={s.href} className={`sched-chip ${state}`} aria-current={state === "is-today" ? "date" : undefined}>
                <span className="sched-day">{s.short}</span>
                <span className="sched-extra">{s.extra}</span>
                {state === "is-today" && (
                  <span className="sched-tag">
                    <span className="sched-dot" aria-hidden="true" />
                    今日
                  </span>
                )}
                {state === "is-next" && <span className="sched-tag sched-tag-next">明日</span>}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
