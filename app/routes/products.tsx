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
<div className="min-h-screen bg-gray-50 py-8 px-4">
  <div className="max-w-7xl mx-auto">
    <h1 className="text-3xl font-bold text-gray-900 mb-8">
      Product List
    </h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
  key={product.id}
  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
>
  {/* Product Image Section */}
  <div className="bg-gray-100 h-48 flex items-center justify-center">
    {product.image ? (
      <img
        src={product.image}
        alt={product.name}
        className="h-full w-full object-cover"
      />
    ) : (
      <div className="text-gray-400 text-center">
        <svg
          className="w-16 h-16 mx-auto mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-sm">No image</p>
      </div>
    )}
  </div>

  {/* Product Info Section */}
  <div className="p-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-2">
      {product.name}
    </h2>
    <p className="text-gray-600 mb-4">
      Price: ${product.price.toLocaleString()}
    </p>
    <Link
      to={`/products/${product.id}`}
      className="text-blue-600 hover:text-blue-700 font-medium underline"
    >
      View Details
    </Link>
  </div>
</div>

      ))}
    </div>
  </div>
</div>

  );
}