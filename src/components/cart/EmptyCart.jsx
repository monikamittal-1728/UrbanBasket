import React from "react";
import { MdHome, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      {/* Cart Icon */}
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-orange-50 flex items-center justify-center">
          <MdShoppingCart className="text-6xl text-orange-200" />
        </div>
        {/* Sad face badge */}
        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white border-2 border-orange-100 flex items-center justify-center text-xl shadow-sm">
          😢
        </div>
      </div>

      {/* Text */}
      <h2 className="text-2xl font-extrabold text-secondary mb-2">
        Your cart is empty!
      </h2>
      <p className="text-gray-400 text-sm text-center max-w-xs mb-8">
        Looks like you haven't added anything yet. Start shopping and find
        something you love!
      </p>

      {/* CTA Button */}
      <Link to="/">
        <button className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-2xl hover:from-orange-500 hover:to-orange-600 transition-all duration-200 shadow-lg shadow-orange-200 active:scale-95">
          <MdHome className="text-xl" />
          Start Shopping
        </button>
      </Link>

      {/* Decorative dots */}
      <div className="flex gap-2 mt-10">
        <span className="w-2 h-2 rounded-full bg-primary opacity-30" />
        <span className="w-2 h-2 rounded-full bg-primary opacity-60" />
        <span className="w-2 h-2 rounded-full bg-primary" />
      </div>
    </div>
  );
};

export default EmptyCart;
