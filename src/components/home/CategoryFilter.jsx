import React, { useState } from "react";

const CategoryFilter = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { id: 0, name: "All" },
    { id: 1, name: "Electronics" },
    { id: 2, name: "Fashion" },
    { id: 3, name: "Groceries" },
    { id: 4, name: "Beauty" },
    { id: 5, name: "Furniture" },
    { id: 6, name: "Kitchen" },
    { id: 7, name: "Sports" },
    { id: 8, name: "Accessories" },
  ];

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
      <div className="flex flex-wrap justify-center py-8 gap-3  md:gap-5 px-4">
        {categories.map((item) => {
          const isActive = activeCategory === item.name;

          return (
            <button
              key={item.id}
              onClick={() => setActiveCategory(item.name)}
              className={`
                px-5 py-2
                rounded-full
                text-lg font-medium
                transition-all duration-200
                border
                ${
                  isActive
                    ? "bg-gray-900 text-white border-gray-900 shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                }
              `}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
