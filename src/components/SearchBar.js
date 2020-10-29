import React from 'react';
// import axios from 'axios';
// import DataCard from '../DataCard';
import countyList from './countyList.json'; // data from https://geo.api.gouv.fr/departements

class SearchBar extends React.Component {
  handleCountySelection = (event) => {
    const countyCode = event.target.value;
    const { onSelectCounty } = this.props;
    onSelectCounty(countyCode);
  };

  render() {
    return (
      <div className="searchBar">
        <div className="select-wrapper">
          <p>Sélectionnez un département</p>
          <div className="custom-select">
            <select
              name="counties"
              id="county-select"
              onChange={this.handleCountySelection}
            >
              <option value="">--Merci de choisir une option--</option>
              {countyList.map((county) => (
                <option key={county.code} value={county.code}>
                  {county.code}-{county.nom}
                </option>
              ))}
            </select>
          </div>
          <p className="description">
            Sélectionnez un département pour voir le détail des derniers
            chiffres de l'épidémie
          </p>
        </div>
      </div>
    );
  }
}

export default SearchBar;
