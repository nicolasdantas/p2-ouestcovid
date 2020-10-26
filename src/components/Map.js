import React from 'react';
import France from '@svg-maps/france.departments';
import { SVGMap } from 'react-svg-map';
import './Map.scss';

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <SVGMap map={France} />;
  }
}

export default Map;
