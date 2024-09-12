import Link from 'next/link';

const ProductCard = ({ product }) => (
  <div className="card hover:-translate-y-1 transition-all duration-200 bg-gray-100 rounded-lg">
    <img src={product.images[0]} className='h-64 object-contain' alt={product.title} />
    <h2 className="text-xl font-bold">{product.title}</h2>
    <p>${product.price}</p>
    <p>{product.category}</p>
    <Link href={`/products/${product.id}`} className="block text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
    
    View Details</Link>
  </div>
);

export default ProductCard;
