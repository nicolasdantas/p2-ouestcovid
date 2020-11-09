import React from 'react';
import TopFive from './TopFive';
import './style/WhereToGo.scss';

const WhereToGo = () => {
  return (
    <div className="where-to-go">
      <h1>Où partir ?</h1>
      <TopFive />
    </div>
  );
};

export default WhereToGo;
