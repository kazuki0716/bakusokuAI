import Link from "next/link";
import { getArticles, getTagCounts, monthKey } from "@/lib/articles";
import { getFeedItems } from "@/lib/feeds";
import { FeedList } from "@/components/FeedList";
import { LineBanner } from "@/components/LineBanner";
import { SectionHeading } from "@/components/ArticleParts";
import { nextMonday, todayJST } from "@/lib/schedule";
import { HomeHero } from "@/components/home/HomeHero";
import { latestWeeklyPair } from "@/components/WeeklyCards";
import {
  CategoryRails,
  GuideBanner,
  MoreToExplore,
  PersonaPicker,
  TaskGrid,
  TodayUpdates,
  WeeklyTopPreview,
} from "@/components/home/HomeSections";

// 外部ニュースフィードと「今日」の表示を1時間ごとに更新
export const revalidate = 3600;

export default async function HomePage() {
  const [all, feed] = await Promise.all([getArticles(), getFeedItems()]);
  const today = todayJST();
  // 日本時間でまだ来ていない日付の記事は出さない
  const articles = all.filter((a) => a.date <= today.ymd);
  if (articles.length === 0) {
    return <p className="empty">まだ記事がありません。</p>;
  }

  // 今日の記事（今週のTopは別枠）。まだ無ければ、いちばん新しい日の記事を出す
  const daily = articles.filter((a) => a.category !== "weekly");
  const todays = daily.filter((a) => a.date === today.ymd);
  const isFallback = todays.length === 0;
  const shownDate = isFallback ? (daily[0]?.date ?? today.ymd) : today.ymd;
  const todayList = (isFallback ? daily.filter((a) => a.date === shownDate) : todays).sort(
    (a, b) => Number(b.pickup) - Number(a.pickup),
  );

  // 今週のTop：AI情報（読む）→ YouTube動画（見る）の順に、それぞれ最新の1本
  const weekly = latestWeeklyPair(articles);
  const shown = new Set([...todayList, ...weekly].map((a) => a.slug));
  const months = [...new Set(articles.map((a) => monthKey(a.date)))];

  return (
    <>
      <HomeHero today={today} isFallback={isFallback} shownCount={todayList.length} />

      <TodayUpdates list={todayList} isFallback={isFallback} date={shownDate} />
      <WeeklyTopPreview articles={weekly} next={nextMonday(today)} />
      <PersonaPicker articles={articles} />
      <TaskGrid articles={articles} />
      <CategoryRails articles={articles} exclude={shown} />

      {feed.length > 0 && (
        <section className="block home-section reveal">
          <SectionHeading en="AI NEWS FEED" ja="ほかのサイトのAIニュース（外部サイト・自動）" />
          <FeedList items={feed.slice(0, 6)} />
          {feed.length > 6 && (
            <details className="feed-more">
              <summary>あと{feed.length - 6}件を見る</summary>
              <FeedList items={feed.slice(6)} />
            </details>
          )}
        </section>
      )}

      <LineBanner
        title="AIのこと、公式LINEで気軽に質問できます"
        sub="「この記事、うちの業務だとどう使う？」「ChatGPTとGemini、どっちがいい？」など、なんでもどうぞ。"
      />

      {/* 初めての人向けの案内は、毎日来る人の邪魔にならないよう下の方に（ヒーローにも入口あり） */}
      <GuideBanner />
      <MoreToExplore months={months} tags={getTagCounts()} />
    </>
  );
}
