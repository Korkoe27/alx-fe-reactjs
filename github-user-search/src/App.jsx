// App.jsx: Modify this file to include basic routing and a simple layout.
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';


const App = () => {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>My React App</h1>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
          </Switch>
        </main>
        <footer>
          <p>&copy; 2023 My React App</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;