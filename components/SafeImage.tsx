"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// 外部画像が読み込めなかったら（リンク切れ・直リンク禁止など）fallback を表示する
// eager：画面の最初に見える大きな画像は遅延読み込みしない（表示を速くするため）
export function SafeImage({
  src,
  className,
  fallback,
  eager = false,
}: {
  src: string;
  className?: string;
  fallback: ReactNode;
  eager?: boolean;
}) {
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
      loading={eager ? "eager" : "lazy"}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}
