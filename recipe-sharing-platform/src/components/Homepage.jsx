import React from 'react'
import items from '../data.json';

const Homepage = () => {
  return (
 <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items &&
          items.map(({ id, title, summary, image }) => (
            <div
              key={id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                  {title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {summary}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Homepage
