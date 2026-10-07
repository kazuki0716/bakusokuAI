"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// 外部画像が読み込めなかったら（リンク切れ・直リンク禁止など）fallback を表示する
export function SafeImage({ src, className, fallback }: { src: string; className?: string; fallback: ReactNode }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // 画面の準備（hydration）より先に読み込みに失敗していた場合も拾う
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (failed) return <>{fallback}</>;
  return (
    <img
      ref={ref}
      className={className}
      src={src}
      alt=""
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}
