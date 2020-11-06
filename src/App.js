import React from 'react';
import './components/style/Global.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WhereToGo from './components/WhereToGo';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="content">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/ou-partir" component={WhereToGo} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
