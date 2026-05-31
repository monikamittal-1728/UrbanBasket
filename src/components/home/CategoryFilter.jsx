import React from "react";

const CategoryFilter = ({ activeCategory, setActiveCategory, categories }) => {
  return (
    <div className="w-full py-20 md:px-16">
      {/* Title */}
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          <span className="text-secondary">Shop by</span>
          <span className="text-primary"> Category</span>
        </h2>
      </div>

      {/* Pills */}
      <div className="flex flex-wrap justify-center py-8 gap-3 px-4">
        {categories.map((name, i) => {
          const isActive = activeCategory === name;
          return (
            <button
              key={i}
              onClick={() => setActiveCategory(name)}
              className={`
                px-5 py-2 rounded-full text-base font-medium capitalize
                transition-all duration-200 border
                ${isActive
                  ? "bg-gray-900 text-white border-gray-900 shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                }
              `}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;