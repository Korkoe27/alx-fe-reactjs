import React, { useState } from "react";

const AddRecipeForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!ingredients.trim()) newErrors.ingredients = "Ingredients are required";
    if (!steps.trim()) newErrors.steps = "Steps are required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      title,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      steps: steps.split("\n").map((s) => s.trim()),
    });

    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md mx-auto p-4 bg-white shadow rounded-lg"
    >
      <h2 className="text-xl font-bold mb-2">Add a New Recipe</h2>

      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          placeholder="Recipe title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
        />
        {errors.title && (
          <p className="text-red-500 text-sm font-semibold">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Ingredients</label>
        <textarea
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="border p-2 rounded w-full"
        />
        {errors.ingredients && (
          <p className="text-red-500 text-sm font-semibold">
            {errors.ingredients}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Steps</label>
        <textarea
          placeholder="Steps (each step on new line)"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className="border p-2 rounded w-full"
        />
        {errors.steps && (
          <p className="text-red-500 text-sm font-semibold">{errors.steps}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 font-bold"
      >
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;