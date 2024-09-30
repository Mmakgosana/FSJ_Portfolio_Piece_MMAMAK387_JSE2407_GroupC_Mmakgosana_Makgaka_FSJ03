E-Commerce Store with Next.js


Introduction


Welcome to the E-Commerce Store, a modern and responsive e-commerce platform built with Next.js. The app provides users with a seamless shopping experience, offering features like product searching, filtering, sorting, and pagination. It is designed for performance, utilizing Next.js's powerful server-side rendering, caching strategies, and image optimization.

The store is built to support smooth navigation and user-friendly interactions, allowing users to browse products easily and efficiently. Additionally, the URL reflects the current search, filter, and sort options, ensuring users can bookmark or share specific views of the product listings. This project showcases a clean and well-organized codebase that ensures scalability and maintainability for future enhancements.

Features
Search: Search products by entering a title or part of a title.
Filter: Filter products by category.
Sort: Sort products by price (ascending/descending) and by rating on the product detail page.
URL Sharing: The URL reflects search, filter, and sort options, allowing easy sharing or bookmarking.
Pagination: Paginated results for better user experience when viewing filtered and sorted products.
Reviews Sorting: Sort reviews by date and rating on the product detail page.
SEO: Dynamic meta tags for SEO improvement, with product-specific metadata.
Responsive: The application is fully responsive and optimized for different screen sizes.
Image Optimization: Next.js's built-in image optimization for faster load times.
Caching: Server-side caching strategies to improve page load times by reusing cached data.

Technologies Used
Next.js: React-based framework for server-side rendering, static site generation, and more.
React: JavaScript library for building user interfaces.
Tailwind CSS: Utility-first CSS framework for styling.
Heroicons: For beautiful icons in the UI.
Next.js Image Component: For optimized image handling (automatic resizing and format conversion).
API: Fetches data dynamically from an API with searching, filtering, sorting, and pagination functionality.
SEO Optimization: Dynamically generated meta tags and improved SEO

Setup Instructions

Prerequisites

Node.js: Ensure you have Node.js installed. You can download it from nodejs.org.
1.Clone the Repository
git clone https://github.com/your-username/next-ecommerce-store.git

2.Navigate to the project directory
cd ecommerce-store


2. Install Dependencies
   npm install

3.Running the Development Server

npm run dev
Open your browser and navigate to http://localhost:3000 to view the application.

4.Building for Production
npm run build( To build the project for production)
npm start( to start the production server)

Usage

Search for Products
Use the search bar on the home page to search for products by entering a title or part of a title.
The results will automatically update based on the search query.

Filter Products by Category
Choose a category from the filter options to see products from that category.

Sort Products
Sort products by price (ascending or descending) using the sort options.

On the product detail page, you can also sort reviews by date or rating.

URL Sharing and Bookmarking
The URL reflects your current search, filter, and sort settings, allowing you to share or bookmark your current view.

Resetting Filters and Sorting
Click the "Reset" button to reset all filtering, sorting, and searching, returning to the default product list.

Paginated Results
If filtered or sorted results exceed 20 products, pagination controls will allow you to navigate between pages of results.

API Integration
The app fetches product data from an API with a single function that handles searching, filtering, sorting, and pagination in one query.

The API query ensures efficient fetching of only the data needed for each page load.

Meta Tags and SEO
SEO is improved with dynamic meta tags that change based on the product details.
Each product page will display the specific product title in the browser tab.

Caching and Performance Optimization
The application uses Next.js's server-side caching strategies to reduce redundant requests and improve performance.

Images are optimized using Next.js built-in features, ensuring they are served in modern formats like WebP.

Contact

For any inquiries, please reach out to makgakammakgosana@gmail.com.

Contribution
Contributions are welcome! Please fork the repository and submit a pull request for any new features or bug fixes.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Vercel link: https://mmamak-387-jse-2407-group-c-makgaka-fsj-01.vercel.app/





