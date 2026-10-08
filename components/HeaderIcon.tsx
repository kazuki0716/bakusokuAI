// ヘッダーで使う線のアイコン（16px・線の太さ1.8・文字色）。必ず文字ラベルと一緒に使う
const PATHS = {
  home: "M2.5 7.2 8 2.5l5.5 4.7M4 6v7.5h3V10h2v3.5h3V6",
  guide: "M8 14.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM6.2 6.2a1.9 1.9 0 1 1 2.6 1.75c-.5.2-.8.6-.8 1.1v.4M8 11.6v.1",
  gift: "M2.5 6h11v2.5h-11zM3.5 8.5h9v5h-9zM8 6v7.5M8 6C6.8 3.5 4.5 3.3 4.5 4.6 4.5 5.6 6.5 6 8 6Zm0 0c1.2-2.5 3.5-2.7 3.5-1.4 0 1-2 1.4-3.5 1.4Z",
  chat: "M2.5 7.3c0-2.8 2.5-4.8 5.5-4.8s5.5 2 5.5 4.8-2.5 4.8-5.5 4.8c-.6 0-1.2-.1-1.7-.2L3.5 13.5l.6-2.6C3.1 10 2.5 8.7 2.5 7.3Z",
} as const;

export function HeaderIcon({ name }: { name: keyof typeof PATHS }) {
  return (
    <svg className="header-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path d={PATHS[name]} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
