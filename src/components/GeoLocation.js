import React, { useContext } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { CountySelected } from '../contexts/CountySelected';

const SearchBar = () => {
  const { setSelectedCountyName } = useContext(CountySelected);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const source = axios.CancelToken.source();
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude.toString()},${position.coords.longitude.toString()}&key=AIzaSyD9QyjcXrlW8JUHmsDjH2n2ttF-bPLyYjc`,
          {
            cancelToken: source.token,
          }
        )
        .then((response) =>
          setSelectedCountyName(
            response.data.results[9].address_components[0].long_name
          )
        )
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
        outline:'none',
      },
    },
  }));

  return (
    <Button
      onClick={getLocation}
      variant="contained"
      className={useStyles().button}
      startIcon={<LocationOnIcon />}
    >
      Géolocalisez-moi
    </Button>
  );
};

export default SearchBar;
