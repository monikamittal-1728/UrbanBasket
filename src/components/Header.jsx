import React from "react";
import { MdHome, MdShoppingCart, MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setSearchQuery } from "../store/searchSlice";

// Header component: displays the site logo, navigation (mobile + desktop),
// search bar, and cart status. It adapts responsively for mobile and desktop.
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 

  // Calculate total items in cart from Redux store
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  // Current search query from Redux store
  const query = useSelector((state) => state.search.query);

  // Handle search input changes
  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value)); // Update query in store
    // Redirect to home page if not already there (so search results show)
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto px-8 md:px-16 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Logo + Mobile Navigation */}
          <div className="flex items-center justify-between md:justify-start gap-4">
            {/* Logo */}
            <Link to="/">
              <div className="flex items-center gap-2 cursor-pointer shrink-0">
                <img
                  src="/logo.png"
                  alt="UrbanBasket"
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
                <h1 className="text-xl md:text-3xl font-extrabold tracking-tight">
                  <span className="text-secondary">Urban</span>
                  <span className="text-primary">Basket</span>
                </h1>
              </div>
            </Link>

            {/* Mobile Navigation (icons only) */}
            <nav className="flex md:hidden items-center gap-2">
              {/* Home button */}
              <Link to="/">
                <button className="p-2 rounded-full hover:bg-orange-50 transition">
                  <MdHome className="text-2xl text-secondary" />
                </button>
              </Link>

              {/* Cart button with badge */}
              <Link to="cart">
                <button
                  className={`relative p-2 rounded-full transition
                    ${cartCount > 0
                      ? "bg-secondary text-white"
                      : "text-secondary hover:bg-orange-50 hover:text-primary"
                    }`}
                >
                  <MdShoppingCart className="text-2xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </Link>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="w-full md:flex-1 md:max-w-4xl">
            <div className="flex items-center gap-2 px-4 py-3 rounded-full border border-gray-200 bg-slate-50 focus-within:border-primary transition-all">
              <MdSearch className="text-[#17173A] text-xl shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={handleSearch}
                className="w-full bg-transparent outline-none text-[#17173A] placeholder:text-gray-400"
              />
              {/* Clear search button */}
              {query && (
                <button
                  onClick={() => dispatch(setSearchQuery(""))}
                  className="text-gray-400 hover:text-gray-600 text-xl transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            {/* Home button */}
            <Link to="/">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full text-secondary hover:bg-orange-50 hover:text-primary transition-all duration-300">
                <MdHome className="text-2xl" />
                <span className="font-medium">Home</span>
              </button>
            </Link>

            {/* Cart button with badge */}
            <Link to="cart">
              <button
                className={`relative flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300
                  ${cartCount > 0
                    ? "bg-secondary text-white hover:bg-secondary-light"
                    : "text-secondary hover:bg-orange-50 hover:text-primary"
                  }`}
              >
                <MdShoppingCart className="text-2xl" />
                <span className="font-medium">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
          </nav>

        </div>
      </div>

      {/* Decorative gradient strip below header */}
      <div className="h-1 bg-gradient-to-r from-[#fdb569] via-[#f74343] to-[#c9360e]" />
    </header>
  );
};

export default Header;
