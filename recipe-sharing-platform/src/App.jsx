import './App.css'
import HomePage from './components/Homepage';
import RecipeDetail from './components/RecipeDetail'; // make sure this exists
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  )
}

export default App;