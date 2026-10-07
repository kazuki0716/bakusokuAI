import type { Source } from "@/lib/articles";
import { SafeImage } from "./SafeImage";

// NewsPicks風の「元記事カード」。本文は転載せず、元記事へ誘導する
export function SourceCard({ source, main = false }: { source: Source; main?: boolean }) {
  const large = main && Boolean(source.image);
  const empty = <span className="src-thumb-empty">{source.media}</span>;
  return (
    <a href={source.url} target="_blank" rel="noopener noreferrer" className={`src-card${large ? " src-card-lg" : ""}`}>
      <span className="src-thumb">{source.image ? <SafeImage src={source.image} fallback={empty} /> : empty}</span>
      <span className="src-body">
        <span className="src-label">{main ? "元記事" : "出典"}</span>
        <span className="src-title">{source.title}</span>
        <span className="src-media">
          {source.media}
          <span aria-hidden="true"> ↗</span>
        </span>
      </span>
    </a>
  );
}
