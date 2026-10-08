import type { RankingItem } from "@/lib/articles";
import { SafeImage } from "./SafeImage";

// サイト内の記事（/articles/...）は同じタブ、外部サイトは新しいタブで開く
function linkProps(url: string) {
  return url.startsWith("/") ? {} : { target: "_blank", rel: "noopener noreferrer" };
}

export function Ranking({ items }: { items: RankingItem[] }) {
  return (
    <ol className="ranking">
      {items.map((item, i) => (
        <li key={item.url} className={`rank-item${item.image ? " rank-has-image" : ""}`}>
          <span className={`rank-no rank-no-${i + 1}`}>{i + 1}</span>
          {item.image && (
            // タイトルと同じリンクなので、読み上げとTab移動はタイトルの方だけにする
            <a href={item.url} {...linkProps(item.url)} className="rank-thumb" aria-hidden="true" tabIndex={-1}>
              <SafeImage src={item.image} fallback={<span className="rank-thumb-empty" />} />
              {item.youtube && (
                <span className="rank-play" aria-hidden="true">
                  ▶
                </span>
              )}
            </a>
          )}
          <div className="rank-body">
            <a href={item.url} {...linkProps(item.url)} className="rank-title">
              {item.title}
              {!item.url.startsWith("/") && (
                <>
                  {" "}
                  <span aria-hidden="true">↗</span>
                  <span className="visually-hidden">（新しいタブで開きます）</span>
                </>
              )}
            </a>
            {item.channel && <p className="rank-channel">{item.channel}</p>}
            <p className="rank-comment">{item.comment}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
