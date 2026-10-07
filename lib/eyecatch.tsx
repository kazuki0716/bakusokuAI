import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import type { Article } from "./articles";
import { formatDate } from "./articles";
import { CATEGORIES } from "./categories";

// 記事タイトル入りのオリジナル・アイキャッチ画像（1200×630）を生成する。
// 元記事の画像やYouTubeのサムネが無い記事に使う。自前で作る画像なので権利の心配がない。

const WIDTH = 1200;
const HEIGHT = 630;

const COLORS: Record<Article["category"], [string, string]> = {
  weekly: ["#e8382d", "#ff7a3d"],
  news: ["#2f6bff", "#6f9bff"],
  video: ["#f0487c", "#ff8fb1"],
  howto: ["#10a37a", "#4fd1a5"],
  prompt: ["#f5900c", "#ffc04d"],
};

let logoDataUri: string | undefined;
function logo(): string {
  logoDataUri ??= `data:image/png;base64,${fs.readFileSync(path.join(process.cwd(), "public/brand/logo.png")).toString("base64")}`;
  return logoDataUri;
}

// Google Fonts から、画像に使う文字だけを含む日本語フォント（TTF）を取得する
async function loadFont(text: string, weight: 700 | 900): Promise<ArrayBuffer | undefined> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@${weight}&text=${encodeURIComponent(text)}`,
      // 古いブラウザとして問い合わせると、ImageResponse が読める TTF 形式が返ってくる
      { headers: { "user-agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.30" }, signal: AbortSignal.timeout(8000), cache: "force-cache" },
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return undefined;
    return await fetch(url, { signal: AbortSignal.timeout(8000), cache: "force-cache" }).then((r) => r.arrayBuffer());
  } catch {
    return undefined;
  }
}

function Stripes() {
  // 斜めのスピード線
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex" }}>
      {Array.from({ length: 22 }, (_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: -200,
            left: -300 + i * 80,
            width: 3,
            height: 1100,
            background: "rgba(255,255,255,0.16)",
            transform: "rotate(30deg)",
          }}
        />
      ))}
    </div>
  );
}

export async function renderEyecatch(article: Article): Promise<ImageResponse> {
  const [c1, c2] = COLORS[article.category];
  const label = article.thumbLabel ?? CATEGORIES[article.category].label;
  const en = CATEGORIES[article.category].en;
  const date = formatDate(article.date);
  const title = article.title.length > 64 ? `${article.title.slice(0, 63)}…` : article.title;

  const text = `${label}${title}${en}${date}${CATEGORIES[article.category].label}NEWS爆速AI`;
  const [bold, black] = await Promise.all([loadFont(text, 700), loadFont(text, 900)]);
  const fonts = [
    ...(bold ? [{ name: "Zen", data: bold, weight: 700 as const, style: "normal" as const }] : []),
    ...(black ? [{ name: "Zen", data: black, weight: 900 as const, style: "normal" as const }] : []),
  ];

  const labelSize = label.length <= 8 ? 104 : label.length <= 12 ? 86 : label.length <= 16 ? 70 : 58;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "Zen",
          color: "#fff",
          background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
          overflow: "hidden",
        }}
      >
        <Stripes />

        {/* 背景の大きな英字 */}
        <div
          style={{
            position: "absolute",
            right: -20,
            top: -40,
            fontSize: 230,
            fontWeight: 900,
            color: "rgba(255,255,255,0.16)",
            transform: "skewX(-12deg)",
            letterSpacing: -6,
          }}
        >
          {en}
        </div>

        <div style={{ display: "flex", flexDirection: "column", padding: "64px 72px", width: "100%", position: "relative" }}>
          {/* カテゴリと日付 */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                background: "#fff",
                color: c1,
                fontSize: 30,
                fontWeight: 900,
                padding: "6px 24px",
                borderRadius: 999,
              }}
            >
              {CATEGORIES[article.category].label}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, opacity: 0.9 }}>{date}</div>
          </div>

          {/* キャッチコピー（大） */}
          <div style={{ display: "flex", flexDirection: "column", marginTop: 44 }}>
            <div style={{ width: 90, height: 10, background: "#ffd23f", transform: "skewX(-30deg)", marginBottom: 22 }} />
            <div
              style={{
                fontSize: labelSize,
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: 2,
                textShadow: "0 4px 24px rgba(0,0,0,0.25)",
                maxWidth: 1000,
              }}
            >
              {label}
            </div>
          </div>

          {/* 記事タイトル（小） */}
          <div
            style={{
              display: "flex",
              marginTop: "auto",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 40,
            }}
          >
            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                lineHeight: 1.45,
                maxWidth: 820,
                background: "rgba(0,0,0,0.22)",
                padding: "14px 22px",
                borderRadius: 14,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#fff",
                borderRadius: 22,
                padding: "12px 18px 8px",
                flexShrink: 0,
              }}
            >
              <img src={logo()} width={150} height={100} alt="" />
              <div style={{ fontSize: 18, fontWeight: 900, color: "#e8382d", letterSpacing: 6 }}>NEWS</div>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT, fonts },
  );
}
