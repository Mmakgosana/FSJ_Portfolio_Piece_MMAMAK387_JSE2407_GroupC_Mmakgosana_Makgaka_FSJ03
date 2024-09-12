// pages/index.js
export async function getServerSideProps() {
    try {
      const res = await fetch('https://next-ecommerce-api.vercel.app/products?limit=20');
      const products = await res.json();
      
      return {
        props: {
          products,
        },
      };
    } catch (error) {
      return {
        props: {
          products: [],
          error: 'Failed to load products',
        },
      };
    }
  }
  
  const HomePage = ({ products, error }) => {
    if (error) {
      return <div>Error: {error}</div>;
    }
    
    return (
      <div>
        <h1>Product List</h1>
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default HomePage;
  