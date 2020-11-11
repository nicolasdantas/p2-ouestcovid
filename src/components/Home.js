import React from 'react';
import ContactForm from './ContactForm';
import News from './News';
import DataByCounty from './DataByCounty';
import AboutUs from './AboutUs';

const Home = () => {
  return (
    <div>
      <DataByCounty />
      <News />
      <ContactForm />
      <AboutUs />
    </div>
  );
};

export default Home;
