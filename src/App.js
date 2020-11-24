import React, { useEffect, useState } from 'react';
import './components/style/Global.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WhereToGo from './components/WhereToGo';
import Home from './components/Home';
import APICovidByCountyRequestProvider from './contexts/APICovidByCountyRequest';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.scss';
import CountySelectedProvider from './contexts/CountySelected';

function App() {
  const [isLoading, setLoading] = useState(true);

  function fakeRequest() {
    return new Promise((resolve) => setTimeout(() => resolve(), 1500));
  }

  useEffect(() => {
    fakeRequest().then(() => {
      const el = document.querySelector('.loader-container');
      if (el) {
        el.remove();
        setLoading(!isLoading);
        console.log(isLoading);
      }
    });
  }, []);

  // if (isLoading) {
  //   return null;
  // }

  return (
    <APICovidByCountyRequestProvider>
      <CountySelectedProvider>
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
      </CountySelectedProvider>
    </APICovidByCountyRequestProvider>
  );
}

export default App;
