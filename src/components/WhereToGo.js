import React from 'react';
import TopFive from './TopFive';

import './style/WhereToGo.scss';

const WhereToGo = () => {
  return (
    <div className="where-to-go">
      <h2>Où partir ?</h2>
      <TopFive />
    </div>
  );
};

export default WhereToGo;
