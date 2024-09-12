// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import ProductDetails from '../../components/ProductDetails';

// const ProductDetailsPage = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!id) return;

//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
//         if (!res.ok) throw new Error('Failed to fetch product');
//         const data = await res.json();
//         setProduct(data);
//       } catch (error) {
//         setError('Failed to load product details');
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return <ProductDetails product={product} />;
// };

// export default ProductDetailsPage;
