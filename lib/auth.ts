import { createHash } from "node:crypto";

export const AUTH_COOKIE = "bk_member";

// 合言葉そのものではなく、ハッシュ値をCookieに保存する。
// 合言葉を変更するとハッシュが変わるため、全員が自動的にログアウトされる（退会者対策）。
export function tokenFor(password: string): string {
  return createHash("sha256").update(`bakusoku-ai:${password}`).digest("hex");
}

export function expectedToken(): string | null {
  const password = process.env.SITE_PASSWORD;
  return password ? tokenFor(password) : null;
}
