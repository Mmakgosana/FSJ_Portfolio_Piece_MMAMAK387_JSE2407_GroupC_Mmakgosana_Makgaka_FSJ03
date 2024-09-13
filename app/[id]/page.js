import { notFound } from "next/navigation";
import Header from "../components/Header";
import ProductDetails from "../components/ProductDetails";
import Link from "next/link";


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
  <div>
    <Header />
    <div className="max-w-5xl mx-auto p-8">
      <Link href="/products">
        <button className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
          Back to Products
        </button>
      </Link>
      <ProductDetails product={product} />
    </div>
  </div>
    
  );
}
