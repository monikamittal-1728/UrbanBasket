import React from "react";
import { MdHome, MdShoppingCart, MdSearch } from "react-icons/md";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-[#F58612] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img src="/logo2.png" alt="UrbanBasket" className="w-12 h-12" />

          <h1 className="text-3xl font-extrabold tracking-tight">
            <span className="text-[#17173A]">Urban</span>
            <span className="text-[#F58612]">Basket</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="flex items-center bg-slate-50 border-2 border-gray-200 rounded-full px-4 py-3 focus-within:border-[#F58612] transition-all duration-300">
            <MdSearch className="text-[#17173A] text-2xl" />

            <input
              type="text"
              placeholder="Search for products..."
              className="w-full bg-transparent outline-none px-3 text-[#17173A] placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          
          {/* Home */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-full text-[#17173A] font-medium hover:bg-orange-50 hover:text-[#F58612] transition-all duration-300 cursor-pointer">
            <MdHome className="text-2xl" />
            <span>Home</span>
          </button>

          {/* Cart */}
          <button className="relative flex items-center gap-2 px-5 py-2 rounded-full bg-[#17173A] text-white font-medium hover:bg-[#252555] transition-all duration-300 cursor-pointer">
            <MdShoppingCart className="text-2xl" />
            <span>Cart</span>

            <span className="absolute -top-2 -right-2 bg-[#F58612] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;