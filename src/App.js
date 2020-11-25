import React, { useEffect } from 'react';
import './components/style/Global.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WhereToGo from './components/WhereToGo';
import Home from './components/Home';
import ContactForm from './components/ContactForm';
import AboutUs from './components/AboutUs';
import APICovidByCountyRequestProvider from './contexts/APICovidByCountyRequest';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.scss';
import CountySelectedProvider from './contexts/CountySelected';

function App() {
  useEffect(() => {
    const el = document.querySelector('.loader-container');
    if (el) {
      el.remove();
    }
  }, []);

  return (
    <APICovidByCountyRequestProvider>
      <CountySelectedProvider>
        <Router>
          <div className="content">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/ou-partir" component={WhereToGo} />
              <Route exact path="/contact">
                <AboutUs />
                <ContactForm />
              </Route>
            </Switch>
          </div>
          <Footer />
        </Router>
      </CountySelectedProvider>
    </APICovidByCountyRequestProvider>
  );
}

export default App;
