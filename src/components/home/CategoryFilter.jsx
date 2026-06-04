import React from "react";

// CategoryFilter component: displays a set of category "pills" (buttons)
// allowing the user to filter items by category.
const CategoryFilter = ({ activeCategory, setActiveCategory, categories }) => {
  return (
    <div className="w-full pt-16 pb-6 md:px-16">
      {/* Section Title */}
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          <span className="text-secondary">Shop by</span>
          <span className="text-primary"> Category</span>
        </h2>
      </div>

      {/* Category Pills (buttons) */}
      <div className="flex flex-wrap justify-center py-4 gap-3 ">
        {categories.map((name, i) => {
          // Check if the current category is the active one
          const isActive = activeCategory === name;

          return (
            <button
              key={i} // Unique key for each button
              onClick={() => setActiveCategory(name)} // Update active category when clicked
              className={`
                px-5 py-2 rounded-full text-[11px] font-medium capitalize
                transition-all duration-200 border
                ${
                  // Conditional styling based on active state
                  isActive
                    ? "bg-gray-900 text-white border-gray-900 shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                }
              `}
            >
              {/* Display category name */}
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
