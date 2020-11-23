import React from 'react';
import TopFive from './TopFive';
import Radius from './Radius';
import './style/WhereToGo.scss';

const WhereToGo = () => {
  return (
    <div className="where-to-go">
      <Radius />
      <h1>Où partir ?</h1>
      <TopFive />
    </div>
  );
};

export default WhereToGo;
