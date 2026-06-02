import React from "react";

const ProductDetailSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left - Image */}
        <div>
          <div className="aspect-square rounded-2xl bg-gray-200"></div>

          <div className="flex gap-3 mt-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="w-16 h-16 rounded-xl bg-gray-200"
              />
            ))}
          </div>
        </div>

        {/* Right - Details */}
        <div className="space-y-4">
          <div className="h-6 w-24 bg-gray-200 rounded"></div>

          <div className="h-10 w-3/4 bg-gray-200 rounded"></div>

          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          </div>

          <div className="h-8 w-40 bg-gray-200 rounded"></div>

          <div className="h-12 w-full bg-gray-200 rounded-2xl"></div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-20 rounded-xl bg-gray-200"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;