import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, expectedToken } from "@/lib/auth";

// 会員限定：合言葉ログインをしていない人は /login へ
export function proxy(request: NextRequest) {
  const token = expectedToken();
  if (token && request.cookies.get(AUTH_COOKIE)?.value === token) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  const next = request.nextUrl.pathname + request.nextUrl.search;
  if (next !== "/") loginUrl.searchParams.set("next", next);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!login|api/login|_next/static|_next/image|favicon.ico|icon.svg|robots.txt).*)"],
};
