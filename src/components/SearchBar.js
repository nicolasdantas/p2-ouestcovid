import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import countyList from './countyList.json'; // data from https://geo.api.gouv.fr/departements

const SearchBar = (props) => {
  const [selectedCounty, setSelectedCounty] = useState('');

  const onSelectCounty = useCallback(props.onSelectCounty);

  useEffect(() => {
    if (selectedCounty) {
      const countyCode = countyList.find(
        (county) => county.nom === selectedCounty
      );
      onSelectCounty(countyCode.code);
    }
  }, [selectedCounty, onSelectCounty]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '300px',
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      color: 'black',
    }),
  };

  return (
    <Select
      options={countyList.map((county) => county.nom)}
      getOptionLabel={(option) => `${option}`}
      onChange={(newValue) => {
        setSelectedCounty(newValue);
      }}
      styles={customStyles}
      placeholder="Recherchez un département"
      noOptionsMessage={() => 'Aucun département trouvé'}
      value={props.source === 'map' ? '' : selectedCounty.split()}
    />
  );
};

export default SearchBar;
