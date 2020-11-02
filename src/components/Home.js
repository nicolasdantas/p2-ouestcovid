import React from 'react';
import ContactForm from './ContactForm';
import Carousel from './Carousel';
import DataByCounty from './DataByCounty';

const Home = () => {
  return (
    <div>
      <DataByCounty />;
      <Carousel />
      <ContactForm />;
    </div>
  );
};

export default Home;
