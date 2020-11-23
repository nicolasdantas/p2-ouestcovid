/* eslint-disable global-require */
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import Leaflet from 'leaflet';
import './style/Radius.scss';
import 'leaflet/dist/leaflet.css';

Leaflet.Icon.Default.imagePath = '../node_modules/leaflet';

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const fillBlueOptions = { fillColor: 'blue' };

const Radius = () => {
  return (
    <div id="mapid">
      Map
      <MapContainer
        center={[51.505, -0.09]}
        zoom={16}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '400px' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Circle
          center={[51.505, -0.09]}
          pathOptions={fillBlueOptions}
          radius={200}
        >
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Circle>
      </MapContainer>
    </div>
  );
};

export default Radius;
