import React from 'react'
import { useRecipeStore } from './recipeStore';
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ recipeId }) => {
    const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
    const navigate = useNavigate();

    const handleDelete = () => {
        deleteRecipe(Number(recipeId));
        navigate('/'); 
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete Recipe</button>
        </div>
    );
};

export default DeleteRecipeButton;