import React from 'react';
import ContactForm from './ContactForm';
import Carousel from './Carousel';
import DataByCounty from './DataByCounty';
import Graphic from './Graphic';

const Home = () => {
  return (
    <div>
      <DataByCounty />;
      <Graphic />
      <Carousel />
      <ContactForm />;
    </div>
  );
};

export default Home;
