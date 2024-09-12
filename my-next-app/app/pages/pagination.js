export async function getServerSideProps(context) {
    const page = context.query.page || 1;
    const limit = 20;
    const skip = (page - 1) * limit;
    
    try {
      const res = await fetch(`https://next-ecommerce-api.vercel.app/products?limit=${limit}&skip=${skip}`);
      const products = await res.json();
      
      return {
        props: {
          products,
          page: Number(page),
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
  
  // Add buttons to navigate between pages
  const HomePage = ({ products, page, error }) => {
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
        <div>
          {page > 1 && <a href={`/?page=${page - 1}`}>Previous</a>}
          <a href={`/?page=${page + 1}`}>Next</a>
        </div>
      </div>
    );
  };
  
  export default HomePage;
  