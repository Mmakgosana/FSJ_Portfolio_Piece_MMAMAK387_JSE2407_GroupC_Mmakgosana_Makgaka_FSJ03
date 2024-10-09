import { NextResponse } from 'next/server';
import { db } from '../../firebaseconfig';
import { collection, query, getDocs, limit, where, startAfter, orderBy } from 'firebase/firestore';
import Fuse from 'fuse.js';

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const searchTerm = params.get("searchTerm");
  const category = params.get("category");
  const sort = params.get("sort");
  const order = params.get("order");
  const page = parseInt(params.get("page"), 10) || 1; // Get the page number, default to 1
  const limitCount = 20; // Limit products to 20 per page
  const startIndex = (page - 1) * limitCount; // Calculate start index for pagination
  
  try {
    // Initialize a query for products
    let productsQuery = query(collection(db, 'products'));

    // Filter by category if provided
    if (category) {
      productsQuery = query(productsQuery, where("category", "==", category));
    }

    // Execute the query to fetch all products at once
    const snapshot = await getDocs(productsQuery);
    let products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Implement searching with Fuse.js if searchTerm is provided
    if (searchTerm) {
      const fuse = new Fuse(products, { keys: ['title'], includeScore: true });
      const searchResults = fuse.search(searchTerm);
      products = searchResults.map(result => result.item);
    }

    // Implement sorting if provided
    if (sort) {
      products.sort((a, b) => {
        if (sort === 'price') {
          return order === 'desc' ? b.price - a.price : a.price - b.price;
        } else {
          return order === 'desc' ? (b[sort] || 0) - (a[sort] || 0) : (a[sort] || 0) - (b[sort] || 0);
        }
      });
    }

    // Paginate products
    const paginatedProducts = products.slice(startIndex, startIndex + limitCount);
    
    // Return a JSON response with paginated products data
    return NextResponse.json({
      products: paginatedProducts,
      total: products.length, // Total number of products after filtering/searching
      page,
      totalPages: Math.ceil(products.length / limitCount), // Calculate total pages
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
