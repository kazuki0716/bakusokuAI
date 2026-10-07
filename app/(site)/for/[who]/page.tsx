import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles } from "@/lib/articles";
import { PERSONAS } from "@/lib/categories";
import { GroupedList } from "@/components/GroupedList";

type Props = { params: Promise<{ who: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PERSONAS.map((p) => ({ who: p.slug }));
}

function findPersona(slug: string) {
  return PERSONAS.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = findPersona((await params).who);
  return { title: p ? `${p.name}向け` : "立場から探す" };
}

// 立場（ペルソナ）別の記事一覧
export default async function PersonaPage({ params }: Props) {
  const persona = findPersona((await params).who);
  if (!persona) notFound();
  const list = (await getArticles()).filter((a) => a.audience.includes(persona.name));

  return (
    <section>
      <header className="page-head">
        <p className="page-en">FOR YOU</p>
        <h1 className="page-title">{persona.name}の方へ</h1>
        <p className="page-desc">
          {persona.lead}。{persona.name}向けのおすすめ動画は毎週{persona.video}に届きます。
        </p>
        <nav className="persona-switch" aria-label="ほかの立場">
          {PERSONAS.map((p) => (
            <Link key={p.slug} href={`/for/${p.slug}`} className={p.slug === persona.slug ? "is-current" : undefined} aria-current={p.slug === persona.slug ? "page" : undefined}>
              {p.name}
            </Link>
          ))}
          <Link href="/c/video#skillup">AIで自分磨き</Link>
        </nav>
      </header>
      {list.length === 0 ? (
        <p className="empty">まだ記事がありません。</p>
      ) : (
        <GroupedList articles={list} order={["video", "weekly", "news", "howto", "prompt"]} />
      )}
      <p className="archive-link">
        <Link href="/archive">すべての記事はバックナンバーへ →</Link>
      </p>
    </section>
  );
}
