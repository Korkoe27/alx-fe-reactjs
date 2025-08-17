import React from 'react';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Recipe App</h1>
        </div>
      </header>
      <main>
        <HomePage />
      </main>
    </div>
  );
}

export default App;