import React from 'react';
import DataCard from './DataCard';
import Map from './Map';
import SearchBar from './SearchBar';
import './style/DataByCounty.scss';

const DataByCounty = () => {
  return (
    <div className="dataByCounty">
      <h1 className="title">
        Choisissez un département pour connaître son état actuel
      </h1>
      <SearchBar />
      <div className="dataRow">
        <DataCard />
        <Map />
      </div>
    </div>
  );
};

export default DataByCounty;
