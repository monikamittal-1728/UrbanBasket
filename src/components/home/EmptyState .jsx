import React from 'react'

const EmptyState  = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
    {/* Icon */}
    <div className="w-24 h-24 rounded-full bg-orange-50 flex items-center justify-center mb-6">
      <span className="text-5xl">🔍</span>
    </div>

    {/* Text */}
    <h3 className="text-xl font-bold text-secondary mb-2">No products found</h3>
    <p className="text-gray-400 text-sm text-center max-w-xs">
      Try adjusting your search or switching to a different category.
    </p>

    {/* Decorative dots */}
    <div className="flex gap-2 mt-8">
      <span className="w-2 h-2 rounded-full bg-primary opacity-40" />
      <span className="w-2 h-2 rounded-full bg-primary opacity-70" />
      <span className="w-2 h-2 rounded-full bg-primary" />
    </div>
  </div>
  )
}

export default EmptyState 
