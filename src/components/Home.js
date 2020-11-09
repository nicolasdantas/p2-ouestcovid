import React from 'react';
import ContactForm from './ContactForm';
import News from './News';
import DataByCounty from './DataByCounty';
import Graphic from './Graphic';

const Home = () => {
  return (
    <div>
      <DataByCounty />;
      <Graphic />
      <News />
      <ContactForm />
    </div>
  );
};

export default Home;
