// ヘッダーと下のメニューで使う線のアイコン（16pxの方眼・線の太さ1.8・文字色）。必ず文字ラベルと一緒に使う
const PATHS = {
  home: "M2.5 7.2 8 2.5l5.5 4.7M4 6v7.5h3V10h2v3.5h3V6",
  guide: "M8 14.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM6.2 6.2a1.9 1.9 0 1 1 2.6 1.75c-.5.2-.8.6-.8 1.1v.4M8 11.6v.1",
  gift: "M2.5 6h11v2.5h-11zM3.5 8.5h9v5h-9zM8 6v7.5M8 6C6.8 3.5 4.5 3.3 4.5 4.6 4.5 5.6 6.5 6 8 6Zm0 0c1.2-2.5 3.5-2.7 3.5-1.4 0 1-2 1.4-3.5 1.4Z",
  top: "M5 2.5h6v3.5a3 3 0 0 1-6 0V2.5ZM5 3.5H2.8c0 2 .9 3.2 2.4 3.4M11 3.5h2.2c0 2-.9 3.2-2.4 3.4M8 9v2.5M5.5 13.5h5M6.5 11.5h3v2h-3z",
  news: "M2.5 3h9v10.5h-7.5a1.5 1.5 0 0 1-1.5-1.5V3ZM11.5 6h2v6a1.5 1.5 0 0 1-3 0M4.8 5.5h4.4M4.8 8h4.4M4.8 10.5h2.6",
  video: "M2.5 3.5h11v9h-11zM6.7 6v4l3.3-2z",
  howto: "M8 4c-1.5-1-3.5-1.3-5.5-1v9.5c2-.3 4 0 5.5 1 1.5-1 3.5-1.3 5.5-1V3c-2-.3-4 0-5.5 1Zm0 0v9.5",
  chat: "M2.5 7.3c0-2.8 2.5-4.8 5.5-4.8s5.5 2 5.5 4.8-2.5 4.8-5.5 4.8c-.6 0-1.2-.1-1.7-.2L3.5 13.5l.6-2.6C3.1 10 2.5 8.7 2.5 7.3Z",
} as const;

export type IconName = keyof typeof PATHS;

export function HeaderIcon({ name, size = 16 }: { name: IconName; size?: number }) {
  return (
    <svg className="header-icon" viewBox="0 0 16 16" width={size} height={size} aria-hidden="true" focusable="false">
      <path d={PATHS[name]} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
