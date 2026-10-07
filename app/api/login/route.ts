import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, expectedToken, tokenFor } from "@/lib/auth";

function safeNext(value: FormDataEntryValue | null): string {
  const next = typeof value === "string" ? value : "/";
  // 外部サイトへのリダイレクトを防ぐ
  return next.startsWith("/") && !next.startsWith("//") ? next : "/";
}

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const next = safeNext(form.get("next"));
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
