import React, { useState, useEffect, useContext } from 'react';
import DataCard from './DataCard';
import countyList from './datas/countyList.json'; // data from https://geo.api.gouv.fr/departements
import Map from './Map';
import SearchBar from './SearchBar';
import './style/DataByCounty.scss';
import { APICovidByCountyRequest } from '../contexts/APICovidByCountyRequest';

const DataByCounty = () => {
  const [countyCode, setCountyCode] = useState('');
  const [selectedDataToday, setSelectedDataToday] = useState([]);
  const [source, setSource] = useState();

  const { allData } = useContext(APICovidByCountyRequest);

  useEffect(() => {
    if (countyCode !== '') {
      const countyName = countyList.find(
        (element) => element.code === countyCode
      ).nom; // getting the county name according to its code
      const selectedCountyDatas = allData.filter(
        (item) => item.nom === countyName
      )[0];
      setSelectedDataToday(selectedCountyDatas);
    }
  }, [countyCode, allData]);

  const handleCountyMap = (countyValue) => {
    // getting data from a child element and storing it in the state: get the selected county postal code (not the data)
    setCountyCode(countyValue);
    setSource('map');
  };

  const handleCountySearchBar = (countyValue) => {
    // getting data from a child element and storing it in the state: get the selected county postal code (not the data)
    setCountyCode(countyValue);
    setSource('searchbar');
  };

  return (
    <div className="dataByCounty">
      <h1 className="title">
        Choisissez un département pour connaître son état actuel
      </h1>
      <SearchBar
        onSelectCounty={handleCountySearchBar}
        source={source}
        countyCode={countyCode}
      />
      <div className="dataRow">
        <DataCard
          selectedDataToday={selectedDataToday}
          isCountySelected={countyCode}
        />
        <Map onSelectCounty={handleCountyMap} allData={allData} />
      </div>
    </div>
  );
};

export default DataByCounty;
