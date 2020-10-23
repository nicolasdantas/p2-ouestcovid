import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import WhereToGo from './components/WhereToGo';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <header>
        <h1>I'm the header</h1>
        <Link to='/'>Accueil</Link>
        <Link to='/ou-partir'>Où partir ?</Link>
      </header>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/ou-partir' component={WhereToGo} />
      </Switch>
      <footer>
        <h1>I'm the footer</h1>
      </footer>
    </Router>
  );
}

export default App;
