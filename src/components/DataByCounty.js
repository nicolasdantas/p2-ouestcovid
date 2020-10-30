import React from 'react';
import axios from 'axios';
import moment from 'moment';
import SearchBar from './SearchBar';
import DataCard from './DataCard';
import countyList from './countyList.json'; // data from https://geo.api.gouv.fr/departements
import Map from './Map';
import './DataByCounty.scss';

class DataByCounty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // initializing the state at null
      countyCode: '', // code postal département sélectionné
      selectedDataToday: '', // données du dep sélectionné
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.countyCode !== this.state.countyCode) {
      this.getCovidData(this.state.countyCode);
    }
  }

  handleCounty = (countyValue) => {
    // getting data from a child element and storing it in the state: get the selected county postal code (not the data)
    this.setState({ countyCode: countyValue });
  };

  getCovidData = (countyCode) => {
    const countyName = countyList.find((element) => element.code === countyCode)
      .nom; // getting the county name according to its code
    const dayMinus1 = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const dayMinus2 = moment().subtract(2, 'days').format('YYYY-MM-DD');
    // const dayMinus3 = moment().subtract(3, 'days').format('YYYY-MM-DD');

    axios
      .get(
        `https://coronavirusapi-france.now.sh/AllDataByDate?date=${dayMinus1}`
      )
      .then((response) => response.data)
      .then((data) => {
        const dataArray = data.allFranceDataByDate;
        const filteredArray = dataArray.filter(
          (item) => item.nom === countyName
        );
        if (!Object.values(filteredArray[0]).includes(null)) {
          this.setState({
            selectedDataToday: filteredArray[0],
          });
        } else {
          axios
            .get(
              `https://coronavirusapi-france.now.sh/AllDataByDate?date=${dayMinus2}`
            )
            .then((response) => response.data)
            .then((data2) => {
              const dataArray2 = data2.allFranceDataByDate;
              const filteredArray2 = dataArray2.filter(
                (item) => item.nom === countyName
              );
              if (!Object.values(filteredArray2[0]).includes(null)) {
                this.setState({
                  selectedDataToday: filteredArray2[0],
                });
              }
            });
        }
      });
  };

  render() {
    return (
      <div className="dataByCounty">
        <SearchBar onSelectCounty={this.handleCounty} />
        <div className="dataRow">
          {this.state.selectedDataToday && (
            <DataCard selectedDataToday={this.state.selectedDataToday} />
          )}
          <Map onSelectCounty={this.handleCounty} />
        </div>
      </div>
    );
  }
}

export default DataByCounty;
