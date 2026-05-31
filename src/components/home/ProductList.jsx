import React from "react";
import ProductItem from "../ProductItem";
import useProducts from "../../hooks/useProducts";
import PageLoader from "../PageLoader";

const ProductList = () => {
  const url = "https://dummyjson.com/products?limit=100";
  const { products, loading, error } = useProducts(url);

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="px-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((item) => (
        <ProductItem key={item.id} data={item} />
      ))}
    </div>
  );
};

export default ProductList;
