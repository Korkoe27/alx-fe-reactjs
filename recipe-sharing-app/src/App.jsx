import { useState } from 'react'
import './App.css'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeDetails from './components/RecipeDetails';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

function App() {

  return (
    <Router>
      <div>
        <RecipeList/>
        <AddRecipeForm />
        <FavoritesList />
        <RecommendationsList />
      </div>
      <Routes>
        <Route path="/recipes/:recipeId" element={<RecipeDetailsWrapper />} />
      </Routes>
    </Router>
  )
}

// Wrapper to extract recipeId from URL and pass to RecipeDetails
import { useParams } from 'react-router-dom';
function RecipeDetailsWrapper() {
  const { recipeId } = useParams();
  return <RecipeDetails recipeId={recipeId} />;
}

export default App