import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles } from "@/lib/articles";
import { TASK_LIST } from "@/lib/categories";
import { GroupedList } from "@/components/GroupedList";

type Props = { params: Promise<{ task: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return TASK_LIST.map((t) => ({ task: t.slug }));
}

function findTask(slug: string) {
  return TASK_LIST.find((t) => t.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = findTask((await params).task);
  return { title: t ? `${t.name}をAIで` : "仕事から探す" };
}

// 業務別の記事一覧
export default async function TaskPage({ params }: Props) {
  const task = findTask((await params).task);
  if (!task) notFound();
  const list = (await getArticles()).filter((a) => a.task === task.name);

  return (
    <section>
      <header className="page-head">
        <p className="page-en">BY TASK</p>
        <h1 className="page-title">{task.name}をAIで</h1>
        <p className="page-desc">「{task.name}」に使える使い方・動画・プロンプト・ニュースをまとめています。</p>
        <nav className="persona-switch task-switch" aria-label="ほかの業務">
          {TASK_LIST.map((t) => (
            <Link key={t.slug} href={`/tasks/${t.slug}`} className={t.slug === task.slug ? "is-current" : undefined} aria-current={t.slug === task.slug ? "page" : undefined}>
              {t.name}
            </Link>
          ))}
        </nav>
      </header>
      {list.length === 0 ? (
        <div className="empty">
          <p>この業務の記事は準備中です。使い方・特集（毎週水・日曜）で順番に取り上げていきます。</p>
          <p>
            <Link href="/c/howto" className="more">
              使い方・特集を見る <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      ) : (
        <GroupedList articles={list} order={["howto", "video", "prompt", "news", "weekly"]} />
      )}
    </section>
  );
}
