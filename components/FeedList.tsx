import type { FeedItem } from "@/lib/feeds";
import { SafeImage } from "./SafeImage";

function timeLabel(iso?: string): string {
  if (!iso) return "";
  const diffH = Math.floor((Date.now() - Date.parse(iso)) / 3_600_000);
  if (diffH < 1) return "たった今";
  if (diffH < 24) return `${diffH}時間前`;
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export function FeedList({ items }: { items: FeedItem[] }) {
  return (
    <ul className="feed">
      {items.map((item) => {
        const empty = (
          <span className="feed-thumb-empty" aria-hidden="true">
            {item.source}
          </span>
        );
        return (
          <li key={item.url}>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="feed-item">
              <span className="feed-thumb">{item.image ? <SafeImage src={item.image} fallback={empty} /> : empty}</span>
              <span className="feed-body">
                <span className="feed-title">{item.title}</span>
                <span className="feed-meta">
                  {item.source}
                  {item.date && <time>{timeLabel(item.date)}</time>}
                  <span aria-hidden="true">↗</span>
                </span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
