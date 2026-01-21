// pages/ProductPage.tsx
import { useLoaderData, Link } from "react-router";
import type { Product } from "../types/product";

export async function loader() {
  const response = await fetch("https://696b8b2a624d7ddccaa17d28.mockapi.io/products");
  
  if (!response.ok) {
    throw new Response("Failed to load products", { status: response.status });
  }

  const products: Product[] = await response.json();

  return products;
}

export default function ProductPage() {
  const products = useLoaderData() as Product[];

  return (
    <div className="product-page">
      <h1>Product List</h1>
      <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {products.map((product) => (
          <div key={product.id} className="product-card" style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            {/* เชื่อมโยงไปยัง Dynamic Route ที่เราสร้างไว้ก่อนหน้า */}
            <Link to={`/products/${product.id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}