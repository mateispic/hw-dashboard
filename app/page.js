import { getProducts } from "../lib/supabase";
import ProductGrid from "../components/ProductGrid";
import styles from "./page.module.css";

export const revalidate = 300;

export default async function Home() {
  let products = [];
  let error = null;

  try {
    products = await getProducts();
  } catch (e) {
    error = e.message;
  }

  const norielCount = products.filter(p => p.source === "Noriel").length;
  const smykCount = products.filter(p => p.source === "Smyk").length;

  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <h1 className={styles.title}>Hot Wheels Tracker</h1>
        <p className={styles.subtitle}>
          Noriel & Smyk products dashboard
        </p>

        <div className={styles.stats}>
          <div>Total: {products.length}</div>
          <div>Noriel: {norielCount}</div>
          <div>Smyk: {smykCount}</div>
        </div>
      </header>

      <main className={styles.main}>
        {error ? (
          <div style={{ color: "red" }}>
            Error: {error}
          </div>
        ) : products.length === 0 ? (
          <div>No products</div>
        ) : (
          <ProductGrid products={products} />
        )}
      </main>

    </div>
  );
}