import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import type { Article } from "./articles";
import { CATEGORIES } from "./categories";

// 記事タイトル入りのオリジナル・アイキャッチ画像（1200×630。一覧用の小さい版は scale 0.5 で 600×315）を生成する。
// 元記事の画像やYouTubeのサムネが無い記事に使う。自前で作る画像なので権利の心配がない。

const WIDTH = 1200;
const HEIGHT = 630;

// カテゴリごとの光の色（暗い地に光らせる装飾なので、文字色のコントラストには使わない）
const GLOW: Record<Article["category"], [string, string]> = {
  weekly: ["255,210,63", "255,90,78"],
  news: ["61,123,255", "34,198,255"],
  video: ["255,79,139", "162,89,255"],
  howto: ["20,196,141", "61,123,255"],
  prompt: ["255,154,31", "255,79,139"],
};

// 地の色（ほぼ黒に、カテゴリの色をほんの少し混ぜる）
const BASE: Record<Article["category"], string> = {
  weekly: "#14130f",
  news: "#0c1020",
  video: "#170c16",
  howto: "#0b1513",
  prompt: "#17110b",
};

// カテゴリのラベルの地（白文字が読める濃さ。globals.css の --cat-*-solid と同じ）
const SOLID: Record<Article["category"], string> = {
  weekly: "#16171b",
  news: "#2456d0",
  video: "#bc2459",
  howto: "#0b7050",
  prompt: "#9a4c00",
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

// 細い方眼（テック感を出す装飾）
function Grid({ px }: { px: (n: number) => number }) {
  const step = 60;
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex" }}>
      {Array.from({ length: Math.ceil(WIDTH / step) }, (_, i) => (
        <div
          key={`v${i}`}
          style={{ position: "absolute", top: 0, left: px(i * step), width: 1, height: px(HEIGHT), background: "rgba(255,255,255,0.06)" }}
        />
      ))}
      {Array.from({ length: Math.ceil(HEIGHT / step) }, (_, i) => (
        <div
          key={`h${i}`}
          style={{ position: "absolute", left: 0, top: px(i * step), height: 1, width: px(WIDTH), background: "rgba(255,255,255,0.06)" }}
        />
      ))}
    </div>
  );
}

// やわらかい光：中心ほど濃くなるよう、半透明の円を小さくしながら重ねる
function Glow({ px, rgb, cx, cy, r, alpha }: { px: (n: number) => number; rgb: string; cx: number; cy: number; r: number; alpha: number }) {
  const steps = 28;
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex" }}>
      {Array.from({ length: steps }, (_, i) => {
        const d = (r * 2 * (steps - i)) / steps;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px(cx - d / 2),
              top: px(cy - d / 2),
              width: px(d),
              height: px(d),
              borderRadius: 9999,
              background: `rgba(${rgb},${alpha})`,
            }}
          />
        );
      })}
    </div>
  );
}

// 右側の同心円（ブランドの「スピード」と「広がり」を表す装飾）
function Rings({ px, rgb }: { px: (n: number) => number; rgb: string }) {
  return (
    <div style={{ position: "absolute", right: px(-170), top: px(-90), display: "flex" }}>
      {[620, 470, 320].map((d, i) => (
        <div
          key={d}
          style={{
            position: "absolute",
            right: px((620 - d) / 2),
            top: px((620 - d) / 2),
            width: px(d),
            height: px(d),
            borderRadius: 9999,
            border: `${Math.max(1, px(i === 2 ? 3 : 2))}px solid rgba(${rgb},${0.55 - i * 0.12})`,
          }}
        />
      ))}
    </div>
  );
}

export async function renderEyecatch(article: Article, scale = 1): Promise<ImageResponse> {
  const px = (n: number) => Math.round(n * scale);
  const [g1, g2] = GLOW[article.category];
  const solid = SOLID[article.category];
  const label = article.thumbLabel ?? CATEGORIES[article.category].label;
  const catLabel = CATEGORIES[article.category].label;

  const text = `${label}${catLabel}BAKUSOKUAINEWS`;
  const [bold, black] = await Promise.all([loadFont(text, 700), loadFont(text, 900)]);
  const fonts = [
    ...(bold ? [{ name: "Zen", data: bold, weight: 700 as const, style: "normal" as const }] : []),
    ...(black ? [{ name: "Zen", data: black, weight: 900 as const, style: "normal" as const }] : []),
  ];

  // 見出しはなるべく1行で大きく。全角を1、半角を0.56文字分として幅を見積もり、入りきる最大の大きさにする（最小72px、それより長ければ2行）
  const units = [...label].reduce((n, ch) => n + (/[\x20-\x7e]/.test(ch) ? 0.56 : 1), 0);
  const labelSize = px(Math.max(72, Math.min(132, Math.floor(1000 / (units * 1.06)))));

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
          background: BASE[article.category],
          overflow: "hidden",
        }}
      >
        {/* カテゴリ色の光（右上と左下）。グラデーションの代わりに、薄い円を重ねてぼかしを作る */}
        <Glow px={px} rgb={g1} cx={1020} cy={150} r={540} alpha={0.026} />
        <Glow px={px} rgb={g2} cx={-40} cy={680} r={480} alpha={0.018} />
        <Grid px={px} />
        <Rings px={px} rgb={g1} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: `${px(64)}px ${px(76)}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {/* カテゴリ */}
          <div style={{ display: "flex", alignItems: "center", gap: px(16) }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: px(12),
                background: solid,
                border: `${Math.max(1, px(2))}px solid rgba(${g1},0.9)`,
                color: "#fff",
                fontSize: px(30),
                fontWeight: 900,
                padding: `${px(8)}px ${px(26)}px`,
                borderRadius: 999,
              }}
            >
              <div style={{ width: px(12), height: px(12), borderRadius: 999, background: `rgb(${g1})` }} />
              {catLabel}
            </div>
          </div>

          {/* 見出し（大） */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: labelSize,
                fontWeight: 900,
                lineHeight: 1.12,
                letterSpacing: px(1),
                maxWidth: px(1048),
              }}
            >
              {label}
            </div>
            <div style={{ display: "flex", marginTop: px(26), gap: px(10) }}>
              <div style={{ width: px(120), height: px(10), borderRadius: 999, background: "#ffd23f" }} />
              <div style={{ width: px(28), height: px(10), borderRadius: 999, background: `rgb(${g1})` }} />
            </div>
          </div>

          {/* サイト名 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: px(14),
              fontSize: px(24),
              fontWeight: 900,
              letterSpacing: px(6),
              color: "rgba(255,255,255,0.78)",
            }}
          >
            <img src={logo()} width={px(66)} height={px(44)} alt="" />
            BAKUSOKU AI NEWS
          </div>
        </div>
      </div>
    ),
    { width: px(WIDTH), height: px(HEIGHT), fonts },
  );
}
