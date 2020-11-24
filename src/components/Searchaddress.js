/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Axios from 'axios';
import React, { useState, useRef } from 'react';

const SearchAddress = ({ setCurrentLocation, setZoomState }) => {
  const [address, setAddress] = useState({
    code: '',
    street: '',
    coordinates: [],
  });
  const [autocompleteList, setAutocomplete] = useState();
  const [showList, setShowList] = useState(false);
  const submitButton = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address && address.coordinates.length === 2) {
      setCurrentLocation(() => ({
        coords: {
          latitude: address.coordinates[1],
          longitude: address.coordinates[0],
        },
      }));
      setAddress({
        code: '',
        street: '',
        coordinates: [],
      });
      setZoomState(() => 14);
    } else {
      setCurrentLocation(() => false);
    }
  };

  return (
    <div className="search-section">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="code"
          id="code"
          value={address.code}
          required
          onChange={(e) => handlePostalCode(e.target.value)}
          onFocus={() => setShowList(false)}
        />
        <div className="autocomplete" style={{ width: '300px' }}>
          <input
            type="text"
            name="street"
            id="street"
            required
            value={address.street}
            onChange={(e) => handleStreetChange(e.target.value)}
            onFocus={() => setShowList(true)}
          />
          <div id="autocomplete-list" className="autocomplete-items">
            {autocompleteList &&
              showList &&
              autocompleteList.features.map((item) => {
                return (
                  <div
                    key={item.geometry.coordinates.join('-')}
                    onClick={(e) => {
                      submitButton.current.focus();
                      setShowList(false);
                      setAddress((prevValue) => ({
                        ...prevValue,
                        street: e.target.innerHTML,
                        coordinates: item.geometry.coordinates,
                      }));
                      setAutocomplete(null);
                    }}
                  >
                    {item.properties.name}
                  </div>
                );
              })}
          </div>
        </div>

        <input
          ref={submitButton}
          type="submit"
          value="Search"
          onFocus={() => setShowList(false)}
        />
      </form>
    </div>
  );
};

export default SearchAddress;
