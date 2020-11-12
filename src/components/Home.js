import React from 'react';
import ContactForm from './ContactForm';
import News from './News';
import DataByCounty from './DataByCounty';
import AboutUs from './AboutUs';
import Graphic from './Graphic';
import Banner from './Banner';

const Home = () => {
  return (
    <div>
      <Banner />
      <DataByCounty />
      <Graphic />
      <News />
      <ContactForm />
      <AboutUs />
    </div>
  );
};

export default Home;
