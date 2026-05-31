import React, { lazy, Suspense, useMemo, useState } from "react";
import HeroSection from "../components/home/HeroSection";
import TrustStrip from "../components/home/TrustStrip";
import PageLoader from "../components/PageLoader";
import useProducts from "../hooks/useProducts";

const ProductList = lazy(() => import("../components/home/ProductList"));
const CategoryFilter = lazy(() => import("../components/home/CategoryFilter"));

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const url = "https://dummyjson.com/products?limit=100";
  const { productdata, loading, error } = useProducts(url);

  const categories = useMemo(() => {
    if (!productdata?.products) return ["All"];
    const unique = [...new Set(productdata.products.map((p) => p.category))];
    return ["All", ...unique];
  }, [productdata]);

  const filteredProducts = useMemo(() => {
    if (!productdata?.products) return [];
    if (activeCategory === "All") return productdata.products;
    return productdata.products.filter(
      (p) => p.category.toLowerCase() === activeCategory.toLowerCase(),
    );
  }, [productdata, activeCategory]);

  if (loading) return <PageLoader />;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div>
      <HeroSection />
      <TrustStrip />

      <Suspense fallback={<PageLoader />}>
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
        />
        <ProductList products={filteredProducts} />
      </Suspense>
      {/* <Suspense fallback={<PageLoader />}>
        <CategoryFilter />
      </Suspense>

      <Suspense fallback={<PageLoader />}>
        <ProductList />
      </Suspense> */}
    </div>
  );
};

export default Home;
