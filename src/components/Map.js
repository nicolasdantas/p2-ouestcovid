import React from 'react';
import France from '@svg-maps/france.departments';
import { SVGMap } from 'react-svg-map';
import './Map.scss';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedLocationName: null,
      clickedLocationId: null,
    };
  }

  handleClick = (event) => {
    this.setState({
      clickedLocationName: event.target.attributes.name.value,
      clickedLocationId: event.target.id,
    });
    console.log(this.state.clickedLocationName, this.state.clickedLocationId);
  };

  render() {
    return <SVGMap map={France} onLocationClick={this.handleClick} />;
  }
}

export default Map;
