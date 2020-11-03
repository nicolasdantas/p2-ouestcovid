import React from 'react';
import Select from 'react-select';
import countyList from './countyList.json'; // data from https://geo.api.gouv.fr/departements

const SearchBar = (props) => {
  const handleCountySelection = (newValue) => {
    const countyName = newValue;
    console.log(newValue);
    if (countyName) {
      const countyCode = countyList.find((county) => county.nom === countyName);
      const { onSelectCounty } = props;
      onSelectCounty(countyCode.code);
    }
  };

  return (
    <Select
      options={countyList.map((county) => county.nom)}
      getOptionLabel={(option) => `${option}`}
      onChange={(newValue) => handleCountySelection(newValue)}
    />
  );
};

export default SearchBar;
