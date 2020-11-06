import React from 'react';
import ContactForm from './ContactForm';
import News from './News';
import DataByCounty from './DataByCounty';

const Home = () => {
  return (
    <div>
      <DataByCounty />
      <News />
      <ContactForm />
    </div>
  );
};

export default Home;
