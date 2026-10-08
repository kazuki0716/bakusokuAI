import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, expectedToken, tokenFor } from "@/lib/auth";

// ログイン後の戻り先。サイト内のページだけを許可する（外部サイトへのリダイレクトを防ぐ）
function safeNext(value: FormDataEntryValue | null, base: string): string {
  const next = typeof value === "string" ? value : "/";
  if (!next.startsWith("/")) return "/";
  try {
    // "/\\evil.example.com" や "//evil.example.com" のような書き方も、実際の行き先で判定する
    const origin = new URL(base).origin;
    const url = new URL(next, origin);
    return url.origin === origin ? url.pathname + url.search + url.hash : "/";
  } catch {
    return "/";
  }
}

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const next = safeNext(form.get("next"), request.url);
  const password = String(form.get("password") ?? "");
  const expected = expectedToken();

  if (!expected || tokenFor(password) !== expected) {
    const url = new URL("/login", request.url);
    url.searchParams.set("error", expected ? "1" : "unset");
    if (next !== "/") url.searchParams.set("next", next);
    return NextResponse.redirect(url, 303);
  }

  const response = NextResponse.redirect(new URL(next, request.url), 303);
  response.cookies.set(AUTH_COOKIE, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 90, // 90日
  });
  return response;
}
