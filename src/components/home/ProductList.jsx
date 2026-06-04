import React from "react";
import ProductItem from "../ProductItem";
import PageLoader from "../PageLoader";
import EmptyState from "./EmptyState ";

// ProductList component: renders a grid of products.
const ProductList = ({ products }) => {
  // If no products are available, it shows an EmptyState component instead.

  if (products?.length <= 0) {
    return (
      <>
        <EmptyState />
      </>
    );
  }

  // Render product grid
  return (
    <div className="px-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products?.map((item) => (
        <ProductItem key={item.id} data={item} />
      ))}
    </div>
  );
};

export default ProductList;
