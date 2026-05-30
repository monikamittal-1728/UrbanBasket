import React from "react";

const ProductItem = ({ data }) => {
  const discountedPrice =
    data.price - (data.price * data.discountPercentage) / 100;

  return (
    <div className="
      group relative bg-white
      rounded-3xl overflow-hidden
      border-[1.5px] border-border
      shadow-sm
      hover:border-primary
      hover:shadow-[0_12px_32px_rgba(245,134,18,0.15)]
      hover:-translate-y-1
      transition-all duration-300
    ">

      {/* ── Image Area ── */}
      <div className="relative h-70 bg-gradient-to-br from-hover to-stone-300 flex items-center justify-center p-4 overflow-hidden">

        {/* hover tint */}
        <div className="
          absolute inset-0
          bg-gradient-to-t from-primary/10 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        "/>

        <img
          src={data.image}
          alt={data.title}
          loading="lazy"
          className="h-full object-contain group-hover:scale-[1.08] transition-transform duration-300"
        />

        {/* Discount badge */}
        <div className="
          absolute top-3 left-3
          bg-gradient-to-r from-primary to-primary-dark
          text-white text-[10px] font-bold tracking-wide
          px-3 py-1 rounded-full
          shadow-[0_2px_8px_rgba(245,134,18,0.4)]
        ">
          {Math.round(data.discountPercentage)}% OFF
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-4 space-y-3">

        {/* Category + Rating */}
        <div className="flex items-center justify-between">
          <span className="
            text-sm font-bold tracking-wider uppercase
            text-primary bg-hover
            px-3 py-1 rounded-full
            border border-primary/20
          ">
            {data.category}
          </span>
          <span className="flex items-center gap-1 text-sm font-bold text-secondary">
            <span className="text-[10px]">⭐</span>  {data.rating}
          </span>
        </div>

        {/* Title */}
        <h3 className="
          text-lg font-semibold text-secondary
          line-clamp-2 leading-snug
        ">
          {data.title}
        </h3>

        {/* Price + Add button */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-[2px]">
              Deal Price
            </p>
            <p className="text-lg font-extrabold text-secondary tracking-tight">
              ₹{discountedPrice.toFixed(0)}
              <span className="text-sm font-normal text-gray-400 line-through ml-2">
                ₹{data.price}
              </span>
            </p>
          </div>

          {/* Add button — expands on hover */}
          <button className="
            flex items-center gap-0 overflow-hidden
            bg-gradient-to-r from-primary to-primary-dark
            text-white text-xs font-semibold
            h-9 px-3 rounded-xl
            max-w-[36px] group-hover:max-w-[120px]
            group-hover:px-4 group-hover:gap-2
            shadow-[0_4px_12px_rgba(245,134,18,0.3)]
            hover:shadow-[0_6px_16px_rgba(245,134,18,0.45)]
            active:scale-95
            transition-all duration-300
          ">
            <span className="text-lg font-light leading-none">+</span>
            <span className="
              opacity-0 group-hover:opacity-100
              whitespace-nowrap
              transition-opacity duration-200
            ">
              Add to Cart
            </span>
          </button>
        </div>
      </div>

      {/* Bottom gradient strip */}
      <div className="h-[3px] bg-gradient-to-r from-primary via-primary-dark to-accent"/>
    </div>
  );
};

export default ProductItem;