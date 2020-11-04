import React, { useState, useEffect } from 'react';
import France from '@svg-maps/france.departments';
import { SVGMap } from 'react-svg-map';
import './Map.scss';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const Map = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  const handleClick = (event) => {
    props.onSelectCounty(event.target.id);
  };

  return (
    <div className="map none">
      {windowWidth < 600 ? (
        <TransformWrapper>
          <TransformComponent>
            <SVGMap map={France} onLocationClick={handleClick} />
          </TransformComponent>
        </TransformWrapper>
      ) : (
        <SVGMap map={France} onLocationClick={handleClick} />
      )}
    </div>
  );
};

export default Map;
