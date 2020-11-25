import React from 'react';
import News from './News';
import DataByCounty from './DataByCounty';
import Graphic from './Graphic';
import Banner from './Banner';

const Home = () => {
  return (
    <div>
      <Banner />
      <DataByCounty />
      <Graphic />
      <News />
    </div>
  );
};

export default Home;
