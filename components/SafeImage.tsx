"use client";

import { useState, type ReactNode } from "react";

// 外部画像が読み込めなかったら（リンク切れ・直リンク禁止など）fallback を表示する
export function SafeImage({ src, className, fallback }: { src: string; className?: string; fallback: ReactNode }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return (
    <img
      className={className}
      src={src}
      alt=""
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}
