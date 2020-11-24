/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Axios from 'axios';
import React, { useState } from 'react';
// import Autocomplete from 'react-google-autocomplete';

const SearchAddress = ({ setCurrentLocation, setZoomState }) => {
  const [address, setAddress] = useState({
    code: '',
    street: '',
    coordinates: [],
  });
  const [autocompleteList, setAutocomplete] = useState();

  const handlePostalCode = (value) => {
    setAddress((prevValue) => ({ ...prevValue, code: value }));
  };

  const handleStreetChange = (input) => {
    setAddress((prevValue) => ({ ...prevValue, street: input }));
    if (input.length > 5) {
      Axios.get(
        `https://api-adresse.data.gouv.fr/search/?q=${input
          .split(' ')
          .join('+')}&postcode=${address.code}`
      )
        .then((response) => response.data)
        .then((data) => setAutocomplete(data));
    }
  };

  return (
    <div className="search-section">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCurrentLocation(() => ({
            coords: {
              latitude: address.coordinates[1],
              longitude: address.coordinates[0],
            },
          }));
          setZoomState(() => 14);
          console.log({
            coords: {
              latitude: address.coordinates[0],
              longitude: address.coordinates[1],
            },
          });
        }}
      >
        <input
          type="text"
          name="code"
          id="code"
          required
          onChange={(e) => handlePostalCode(e.target.value)}
        />
        <div className="autocomplete" style={{ width: '300px' }}>
          <input
            type="text"
            name="street"
            id="street"
            required
            value={address.street}
            onChange={(e) => handleStreetChange(e.target.value)}
          />
          <div id="autocomplete-list" className="autocomplete-items">
            {autocompleteList &&
              autocompleteList.features.map((item) => {
                return (
                  <div
                    key={item.geometry.coordinates.join('-')}
                    onClick={(e) =>
                      setAddress((prevValue) => ({
                        ...prevValue,
                        street: e.target.innerHTML,
                        coordinates: item.geometry.coordinates,
                      }))
                    }
                  >
                    {item.properties.name}
                  </div>
                );
              })}
          </div>
        </div>

        <input type="submit" value="Search" />
      </form>
    </div>
  );

  //   return (
  //     <Autocomplete
  //       style={{
  //         width: '100%',
  //         height: '40px',
  //         paddingLeft: '16px',
  //         marginTop: '2px',
  //         marginBottom: '100px',
  //       }}
  //       onPlaceSelected={onPlaceSelected}
  //       types={['(regions)']}
  //     />
  //   );
};

export default SearchAddress;
