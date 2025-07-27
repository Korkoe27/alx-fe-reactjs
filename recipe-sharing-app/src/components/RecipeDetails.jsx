import { useRecipeStore } from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = ({ recipeId }) => {
  const id = Number(recipeId); // Convert to number
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === id)
  );

  if (!recipe) {
    return null;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <EditRecipeForm recipeId={recipeId} />
      <DeleteRecipeButton recipeId={recipeId} />
    </div>
  );
};

export default RecipeDetails;