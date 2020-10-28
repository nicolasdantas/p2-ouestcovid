import React from 'react';
import France from '@svg-maps/france.departments';
import { SVGMap } from 'react-svg-map';
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
      clickedLocationId: event.target.id,
    });
    this.props.onSelectCounty(event.target.id);
  };

  render() {
    const { dataCounty } = this.state;
    return (
      <div>
        <SVGMap map={France} onLocationClick={this.handleClick} />
      </div>
    );
  }
}

export default Map;
