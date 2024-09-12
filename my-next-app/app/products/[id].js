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
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </div>
    );
  }
  