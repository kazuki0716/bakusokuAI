import type { Metadata } from "next";
import { getMoneySecrets, MONEY_NAME } from "@/lib/money";
import { MoneySecretList } from "@/components/MoneySecrets";

export const metadata: Metadata = { title: MONEY_NAME };

export default function MoneyPage() {
  const items = getMoneySecrets();
  return (
    <section>
      <header className="money-head">
        <p className="money-head-en">MEMBERS BENEFIT</p>
        <h1 className="money-head-title">YourLife {MONEY_NAME}</h1>
        <p className="money-head-desc">
          爆速AI会員だけの特典。YourLife公式LINEで配信している「お金のお得情報」を、いつでも見返せるようにまとめています。
        </p>
      </header>
      {items.length === 0 ? <p className="empty">まだ掲載がありません。</p> : <MoneySecretList items={items} detailed />}
    </section>
  );
}
