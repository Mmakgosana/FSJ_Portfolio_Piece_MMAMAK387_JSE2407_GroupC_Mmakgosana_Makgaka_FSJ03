import { NextResponse } from 'next/server';
import { db } from '@/app/firebaseconfig'; // Ensure the correct path
import { collection, query, getDocs, orderBy, limit, startAfter, where } from 'firebase/firestore';
import Fuse from 'fuse.js';

export async function GET(request) {
  const { searchTerm, category, sort, order, page, limit: limitParam } = request.nextUrl.searchParams;

  const limitValue = limitParam ? parseInt(limitParam, 10) : 20; // Default limit
  const pageValue = page ? parseInt(page, 10) : 0; // Default page is 0

  try {
    // Initialize a query for products
    let productsQuery = query(collection(db, 'products'), orderBy("id"), limit(limitValue));

    // Filter by category if provided
    if (category) {
      productsQuery = query(productsQuery, where("category", "==", category));
    }

    // Implement searching with Fuse.js if searchTerm is provided
    let products = [];
    const snapshot = await getDocs(productsQuery);
    products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Handle pagination logic
    if (pageValue > 0) {
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const paginatedQuery = query(collection(db, 'products'), orderBy("id"), startAfter(lastVisible), limit(limitValue));

      const paginatedSnapshot = await getDocs(paginatedQuery);
      products = paginatedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    // Implement searching with Fuse.js if searchTerm is provided
    if (searchTerm) {
      const fuse = new Fuse(products, { keys: ['title'], includeScore: true });
      const searchResults = fuse.search(searchTerm);
      products = searchResults.map(result => result.item);
    }

    // Implement sorting if provided
    if (sort) {
      products.sort((a, b) => {
        if (order === 'desc') {
          return b[sort] - a[sort];
        }
        return a[sort] - b[sort];
      });
    }

    // Return a JSON response with the products data
    return NextResponse.json({
      products,
      total: products.length,
      page: pageValue,
      limit: limitValue,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
