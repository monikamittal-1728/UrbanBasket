import React, { lazy, Suspense } from "react";
import HeroSection from "../components/home/HeroSection";
import TrustStrip from "../components/home/TrustStrip";
import PageLoader from "../components/PageLoader";

const ProductList = lazy(() => import("../components/home/ProductList"));
const CategoryFilter = lazy(() => import("../components/home/CategoryFilter"));

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TrustStrip />
      
      <Suspense fallback={<PageLoader />}>
        <CategoryFilter />
      </Suspense>
      
      <Suspense fallback={<PageLoader />}>
      <ProductList />
      </Suspense>
    </div>
  );
};

export default Home;
