import { NextResponse } from 'next/server';
import { db } from '@/app/firebaseconfig'; // Adjust the path as needed
import { collection, query, getDocs, orderBy, limit, where, startAfter } from 'firebase/firestore';
import Fuse from 'fuse.js';

export async function GET(request) {
  const { searchTerm, category, sort, order, page, limit: limitParam } = request.nextUrl.searchParams;

  const limitValue = limitParam ? parseInt(limitParam, 10) : 20; // Default limit is 20
  const pageValue = page ? parseInt(page, 10) : 0; // Default page is 0

  try {
    // Initialize a query for products
    let productsQuery = query(collection(db, 'products'), limit(limitValue));

    // Filter by category if provided
    if (category) {
      productsQuery = query(productsQuery, where("category", "==", category));
    }

    // Add pagination based on pageValue
    let lastDoc = null;

    if (pageValue > 0) {
      // Fetch the previous page's last document
      const previousPageQuery = query(
        collection(db, 'products'), 
        limit(pageValue * limitValue)
      );

      const previousSnapshot = await getDocs(previousPageQuery);
      if (!previousSnapshot.empty) {
        lastDoc = previousSnapshot.docs[previousSnapshot.docs.length - 1];
      }
    }

    // If there is a lastDoc, start after it for the current page
    if (lastDoc) {
      productsQuery = query(productsQuery, startAfter(lastDoc));
    }

    // Get the products for the current page
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
      // Ensure sort is either 'price' or other properties
      if (sort === 'price') {
        products.sort((a, b) => {
          return order === 'desc' ? b.price - a.price : a.price - b.price;
        });
      } else {
        products.sort((a, b) => {
          if (order === 'desc') {
            return b[sort] - a[sort];
          }
          return a[sort] - b[sort];
        });
      }
    }

    // Return a JSON response with the products data
    return NextResponse.json({
      products: products,
      total: products.length, // Returning total number of products after filtering/searching
      page: pageValue,
      limit: limitValue,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
