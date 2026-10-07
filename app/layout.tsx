import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "爆速AI NEWS", template: "%s | 爆速AI NEWS" },
  description: "爆速AI会員向け：仕事に効くAIニュース・動画・使い方を毎日お届け",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1a56db",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
