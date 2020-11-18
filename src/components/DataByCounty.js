import React from 'react';
import DataCard from './DataCard';
import Map from './Map';
import SearchBar from './SearchBar';
import './style/DataByCounty.scss';
import GeoLocation from './GeoLocation';

const DataByCounty = () => {
  return (
    <div className="dataByCounty">
      <h1 className="title">
        Choisissez un département pour connaître son état actuel
      </h1>
      <div className="searchbar-geoloc">
        <div className="searchbar">
          <SearchBar />
        </div>
        <div className="geoloc">
          <GeoLocation />
        </div>
      </div>
      <div className="dataRow">
        <DataCard />
        <Map />
      </div>
    </div>
  );
};

export default DataByCounty;
