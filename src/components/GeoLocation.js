import React, { useContext, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import GeoLocationModal from './GeoLocationModal';
import { CountySelected } from '../contexts/CountySelected';

const SearchBar = () => {
  const { setSelectedCountyName } = useContext(CountySelected);
  const [modalShow, setModalShow] = useState(false);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      axios
        .get(
          `https://api-adresse.data.gouv.fr/reverse/?lon=${position.coords.longitude}&lat=${position.coords.latitude}`,
          {
            headers: {
              'Accept-Language': 'fr-FR',
            },
          }
        )
        .then((response) => {
          if (response.data.features.length !== 0) {
            setSelectedCountyName(
              response.data.features[0].properties.context
                .split(',')[1]
                .slice(1)
            );
          } else {
            setModalShow(true);
          }
        })

        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log('Error: ', err.message);
          }
        });
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
    <>
      <GeoLocationModal show={modalShow} onHide={() => setModalShow(false)} />
      <Button
        onClick={getLocation}
        variant="contained"
        className={useStyles().button}
        startIcon={<LocationOnIcon />}
      >
        Géolocalisez-moi
      </Button>
    </>
  );
};

export default SearchBar;
