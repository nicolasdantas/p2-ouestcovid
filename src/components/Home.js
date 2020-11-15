import React from 'react';
import ContactForm from './ContactForm';
import News from './News';
import DataByCounty from './DataByCounty';
import AboutUs from './AboutUs';
import Graphic from './Graphic';
import Banner from './Banner';
import APICovidByCountyRequestProvider from '../contexts/APICovidByCountyRequest'

const Home = () => {
  return (
    <div>
      <Banner />
      <APICovidByCountyRequestProvider>
        <DataByCounty />
      </APICovidByCountyRequestProvider>
      <Graphic />
      <News />
      <ContactForm />
      <AboutUs />
    </div>
  );
};

export default Home;
