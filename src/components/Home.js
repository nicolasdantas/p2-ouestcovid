import React from 'react';
import ContactForm from './ContactForm';
import News from './News';
import DataByCounty from './DataByCounty';
import Banner from './Banner';

const Home = () => {
  return (
    <div>
      <Banner />
      <DataByCounty />
      <News />
      <ContactForm />
    </div>
  );
};

export default Home;
