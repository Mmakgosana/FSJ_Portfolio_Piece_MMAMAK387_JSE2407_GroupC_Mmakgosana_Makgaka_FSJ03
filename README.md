E-Commerce Store with Next.js


Introduction


Welcome to my Next.js E-commerce Store! This project is a modern, responsive, and user-friendly e-commerce application built with Next.js, tailored to provide a seamless shopping experience. The store includes features such as product browsing, search, filtering, sorting, pagination, and dynamic product detail pages. Additionally, it leverages server-side rendering for enhanced performance and SEO, making it perfect for users who want a smooth and fast shopping experience.


Features

Product Listing: Displays a list of products with pagination.

Search & Filter: Allows users to search products by title and filter them by categories.

Sorting: Users can sort products by price, rating, etc.

Product Details: Detailed product page with information such as title, price, description, images, and reviews.

Authentication: User authentication with Firebase for sign-up, login, and logout.

API Integration: Fetches data dynamically using custom API endpoints with search, filter, and sort capabilities.

Responsive Design: Fully responsive and mobile-friendly

Reviews Sorting: Sort reviews by date and rating on the product detail page.

SEO: Dynamic meta tags for SEO improvement, with product-specific metadata.

Technologies Used

Next.js: For server-side rendering, routing, and React framework support.

React: JavaScript library for building user interfaces.

Tailwind CSS: Utility-first CSS framework for fast and efficient styling.

Firebase: Used for authentication, database, and hosting.

Fuse.js: Lightweight fuzzy-search library for handling search functionality.

Heroicons: Icon library for modern icons used throughout the UI.


Setup Instructions

Prerequisites

Before setting up the project, make sure you have the following installed:

Node.js (version 14 or above)
Firebase CLI (for Firebase deployment and management)

Step 1: Clone the Repository
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

Step 2: Install Dependencies
Install all required packages by running:
npm install

Step 3: Configure Firebase
Create a Firebase project on Firebase Console.
Set up Authentication and Firestore Database.
Create a .env.local file in the root of your project and add your Firebase configuration details:

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain

NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id

NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

Step 4: Run the Application
To start the development server, run:
npm run dev
Open your browser and navigate to http://localhost:3000 to view the application in development mode.

Step 5: Build and Deploy
To build the application for production, use:
npm run build

Once the build is complete, you can deploy the application on your preferred platform. If you want to use Firebase Hosting, follow these steps:

firebase login
firebase init
firebase deploy

Step 6: Additional Configuration (Optional)
If you wish to deploy to Vercel, simply push your repository to GitHub and follow the Vercel deployment process, as Vercel is well-integrated with Next.js.

Usage Examples
Product Browsing: Users can browse the main product page to see a list of available products.

Products are displayed in a card layout with image, title, price, and a brief description.

Search: Users can enter a product title or a part of it in the search bar to find specific items.

Filter: Users can filter products by category, helping them find items that match their interests.

Sorting: Sorting options allow users to sort products by price, rating, or relevance.

Pagination: The store supports paginated browsing, so users can navigate through different pages of products.

Product Details: By clicking on a product card, users are taken to a detailed page with comprehensive information about the product.

User Authentication: Users can sign up, sign in, and sign out securely using Firebase Authentication.

Live Demo
Check out the live version of the application here: Hosted Application Link

Code
The source code for this project can be found on GitHub: GitHub Repository

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For any questions, feel free to contact me via:

Email: makgakammakgosana@gmail.com

Thank you for checking out my Next.js E-commerce Store! If you have any suggestions or would like to contribute, please feel free to open an issue or submit a pull request.















