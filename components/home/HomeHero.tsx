import Link from "next/link";
import { SCHEDULE, type Today } from "@/lib/schedule";
import { CountUp } from "./CountUp";
import { SavedMeter } from "../SavedTime";

type Props = {
  today: Today;
  isFallback: boolean; // 今日の記事がまだ無く、直近の日の記事を出しているとき
  shownCount: number;
};

const WEEKDAY = "日月火水木金土";

// ① 今日の爆速AI：日付・今日の本数・今日と明日の更新内容だけを短く。すぐ下に今日の記事が続く
export function HomeHero({ today, isFallback, shownCount }: Props) {
  const todayPlan = SCHEDULE.find((s) => s.wd === today.wd)!;
  const tomorrowPlan = SCHEDULE.find((s) => s.wd === (today.wd + 1) % 7)!;
  const isMonday = today.wd === 1 && !isFallback;

  return (
    <section className="home-hero hero-enter" aria-labelledby="hero-title">
      <p className="hero-date" style={{ "--i": 0 } as React.CSSProperties}>
        {today.m}月{today.d}日<span>（{WEEKDAY[today.wd]}）</span>
      </p>
      <h1 id="hero-title" className="hero-lead" style={{ "--i": 1 } as React.CSSProperties}>
        {isFallback ? (
          <>
            今日の記事は朝7時ごろ届きます。まずは最新の
            <span className="hero-count">
              <CountUp value={shownCount} />本
            </span>
            をどうぞ。
          </>
        ) : (
          <>
            今日の更新は
            <span className="hero-count">
              <CountUp value={shownCount} />本
            </span>
            。{isMonday ? "月曜は「今週のTop」の日です。" : "通勤中の3分で読めます。"}
          </>
        )}
      </h1>
      <p className="hero-plan" style={{ "--i": 2 } as React.CSSProperties}>
        <span>
          <strong>今日</strong>ニュース2本＋{todayPlan.extra}
        </span>
        <span>
          <strong>明日</strong>ニュース2本＋{tomorrowPlan.extra}
        </span>
      </p>
      <div className="hero-saved" style={{ "--i": 3 } as React.CSSProperties}>
        <SavedMeter />
      </div>
      <div className="hero-actions" style={{ "--i": 4 } as React.CSSProperties}>
        <a href={isMonday ? "#weekly" : "#today"} className="btn-primary">
          {isMonday ? "今週のTopを見る" : isFallback ? "最新の記事を読む" : "今日の記事を読む"} <span aria-hidden="true">↓</span>
        </a>
        <Link href="/guide" className="hero-guide-link">
          はじめての方は「サイトの見方」へ <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
