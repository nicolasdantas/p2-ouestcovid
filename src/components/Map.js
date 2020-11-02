import React from 'react';
import France from '@svg-maps/france.departments';
import { SVGMap } from 'react-svg-map';
import './Map.scss';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { windowWidth: window.innerWidth };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  handleClick = (event) => {
    this.props.onSelectCounty(event.target.id);
  };

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth });
    console.log(this.state.windowWidth);
  };

  render() {
    return (
      <div className="map none">
        {this.state.windowWidth < 600 ? (
          <TransformWrapper>
            <TransformComponent>
              <SVGMap map={France} onLocationClick={this.handleClick} />
            </TransformComponent>
          </TransformWrapper>
        ) : (
          <SVGMap map={France} onLocationClick={this.handleClick} />
        )}
        <p className="dom">
          Pour les DOM-TOM, les données sont accessibles via le champ de
          recherche
        </p>
      </div>
    );
  }
}

export default Map;
