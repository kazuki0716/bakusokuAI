import { LINE_URL } from "@/lib/links";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// 公式LINEへの案内（記事の最後・ホーム）
export function LineBanner({
  title = "この記事やAIについての質問は、公式LINEへ",
  sub = "「うちの業務だとどう使う？」など、気軽にメッセージを送ってください。",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <a href={LINE_URL} {...external} className="line-banner">
      <span className="line-banner-icon" aria-hidden="true">
        LINE
      </span>
      <span className="line-banner-body">
        <span className="line-banner-en">QUESTIONS?</span>
        <span className="line-banner-title">{title}</span>
        <span className="line-banner-sub">{sub}</span>
      </span>
      <span className="line-banner-go">
        公式LINEで質問する <span aria-hidden="true">↗</span>
      </span>
    </a>
  );
}
