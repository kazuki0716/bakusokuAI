import type { MoneySecret } from "@/lib/money";

function Card({ item, detailed }: { item: MoneySecret; detailed: boolean }) {
  const inner = (
    <>
      <span className="money-img">
        <img src={item.image} alt={item.title} loading="lazy" />
        <span className="money-no">No.{item.no}</span>
        {item.badge && <span className="money-badge">{item.badge}</span>}
      </span>
      <span className="money-body">
        <span className="money-title">{item.title}</span>
        {detailed && item.points.length > 0 && (
          <span className="money-points">
            {item.points.map((p) => (
              <span key={p} className="money-point">
                {p}
              </span>
            ))}
          </span>
        )}
        <span className="money-go">
          {item.url ? (
            <>
              {item.label ?? "イラスト解説"}を見る <span aria-hidden="true">↗</span>
            </>
          ) : (
            "公式LINEで配信中"
          )}
        </span>
      </span>
    </>
  );
  return (
    <li>
      {item.url ? (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="money-card">
          {inner}
        </a>
      ) : (
        <div className="money-card money-card-static">{inner}</div>
      )}
    </li>
  );
}

export function MoneySecretList({ items, detailed = false }: { items: MoneySecret[]; detailed?: boolean }) {
  return (
    <ul className={`money-list${detailed ? " money-list-detailed" : ""}`}>
      {items.map((item) => (
        <Card key={item.no} item={item} detailed={detailed} />
      ))}
    </ul>
  );
}
