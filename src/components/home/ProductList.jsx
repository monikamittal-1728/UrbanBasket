import React from "react";
import ProductItem from "../ProductItem";
// import useProducts from "../../hooks/useProducts";
import PageLoader from "../PageLoader";

const ProductList = ({products}) => {
  
  return (
    <div className="px-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products?.map((item) => (
        <ProductItem key={item.id} data={item} />
      ))}
    </div>
  );
};

export default ProductList;
