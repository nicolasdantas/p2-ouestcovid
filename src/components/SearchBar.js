import React, { useContext, useEffect } from 'react';
import Select from 'react-select';
import Geocode from 'react-geocode';
import countyList from './datas/countyList.json'; // data from https://geo.api.gouv.fr/departements
import { CountySelected } from '../contexts/CountySelected';

Geocode.setLanguage('fr');
Geocode.setRegion('fr');
Geocode.setApiKey('AIzaSyD9QyjcXrlW8JUHmsDjH2n2ttF-bPLyYjc');

const SearchBar = () => {
  useEffect(() => {
    Geocode.fromLatLng('48.8583701', '2.2922926').then(
      (response) => {
        const address = response.results[0].formatted_address;
        console.log(address);
      },
      (error) => {
        console.error(error);
      }
    );
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);
    });
  }, []);

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
