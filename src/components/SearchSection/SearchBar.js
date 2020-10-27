import React from 'react';
import axios from 'axios';
import DataCard from '../DataCard';
import countyList from '../countyList.json'; //data from https://geo.api.gouv.fr/departements

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDataToday: null,
    };
  }

  getCovidData = (countyCode) => {
    let countyName = countyList.find((element) => element.code === countyCode)
      .nom;
    //ici, gérer les cas d'erreur, si les données sont nulles notamment
    let url = `https://coronavirusapi-france.now.sh/LiveDataByDepartement?Departement=${countyName}`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) =>
        this.setState({
          selectedDataToday: data.LiveDataByDepartement[0],
        })
      );
  };

  handleCountySelection = (event) => {
    let countyCode = event.target.value;
    this.getCovidData(countyCode);
  };

  render() {
    const selectedDataToday = this.state.selectedDataToday;
    return (
      <div>
        <p>Sélectionnez un département</p>
        <select
          name='counties'
          id='county-select'
          onChange={this.handleCountySelection}
        >
          <option value=''>--Merci de choisir une option--</option>
          {countyList.map((county) => (
            <option key={county.code} value={county.code}>
              {county.code} - {county.nom}
            </option>
          ))}
        </select>
        <p className='description'>
          Sélectionnez un département pour voir le détail des derniers chiffres
          de l'épidémie
        </p>

        <DataCard selectedDataToday={this.state.selectedDataToday} />
      </div>
    );
  }
}

export default SearchBar;
