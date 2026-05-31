import React from "react";

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-64 h-64 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default PageLoader;
