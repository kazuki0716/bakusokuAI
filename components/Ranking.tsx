import type { RankingItem } from "@/lib/articles";

// サイト内の記事（/articles/...）は同じタブ、外部サイトは新しいタブで開く
function linkProps(url: string) {
  return url.startsWith("/") ? {} : { target: "_blank", rel: "noopener noreferrer" };
}

export function Ranking({ items }: { items: RankingItem[] }) {
  return (
    <ol className="ranking">
      {items.map((item, i) => (
        <li key={item.url} className={`rank-item${item.youtube ? " rank-video" : ""}`}>
          <span className={`rank-no rank-no-${i + 1}`}>{i + 1}</span>
          {item.youtube && (
            <a href={item.url} {...linkProps(item.url)} className="rank-thumb">
              <img src={`https://i.ytimg.com/vi/${item.youtube}/hqdefault.jpg`} alt="" loading="lazy" />
              <span className="rank-play" aria-hidden="true">▶</span>
            </a>
          )}
          <div className="rank-body">
            <a href={item.url} {...linkProps(item.url)} className="rank-title">
              {item.title}
            </a>
            {item.channel && <p className="rank-channel">{item.channel}</p>}
            <p className="rank-comment">{item.comment}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
