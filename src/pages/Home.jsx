import { useEffect, useRef } from "react";
import React, { lazy, Suspense, useMemo, useState } from "react";
import HeroSection from "../components/home/HeroSection";
import TrustStrip from "../components/home/TrustStrip";
import PageLoader from "../components/PageLoader";
import useProducts from "../hooks/useProducts";
import { useSelector } from "react-redux";

const ProductList = lazy(() => import("../components/home/ProductList"));
const CategoryFilter = lazy(() => import("../components/home/CategoryFilter"));

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const searchQuery = useSelector((state) => state.search.query);

  const url = 'https://dummyjson.com/products?limit=100&select=id,title,price,thumbnail,category,rating,description,images,stock,discountPercentage';
  const { productdata, loading, error } = useProducts(url);

  const categories = useMemo(() => {
    if (!productdata?.products) return ["All"];
    const unique = [...new Set(productdata.products.map((p) => p.category))];
    return ["All", ...unique];
  }, [productdata]);

  const filteredProducts = useMemo(() => {
    if (!productdata?.products) return [];
    return productdata.products.filter((p) => {
      const matchesCategory =
        activeCategory === "All" ||
        p.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [productdata, activeCategory, searchQuery]);

  const productSectionRef = useRef(null);

  // scroll to product section when category or search changes
  useEffect(() => {
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeCategory, searchQuery]);

  if (loading) return <PageLoader />;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div>
      <HeroSection />
      <TrustStrip />
      <div ref={productSectionRef}>
        <Suspense fallback={<PageLoader />}>
          <CategoryFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
          />
          <ProductList products={filteredProducts} />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
