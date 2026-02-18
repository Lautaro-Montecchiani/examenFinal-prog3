import { useState } from "react";
import { useProducts } from "./hooks/useProducts";
import { ProductList } from "./components/ProductList";
import { ProductForm } from "./components/ProductForm";
import { getProduct } from "./api/products";

export default function App() {
  const { items, loading, error, setItems } = useProducts();
  const [selected, setSelected] = useState<any>(null);

  const select = async (id: number) => {
    const product = await getProduct(id);
    setSelected(product);
  };

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "1rem", fontFamily: "Segoe UI, sans" }}>
      <h1>E-commerce</h1>
      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <h2>Productos</h2>
          <ProductList items={items} onSelect={select} />
        </div>
        <div>
          <h2>Detalle</h2>
          {selected ? <pre>{JSON.stringify(selected, null, 2)}</pre> : <p>Selecciona un producto</p>}
        </div>
      </section>
      <section style={{ marginTop: "1.5rem" }}>
        <h2>Crear producto</h2>
        <ProductForm onCreated={() => window.location.reload()} />
      </section>
    </main>
  );
}
