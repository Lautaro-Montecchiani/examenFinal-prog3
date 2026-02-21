import { Product } from "../api/products";

export function ProductList({ items, onSelect }: { items: Product[]; onSelect: (id: number) => void }) {
  if (!items.length) return <p>Sin productos</p>;
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((p) => (
        <li key={p.id_key} style={{ padding: "0.4rem 0", borderBottom: "1px solid #ddd" }}>
          <button onClick={() => onSelect(p.id_key)} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <strong>{p.name}</strong> — ${p.price} — stock {p.stock}
          </button>
        </li>
      ))}
    </ul>
  );
}
