import { notFound } from "next/navigation";
import ProductDetails from "../components/ProductDetails";

async function fetchProduct(id) {
  const res = await fetch(
    `https://next-ecommerce-api.vercel.app/products/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductPage({ params }) {
  const { id } = params;
  let product;

  try {
    product = await fetchProduct(id);
  } catch (error) {
    return (
      <p className="text-red-500">
        Failed to load product. Please try again later.
      </p>
    );
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <ProductDetails product={product} />
    </div>
  );
}
