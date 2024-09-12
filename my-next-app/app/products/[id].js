import ProductImageGallery from '../../components/ProductImageGallery';
import ProductDetails from '../../components/ProductDetails';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
    const product = await res.json();
    
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    return {
      props: {
        product: null,
        error: 'Failed to load product',
      },
    };
  }
}

export default function ProductPage({ product, error }) {
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <div>
      <button onClick={() => router.back()}>Back to Products</button>
      <h1>{product.name}</h1>
      <ProductImageGallery images={product.images} />
      <ProductDetails product={product} />
    </div>
  );
}
