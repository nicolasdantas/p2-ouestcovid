import React from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import DataCard from '../DataCard';
import countyList from '../countyList.json'; //data from https://geo.api.gouv.fr/departements

class SearchSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //initializing the state at null
      countyCode: null,
      selectedDataToday: null,
    };
  }

  handleCounty = (countyValue) => {
    //getting data from a child element and storing it in the state
    this.setState({ countyCode: countyValue });
  };

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

  componentDidUpdate = () => {
    this.getCovidData(this.state.countyCode);
  };

  render() {
    return (
      <div>
        <SearchBar onSelectCounty={this.handleCounty} />
        {this.state.selectedDataToday && (
          <DataCard selectedDataToday={this.state.selectedDataToday} />
        )}
      </div>
    );
  }
}

export default SearchSection;
