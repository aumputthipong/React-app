import { useLoaderData, type LoaderFunctionArgs } from "react-router";
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
    <div className="product-detail">
        dsds
      <h1>{product.name}</h1>
      <p className="price">Price: ${product.price.toLocaleString()}</p>
      <div className="description">
        <h2>Description</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
}