// Import necessary React hooks
import React, { useEffect, useRef, lazy, Suspense, useMemo, useState } from "react";

// Import static components
import HeroSection from "../components/home/HeroSection";
import TrustStrip from "../components/home/TrustStrip";
import PageLoader from "../components/PageLoader";

// Custom hook to fetch product data
import useProducts from "../hooks/useProducts";

// Redux hook to access global state
import { useSelector } from "react-redux";

// Lazy load components for performance optimization
// These components will only load when needed
const ProductList = lazy(() => import("../components/home/ProductList"));
const CategoryFilter = lazy(() => import("../components/home/CategoryFilter"));

const Home = () => {
  // State to track selected category
  const [activeCategory, setActiveCategory] = useState("All");

  // Get search query from Redux store
  const searchQuery = useSelector((state) => state.search.query);

  // API URL to fetch products (limit 100 and select specific fields)
  const url = "http://localhost:3000/api/products";

  // Custom hook returns product data, loading state, and error
  const { data, loading, error } = useProducts(url);
console.log(data);

  // Memoized category list (prevents recalculation on every render)
  const categories = useMemo(() => {
    // If products not loaded yet → default to "All"
    if (!data) return ["All"];

    // Extract unique categories from products
    const unique = [
      ...new Set(data.map((p) => p.category)),
    ];

    // Add "All" option at beginning
    return ["All", ...unique];
  }, [data]);

  // Memoized filtered product list (optimized filtering)
  const filteredProducts = useMemo(() => {
    if (!data) return [];

    return data.filter((p) => {
      // Check if product matches selected category
      const matchesCategory =
        activeCategory === "All" ||
        p.category.toLowerCase() === activeCategory.toLowerCase();

      // Check if product matches search query (title or category)
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Return only products matching both conditions
      return matchesCategory && matchesSearch;
    });
  }, [data, activeCategory, searchQuery]);

  // Reference to product section (used for scrolling)
  const productSectionRef = useRef(null);

  // Automatically scroll to products when category or search changes
  useEffect(() => {
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({
        behavior: "smooth", // smooth scroll animation
        block: "start",
      });
    }
  }, [activeCategory, searchQuery]);

  // Show loader while fetching products
  if (loading) return <PageLoader />;

  // Show error message if API fails
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        {error}
      </div>
    );

  // Main Home Page UI
  return (
    <div>
      {/* Hero banner section */}
      <HeroSection />

      {/* Trust indicators strip (badges, delivery, etc.) */}
      <TrustStrip />

      {/* Product section (scroll target) */}
      <div ref={productSectionRef}>
        {/* Suspense handles lazy loaded components */}
        <Suspense fallback={<PageLoader />}>
          {/* Category filter component */}
          <CategoryFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
          />

          {/* Product list component */}
          <ProductList products={filteredProducts} />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;