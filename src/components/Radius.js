/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable global-require */
import React, { useState } from 'react';
import axios from 'axios';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from 'react-leaflet';
import Leaflet from 'leaflet';
import SearchAddress from './Searchaddress';
import './style/Radius.scss';
import 'leaflet/dist/leaflet.css';

// eslint-disable-next-line no-underscore-dangle
delete Leaflet.Icon.Default.prototype._getIconUrl;
Leaflet.Icon.Default.imagePath = '../node_modules/leaflet';

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const fillBlueOptions = { fillColor: 'blue' };

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const Radius = () => {
  const [currentLocation, setCurrentLocation] = useState();
  const [address, setAddress] = useState({
    code: '',
    street: '',
    coordinates: [],
  });
  const [zoomState, setZoomState] = useState(5);

  const setLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation(position);
      axios
        .get(
          `https://api-adresse.data.gouv.fr/reverse/?lon=${position.coords.longitude}&lat=${position.coords.latitude}`,
          {
            headers: {
              'Accept-Language': 'fr-FR',
            },
          }
        )
        .then((response) => response.data)
        .then((data) => {
          setAddress(() => ({
            code: data.features[0].properties.postcode,
            street: data.features[0].properties.name,
            coordinates: data.features[0].geometry.coordinates,
          }));
        });
      setZoomState(() => 10);
    });
  };

  return (
    <div id="mapid">
      <h2>Où sortir ?</h2>
      <p>Affichez un rayon de 20km autour de chez vous</p>
      <div className="button-container">
        <SearchAddress
          setCurrentLocation={setCurrentLocation}
          setZoomState={setZoomState}
          address={address}
          setAddress={setAddress}
        />
        <div onClick={setLocation} className="button-geoloc">
          Géolocalisez-moi
        </div>
      </div>
      {currentLocation &&
      currentLocation.coords &&
      currentLocation.coords.latitude !== '' &&
      currentLocation.coords.longitude !== '' ? (
        <MapContainer
          center={[
            currentLocation.coords.latitude,
            currentLocation.coords.longitude,
          ]}
          zoom={zoomState}
          scrollWheelZoom={false}
          style={{ width: '100%', height: '400px', zIndex: '0' }}
        >
          <ChangeView
            zoom={zoomState}
            center={[
              currentLocation.coords.latitude,
              currentLocation.coords.longitude,
            ]}
          />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Circle
            center={[
              currentLocation.coords.latitude,
              currentLocation.coords.longitude,
            ]}
            pathOptions={fillBlueOptions}
            radius={20000}
          >
            <Marker
              position={[
                currentLocation.coords.latitude,
                currentLocation.coords.longitude,
              ]}
            >
              <Popup>Votre position actuelle</Popup>
            </Marker>
          </Circle>
        </MapContainer>
      ) : (
        <MapContainer
          center={[46.45, 2.25]}
          zoom={zoomState}
          scrollWheelZoom={false}
          style={{ width: '100%', height: '400px', zIndex: '0' }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[46.45, 2.25]}>
            <Popup>
              Cliquez sur "Géolocalisez-moi" <br /> ou entrez une adresse
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default Radius;
