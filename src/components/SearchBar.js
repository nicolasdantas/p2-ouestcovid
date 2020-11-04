import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import countyList from './countyList.json'; // data from https://geo.api.gouv.fr/departements

const SearchBar = (props) => {
  const [selectedCounty, setSelectedCounty] = useState('');

  useEffect(
    // eslint-disable-next-line no-shadow
    (props) => {
      if (selectedCounty) {
        const countyCode = countyList.find(
          (county) => county.nom === selectedCounty
        );
        const { onSelectCounty } = props;
        onSelectCounty(countyCode.code);
      }
    },
    [selectedCounty]
  );

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
