import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE } from "@/lib/auth";

export function POST(request: NextRequest) {
  // ログイン画面で「ログアウトしました」と表示する
  const response = NextResponse.redirect(new URL("/login?loggedout=1", request.url), 303);
  response.cookies.delete(AUTH_COOKIE);
  return response;
}
