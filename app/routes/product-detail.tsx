import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import type { Product } from "~/types/product";


export async function loader({ params }: LoaderFunctionArgs) {
  const { productId } = params;

  // จำลองการเรียก API
  const response = await fetch(`https://696b8b2a624d7ddccaa17d28.mockapi.io/products/${productId}`);
  if (!response.ok) {
      throw new Response("Product Not Found", { status: 404 });
    }
    
    const product: Product = await response.json();
  return product;
}
export default function ProductDetail() {
  // ใช้ Type Assertion หรือ Generic หากต้องการความแม่นยำของ Type
  const product = useLoaderData() as Product;

  return (
<div className="min-h-screen bg-gray-50 py-8 px-4">
  <div className="max-w-4xl mx-auto">
    {/* Back Button */}
    <Link
      to="/products"
      className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 font-medium"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Back to Products
    </Link>

    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Product Image Section */}
      <div className="bg-gray-100 h-96 flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="text-gray-400 text-center">
            <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>No image available</p>
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="p-8">
        {/* Product Name & Price */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold text-blue-600">
            ${product.price.toLocaleString()}
          </p>
        </div>

        {/* Description */}
        <div className="mb-6 border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Description
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Specifications (Optional) */}
        {product.specifications && (
          <div className="mb-6 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">{key}:</span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stock Status */}
        <div className="mb-6">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            product.inStock
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!product.inStock}
          >
            Add to Cart
          </button>
          <button
            className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:border-gray-400 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}