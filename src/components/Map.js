import React from 'react';
import France from '@svg-maps/france.departments';
import { SVGMap } from 'react-svg-map';
import axios from 'axios';
import './Map.scss';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedLocationName: 'aucun',
      clickedLocationId: '',
      dataCounty: [],
      dataCountyLoaded: false,
    };
  }

  handleClick = (event) => {
    this.setState({
      clickedLocationName: event.target.attributes.name.value,
    });

    axios
      .get(
        event.target.attributes.name.value === 'Ville de Paris'
          ? `https://coronavirusapi-france.now.sh/LiveDataByDepartement?Departement=Paris`
          : `https://coronavirusapi-france.now.sh/LiveDataByDepartement?Departement=${event.target.attributes.name.value}`
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          dataCounty: data.LiveDataByDepartement[0],
          dataCountyLoaded: true,
        });
      });
  };

  render() {
    const { dataCounty } = this.state;
    console.log(dataCounty);
    return (
      <div>
        <SVGMap map={France} onLocationClick={this.handleClick} />
        {/* {this.state.dataCountyLoaded ? (
          <div>
            <p>
              Situation sanitaire dans le {dataCounty.nom} au {dataCounty.date}
            </p>
            <p>Hospitalisés : {dataCounty.hospitalises}</p>
            <p>Décès : {dataCounty.deces}</p>
            <p>Guéris : {dataCounty.gueris}</p>
          </div>
        ) : (
          <p>false</p>
        )} */}
      </div>
    );
  }
}

export default Map;
