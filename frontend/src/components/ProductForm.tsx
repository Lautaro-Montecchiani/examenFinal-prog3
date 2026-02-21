import { FormEvent, useState } from "react";
import { createProduct } from "../api/products";

export function ProductForm({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState({ name: "", price: 0, stock: 0, category_id: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOk(null);
    try {
      await createProduct(form);
      setOk("Producto creado");
      onCreated();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: "0.5rem", maxWidth: 360 }}>
      <input placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input type="number" placeholder="Precio" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} required />
      <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: +e.target.value })} required />
      <input type="number" placeholder="Category ID" value={form.category_id} onChange={(e) => setForm({ ...form, category_id: +e.target.value })} required />
      <button type="submit" disabled={loading}>
        {loading ? "Guardando…" : "Crear"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {ok && <p style={{ color: "green" }}>{ok}</p>}
    </form>
  );
}
