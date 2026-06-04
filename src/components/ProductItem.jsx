import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../store/cartSlice";

const ProductItem = ({ data }) => {

  console.log(data);
  
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const navigate = useNavigate();

  let handleProductClick = (id) => {
    navigate(`product/${id}`);
  };
  const discountedPrice =
    data.price - (data.price * data.discountPercentage) / 100;

  const isInCart = cartItems.some((item) => item.id === data?.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!data || isInCart) return;

    dispatch(
      addToCart({
        id: data.id,
        title: data.title,
        price: discountedPrice.toFixed(2),
        discountPercentage: data.discountPercentage,
        image: data.images?.[0],
        category: data.category,
      }),
    );
  };


  return (
    <div
      className="
      group relative bg-white
      rounded-3xl overflow-hidden
      border-[1.5px] border-border
      shadow-sm
      hover:border-primary
      hover:shadow-[0_12px_32px_rgba(245,134,18,0.15)]
      hover:-translate-y-1
      transition-all duration-300
      cursor-pointer
    "
      onClick={() => handleProductClick(data.id)}
    >
      {/* ── Image Area ── */}
      <div className="relative h-70 bg-gradient-to-br from-hover to-stone-300 flex items-center justify-center p-4 overflow-hidden">
        {/* hover tint */}
        <div
          className="
          absolute inset-0
          bg-gradient-to-t from-primary/10 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        "
        />

        <img
          src={data.thumbnail}
          alt={data.title}
          loading="lazy"
          className="h-full object-contain group-hover:scale-[1.08] transition-transform duration-300"
        />

        {/* Discount badge */}
        <div
          className="
          absolute top-3 left-3
          bg-gradient-to-r from-primary to-primary-dark
          text-white text-[10px] font-bold tracking-wide
          px-3 py-1 rounded-full
          shadow-[0_2px_8px_rgba(245,134,18,0.4)]
        "
        >
          {Math.round(data.discountPercentage)}% OFF
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-4 space-y-3">
        {/* Category + Rating */}
        <div className="flex items-center justify-between">
          <span
            className="
            text-[10px] font-bold tracking-wider uppercase
            text-primary bg-hover
            px-3 py-1 rounded-full
            border border-primary/20
          "
          >
            {data.category}
          </span>
          <span className="flex items-center gap-1 text-sm font-bold text-secondary">
            <span className="text-[10px]">⭐</span> {data.rating}
          </span>
        </div>

        {/* Title */}
        <h3
          className="
          text-base font-semibold text-secondary
          line-clamp-2 leading-snug
        "
        >
          {data.title}
        </h3>

        {/* Price + Add button */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-[2px]">
              Deal Price
            </p>
            <p className="text-lg font-extrabold text-secondary tracking-tight">
              ${discountedPrice.toFixed(2)}
              <span className="text-sm font-normal text-gray-400 line-through ml-2">
                ${data.price}
              </span>
            </p>
          </div>

          {/* Add button — expands on hover */}
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`
    flex items-center gap-0 overflow-hidden
    text-white text-xs font-semibold
    h-9 px-3 rounded-xl
    max-w-[36px] group-hover:max-w-[130px]
    group-hover:px-4 group-hover:gap-2
    active:scale-95
    transition-all duration-300
    ${
      isInCart
        ? "bg-green-500 cursor-not-allowed shadow-[0_4px_12px_rgba(34,197,94,0.3)] hover:shadow-[0_6px_16px_rgba(34,197,94,0.45)]"
        : "bg-gradient-to-r from-primary to-primary-dark shadow-[0_4px_12px_rgba(245,134,18,0.3)] hover:shadow-[0_6px_16px_rgba(245,134,18,0.45)]"
    }
  `}
          >
            <span className="text-lg font-light leading-none">
              {isInCart ? "✓" : "+"}
            </span>
            <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200">
              {isInCart ? "Added to Cart" : "Add to Cart"}
            </span>
          </button>
        </div>
      </div>

      {/* Bottom gradient strip */}
      <div className="h-[3px] bg-gradient-to-r from-primary via-primary-dark to-accent" />
    </div>
  );
};


ProductItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    stock: PropTypes.number,
    discountPercentage: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductItem;
