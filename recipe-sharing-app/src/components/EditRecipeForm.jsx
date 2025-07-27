import React, { useState } from 'react';
import { useRecipeStore } from './recipeStore';

const EditRecipeForm = ({ recipeId }) => {
  const id = Number(recipeId); // Ensure type matches
    const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === id)
    );
    const updateRecipe = useRecipeStore(state => state.updateRecipe);

  // If recipe is not found, show a message or nothing
    if (!recipe) {
    return <div>Recipe not found.</div>;
    }

  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (event) => {
    event.preventDefault
    updateRecipe({ id, title, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Update Recipe</button>
    </form>
  );
};

export default EditRecipeForm;