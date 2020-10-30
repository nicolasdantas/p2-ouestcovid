import React from 'react';
import Carousel from './Carousel';
import DataByCounty from './DataByCounty';

const Home = () => {
  return (
    <div>
      <DataByCounty />;
      <Carousel />
    </div>
  );
};

export default Home;
