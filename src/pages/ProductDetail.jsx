import React, { useEffect, useState } from "react";
import { MdShoppingCart, MdCheck } from "react-icons/md";
import { useParams, Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import PageLoader from "../components/PageLoader";
import { addToCart } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailSkeleton from "../components/ProductDetailSkeleton ";

const ProductDetail = () => {

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const { id } = useParams();
  const [selectedImg, setSelectedImg] = useState(0);
  const { productdata, loading, error } = useProducts(
    `https://dummyjson.com/products/${id}`,
  );

  if (loading || !productdata?.id) {
    return <ProductDetailSkeleton />;
  }

  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  const capitalizeFirst = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  const discountedPrice = (
    productdata?.price *
    (1 - productdata?.discountPercentage / 100)
  ).toFixed(2);

  const isInCart = cartItems.some((item) => item.id === productdata?.id);

  const handleAddToCart = () => {
    if (!productdata || isInCart) return;

    dispatch(
      addToCart({
        id: productdata.id,
        title: productdata.title,
        price: +discountedPrice,
        discountPercentage: productdata.discountPercentage,
        image: productdata.images?.[0],
        category: productdata.category,
      }),
    );
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-secondary">
          {capitalizeFirst(productdata?.category)}
        </span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left — Images */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl overflow-hidden bg-orange-50 border border-orange-100 aspect-square flex items-center justify-center">
            <img
              src={productdata?.images?.[selectedImg]}
              alt={productdata?.title}
              className="w-full h-full object-contain p-6 transition-all duration-300"
            />
          </div>

          {productdata?.images?.length > 1 && (
            <div className="flex gap-3 flex-wrap">
              {productdata.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImg === i
                      ? "border-primary scale-105 shadow-md"
                      : "border-orange-100 hover:border-orange-300"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right — Info */}
        <div className="flex flex-col gap-5">
          <span className="self-start bg-orange-100 text-primary-dark  text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
            {productdata?.category}
          </span>

          <h1 className="text-3xl font-bold text-gray-800 leading-tight">
            {productdata?.title}
          </h1>

          <p className="text-gray-500 text-sm leading-relaxed">
            {productdata?.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < Math.round(productdata?.rating)
                      ? "text-primary"
                      : "text-gray-200"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {productdata?.rating} / 5
            </span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-primary">
              ${discountedPrice}
            </span>
            <span className="text-lg text-gray-400 line-through mb-1">
              ${productdata?.price}
            </span>
            <span className="mb-1 bg-green-100 text-green-600 text-sm font-semibold px-2 py-0.5 rounded-lg">
              {Math.round(productdata?.discountPercentage)}% OFF
            </span>
          </div>

          {/* Stock */}
          <p className="text-sm">
            {productdata?.stock > 0 ? (
              <span className="text-green-500 font-medium">
                ✓ In Stock ({productdata.stock} left)
              </span>
            ) : (
              <span className="text-primary font-medium">✗ Out of Stock</span>
            )}
          </p>

          <hr className="border-orange-100" />

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`w-full py-4 text-white font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 ${
              isInCart
                ? "bg-green-500 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-lg shadow-orange-200 hover:shadow-orange-300 active:scale-95"
            }`}
          >
            {isInCart ? (
              <>
                <MdCheck className="text-xl" />
                Added to Cart
              </>
            ) : (
              <>
                <MdShoppingCart className="text-xl" />
                Add to Cart
              </>
            )}
          </button>
          {/* Meta info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-orange-50 rounded-xl p-3">
              <p className="text-gray-400">Brand</p>
              <p className="font-semibold text-gray-700">
                {productdata?.brand || "—"}
              </p>
            </div>
            <div className="bg-orange-50 rounded-xl p-3">
              <p className="text-gray-400">SKU</p>
              <p className="font-semibold text-gray-700">
                {productdata?.sku || "—"}
              </p>
            </div>
            <div className="bg-orange-50 rounded-xl p-3">
              <p className="text-gray-400">Warranty</p>
              <p className="font-semibold text-gray-700">
                {productdata?.warrantyInformation || "—"}
              </p>
            </div>
            <div className="bg-orange-50 rounded-xl p-3">
              <p className="text-gray-400">Shipping</p>
              <p className="font-semibold text-gray-700">
                {productdata?.shippingInformation || "—"}
              </p>
            </div>
          </div>

          {/* Return Policy */}
          {productdata?.returnPolicy && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <span className="text-2xl">↩️</span>
              <div>
                <p className="text-sm font-semibold text-blue-700 mb-0.5">
                  Return Policy
                </p>
                <p className="text-sm text-blue-500">
                  {productdata.returnPolicy}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      {productdata?.reviews?.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Customer Reviews
            <span className="ml-3 text-sm font-normal text-primary bg-orange-50 px-3 py-1 rounded-full">
              {productdata.reviews.length} reviews
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productdata.reviews.map((review, i) => (
              <div
                key={i}
                className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-primary-dark flex items-center justify-center text-white font-bold text-sm">
                      {review.reviewerName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 text-sm">
                        {review.reviewerName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(review.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, j) => (
                      <span
                        key={j}
                        className={`text-sm ${j < review.rating ? "text-primary" : "text-gray-200"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
