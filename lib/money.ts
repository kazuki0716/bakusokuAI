import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// YourLife「お金の秘密辞典」— 公式LINEで配信している会員向けのお金のお得情報。
// AIニュースとは別枠の会員特典として、content/money-secrets.yaml で管理する。

export type MoneySecret = {
  no: number;
  title: string;
  image: string;
  url?: string; // イラスト解説（PDF・スライド）
  label?: string; // リンクの見出し（例：イラスト解説）
  badge?: string; // 例：2026年クリックランキング1位
  points: string[];
};

export const MONEY_NAME = "お金の秘密辞典";

export function getMoneySecrets(): MoneySecret[] {
  const file = path.join(process.cwd(), "content", "money-secrets.yaml");
  if (!fs.existsSync(file)) return [];
  // gray-matter に同梱の YAML パーサーを使う（型定義に engines が無いのでキャストする）
  const { yaml } = (matter as unknown as { engines: { yaml: { parse(src: string): unknown } } }).engines;
  const data = yaml.parse(fs.readFileSync(file, "utf8")) as MoneySecret[] | null;
  return (data ?? []).map((m) => ({ ...m, points: m.points ?? [] }));
}
