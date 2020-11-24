/* eslint-disable global-require */
import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from 'react-leaflet';
import Leaflet from 'leaflet';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
// import GeoLocationModal from './GeoLocationModal';
import SearchAddress from './Autocomplete';
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
  const [zoomState, setZoomState] = useState(5);

  const setLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation(position);
      setZoomState(() => 14);
    });
  };

  const useStyles = makeStyles(() => ({
    button: {
      backgroundColor: '#2d414d',
      color: 'white',
      textTransform: 'none',
      '&$button:hover': {
        backgroundColor: '#2d414d',
      },
      '&$button:focus': {
        outline: 'none',
      },
    },
  }));

  return (
    <div id="mapid">
      <SearchAddress
        setCurrentLocation={setCurrentLocation}
        setZoomState={setZoomState}
      />
      <div className="button-container">
        <Button
          onClick={setLocation}
          variant="contained"
          className={useStyles().button}
          startIcon={<LocationOnIcon />}
        >
          Géolocalisez-moi
        </Button>
      </div>
      {currentLocation ? (
        <MapContainer
          center={[
            currentLocation.coords.latitude,
            currentLocation.coords.longitude,
          ]}
          zoom={zoomState}
          scrollWheelZoom={false}
          style={{ width: '100%', height: '400px' }}
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
            radius={1000}
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
          style={{ width: '100%', height: '400px' }}
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
