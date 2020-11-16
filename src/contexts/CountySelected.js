import React, { createContext, useState, useContext } from 'react';
import countyList from '../components/datas/countyList.json'; // data from https://geo.api.gouv.fr/departements
import { APICovidByCountyRequest } from './APICovidByCountyRequest';

export const CountySelected = createContext();

export default function CountySelectedProvider({ children }) {
  const { allData } = useContext(APICovidByCountyRequest);
  const [selectedCountyName, setSelectedCountyName] = useState('');
  let selectedCountyDatas;
  let selectedCountyCode;
  if (selectedCountyName) {
    selectedCountyCode = countyList.find(
      (county) => county.nom === selectedCountyName
    ).code;
    if (allData) {
      // eslint-disable-next-line prefer-destructuring
      selectedCountyDatas = allData.filter(
        (item) => item.nom === selectedCountyName
      )[0];
    }
  }

  return (
    <CountySelected.Provider
      value={{
        selectedCountyName,
        selectedCountyCode,
        setSelectedCountyName,
        selectedCountyDatas,
      }}
    >
      {children}
    </CountySelected.Provider>
  );
}
