/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Axios from 'axios';
import React, { useState, useRef } from 'react';

const SearchAddress = ({
  setCurrentLocation,
  setZoomState,
  address,
  setAddress,
}) => {
  const [autocompleteList, setAutocomplete] = useState();
  const [showList, setShowList] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const submitButton = useRef(null);
  const codeInput = useRef(null);
  const reg = new RegExp(/[0-9]{5}/, 'g');

  const handlePostalCode = (value) => {
    setEnableSubmit(false);
    setAddress((prevValue) => ({ ...prevValue, code: value }));
  };

  const handleStreetChange = (input) => {
    setEnableSubmit(false);
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
      // setAddress({
      //   code: '',
      //   street: '',
      //   coordinates: [],
      // });
      setZoomState(() => 10);
    } else {
      setCurrentLocation(() => false);
      setZoomState(() => 5);
    }
  };

  const checkPostalCode = () => {
    if (!reg.test(codeInput.current.value)) {
      setAddress((prevValue) => ({
        ...prevValue,
        code: '',
      }));
      codeInput.current.setAttribute('placeholder', 'Mauvais format');
    }
  };

  return (
    <div className="search-section">
      <form onSubmit={handleSubmit}>
        <label className="label-code" htmlFor="code">
          {' '}
          Code postal
          <input
            type="text"
            name="code"
            id="code"
            ref={codeInput}
            value={address.code}
            required
            onChange={(e) => handlePostalCode(e.target.value)}
            onFocus={() => setShowList(false)}
          />
        </label>
        <div className="autocomplete">
          <label htmlFor="street">
            {' '}
            Adresse (rue, avenue...)
            <input
              type="text"
              name="street"
              id="street"
              title="Entrez un code postal valide pour pouvoir entrer une adresse"
              disabled={address.code === ''}
              required
              value={address.street}
              onChange={(e) => handleStreetChange(e.target.value)}
              onFocus={() => {
                setShowList(true);
                checkPostalCode();
              }}
            />
          </label>
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
                      setEnableSubmit(true);
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
          value="Valider"
          disabled={!enableSubmit}
          title="Sélectionnez une adresse dans la liste pour pouvoir valider"
          onFocus={() => setShowList(false)}
        />
      </form>
    </div>
  );
};

export default SearchAddress;
