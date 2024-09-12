import Link from 'next/link';

const ProductCard = ({ product }) => (
  <div className="card">
    <img src={product.images} className='h-64 object-contain' alt={product.name} />
    <h2>{product.name}</h2>
    <p>{product.price}</p>
    <p>{product.category}</p>
    <Link href={`/products/${product.id}`}>View Details</Link>
  </div>
);

export default ProductCard;
