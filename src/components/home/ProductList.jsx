import React from "react";
import ProductItem from "../ProductItem";
import useProducts from "../../hooks/useProducts";
import PageLoader from "../PageLoader";

const ProductList = () => {
  const url = "https://dummyjson.com/products?limit=100";
  const { productdata, loading, error } = useProducts(url);
  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="px-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {productdata?.products?.map((item) => (
        <ProductItem key={item.id} data={item} />
      ))}
    </div>
  );
};

export default ProductList;
