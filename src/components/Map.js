import React from 'react';
import France from '@svg-maps/france.departments';
import { SVGMap } from 'react-svg-map';
import './Map.scss';

class Map extends React.Component {
  handleClick = (event) => {
    this.props.onSelectCounty(event.target.id);
  };

  render() {
    return (
      <div className="map none">
        <SVGMap map={France} onLocationClick={this.handleClick} />
        <p className="dom">
          Pour les DOM-TOM, les données sont accessibles via le champ de
          recherche
        </p>
      </div>
    );
  }
}

export default Map;
