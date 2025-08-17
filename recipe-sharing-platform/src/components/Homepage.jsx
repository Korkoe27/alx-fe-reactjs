import React, { useState, useEffect } from "react";

const Homepage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error loading recipes:", err));
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">
        Recipes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border rounded-xl shadow p-3 sm:p-4 md:p-6 bg-white transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
              {recipe.title}
            </h2>
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-32 sm:h-40 md:h-48 object-cover rounded mb-3"
              />
            )}
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              {recipe.ingredients?.slice(0, 3).join(", ")}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;