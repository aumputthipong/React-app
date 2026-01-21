// types/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
  specifications?: Record<string, string>;
  image: string;
}