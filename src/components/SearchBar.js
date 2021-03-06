import React, { useContext } from 'react';
import Select from 'react-select';
import countyList from './datas/countyList.json'; // data from https://geo.api.gouv.fr/departements
import { CountySelected } from '../contexts/CountySelected';

const SearchBar = () => {
  const { selectedCountyName, setSelectedCountyName } = useContext(
    CountySelected
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
        setSelectedCountyName(newValue);
      }}
      styles={customStyles}
      placeholder="Recherchez un département"
      noOptionsMessage={() => 'Aucun département trouvé'}
      value={selectedCountyName.split()}
    />
  );
};

export default SearchBar;
