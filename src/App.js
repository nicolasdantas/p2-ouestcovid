import React from 'react';
import './components/style/Global.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WhereToGo from './components/WhereToGo';
import Home from './components/Home';
import APICovidByCountyRequestProvider from './contexts/APICovidByCountyRequest';
import Navbar from './components/Navbar';
import Store from './components/Store';
import Basket from './components/Basket';
import Footer from './components/Footer';
import './App.scss';
import CountySelectedProvider from './contexts/CountySelected';
import StoreContextProvider from './contexts/StoreContext';

function App() {
  return (
    <APICovidByCountyRequestProvider>
      <CountySelectedProvider>
        <Router>
          <div className="content">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/ou-partir" component={WhereToGo} />
              <StoreContextProvider>
                <Route exact path="/store" component={Store} />
                <Route exact path="/basket" component={Basket} />
              </StoreContextProvider>
            </Switch>
          </div>
          <Footer />
        </Router>
      </CountySelectedProvider>
    </APICovidByCountyRequestProvider>
  );
}

export default App;
