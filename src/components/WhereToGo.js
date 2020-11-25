import React from 'react';
import TopFive from './TopFive';
import Radius from './Radius';
import './style/WhereToGo.scss';

const WhereToGo = () => {
  return (
    <div className="where-to-go">
      <h2>Où sortir ?</h2>
      <Radius />
      <h2>Où partir ?</h2>
      <TopFive />
    </div>
  );
};

export default WhereToGo;
