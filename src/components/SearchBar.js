import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import countyList from './countyList.json'; // data from https://geo.api.gouv.fr/departements

class SearchBar extends React.Component {
  handleCountySelection = (newValue) => {
    const countyName = newValue;
    if (countyName) {
      const countyCode = countyList.find((county) => county.nom === countyName);
      const { onSelectCounty } = this.props;
      onSelectCounty(countyCode.code);
    }
  };

  render() {
    return (
      <Autocomplete
        onChange={(event, newValue) => this.handleCountySelection(newValue)}
        id="custom-input-demo"
        options={countyList.map((county) => county.nom)}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input style={{ width: 200 }} type="text" {...params.inputProps} />
          </div>
        )}
      />
    );
  }
}

export default SearchBar;
