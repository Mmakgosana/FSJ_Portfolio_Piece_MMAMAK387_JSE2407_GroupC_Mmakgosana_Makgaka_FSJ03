import { notFound } from "next/navigation";
import Header from "../components/Header";
import ProductDetails from "../components/ProductDetails";
import Link from "next/link";
import Head from "next/head"; // Import Head component for meta tags

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

  // Generate dynamic meta data
  const title = product.title; // Assuming title is a string
  const description = product.description; // Assuming description is a string

  return (
    <div>
      <Head>
        <title>{title}</title> {/* Set the document title */}
        <meta name="description" content={description} /> {/* Set the meta description */}
      </Head>
      <Header />
      <div className="max-w-5xl mx-auto p-8">
        <Link href="/">
          <div className="inline-block mb-6 px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-purple-400 transition-colors duration-300">
            Back to Products
          </div>
        </Link>
        <ProductDetails product={product} />
      </div>
    </div>
  );
}
