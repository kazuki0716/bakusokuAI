import type { Metadata, Viewport } from "next";
import { Outfit, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-ja",
});

const outfit = Outfit({
  weight: ["500", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-en",
});

export const metadata: Metadata = {
  title: { default: "爆速AI NEWS", template: "%s | 爆速AI NEWS" },
  description: "爆速AI会員向け：仕事に効くAIニュース・動画・使い方を毎日お届け",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#e8382d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${zenKaku.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
