import Link from "next/link";
import { getArticles, getTagCounts, monthKey } from "@/lib/articles";
import { getFeedItems } from "@/lib/feeds";
import { FeedList } from "@/components/FeedList";
import { LineBanner } from "@/components/LineBanner";
import { getMoneySecrets, MONEY_NAME } from "@/lib/money";
import { MoneySecretList } from "@/components/MoneySecrets";
import { SectionHeading } from "@/components/ArticleParts";
import { mondayOf, nextMonday, todayJST } from "@/lib/schedule";
import { HomeHero } from "@/components/home/HomeHero";
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

  const weekly = articles.filter((a) => a.category === "weekly").slice(0, 2);
  const weekCount = articles.filter((a) => a.date >= mondayOf(today)).length;
  const shown = new Set([...todayList, ...weekly].map((a) => a.slug));
  const months = [...new Set(articles.map((a) => monthKey(a.date)))];
  const money = getMoneySecrets().slice(0, 4);

  return (
    <>
      <HomeHero
        today={today}
        isFallback={isFallback}
        shownCount={todayList.length}
        weekCount={weekCount}
        total={articles.length}
      />

      <TodayUpdates list={todayList} isFallback={isFallback} date={shownDate} />
      <WeeklyTopPreview articles={weekly} next={nextMonday(today)} />
      <GuideBanner />
      <PersonaPicker articles={articles} />
      <TaskGrid articles={articles} />
      <CategoryRails articles={articles} exclude={shown} />

      {money.length > 0 && (
        <section className="block money-block reveal">
          <div className="money-block-head">
            <div>
              <p className="money-head-en">MEMBERS BENEFIT</p>
              <h2 className="money-block-title">YourLife {MONEY_NAME}</h2>
              <p className="money-block-desc">爆速AI会員だけの特典。公式LINEで届く「お金のお得情報」をまとめて見られます。</p>
            </div>
            <Link href="/money" className="more more-light">
              すべて見る <span aria-hidden="true">→</span>
            </Link>
          </div>
          <MoneySecretList items={money} />
        </section>
      )}

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

      <MoreToExplore months={months} tags={getTagCounts()} />
    </>
  );
}
