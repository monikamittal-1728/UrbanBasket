// Import React
import React from "react";

// Import Link for client-side navigation
import { Link } from "react-router-dom";

// Import icons from react-icons
import { FiHome, FiShoppingCart } from "react-icons/fi";

const NotFound = () => {
  return (
    // Full-screen container with gradient background
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4 py-12">
      
      {/* Main card container */}
      <div className="bg-white border border-orange-100 rounded-3xl p-12 max-w-md w-full text-center shadow-none">

        {/* 404 Number Display */}
        <div className="relative inline-block">
          <h1 className="text-[96px] leading-none font-medium tracking-[-4px] text-primary">
            404
          </h1>

          {/* Decorative underline below 404 */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/5 h-[3px] bg-primary/20 rounded-full" />
        </div>

        {/* Circular Icon Section */}
        <div className="w-20 h-20 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mt-6">
          
          {/* Shopping cart icon */}
          <FiShoppingCart className="text-3xl text-primary" />
        </div>

        {/* Error Title */}
        <h2 className="mt-4 text-xl font-medium text-gray-800">
          Page not found
        </h2>

        {/* Error Description */}
        <p className="mt-2 text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">
          Looks like this page took a wrong turn at checkout. The item you're
          looking for might have moved or no longer exists.
        </p>

        {/* Divider line */}
        <div className="my-7 border-t border-orange-100" />

        {/* Navigation Button Section */}
        <div className="flex gap-3 justify-center flex-wrap">

          {/* Link to Home Page */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            {/* Home Icon */}
            <FiHome size={15} />
            Go home
          </Link>

        </div>

        {/* Fake breadcrumb trail for visual UX */}
        <div className="flex items-center justify-center gap-1.5 mt-5 text-xs text-gray-300">
          <span>Home</span>
          <span>/</span>
          <span>...</span>
          <span>/</span>
          <span className="text-primary font-medium">404</span>
        </div>

        {/* Footer error code text */}
        <p className="mt-4 text-xs text-gray-300">
          Error code 404 · Resource not found
        </p>

      </div>
    </div>
  );
};

export default NotFound;