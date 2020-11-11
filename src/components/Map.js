import React, { useState, useEffect } from 'react';
import France from '@svg-maps/france.departments';
import { SVGMap } from 'react-svg-map';
import axios from 'axios';
import moment from 'moment';
import './style/Map.scss';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
// import { red } from '@material-ui/core/colors';

const Map = (props) => {
  const [allData, setData] = React.useState([]);
  const [checkboxRea, setCheckboxRea] = React.useState(false);
  const dayMinus1 = moment().subtract(1, 'days').format('YYYY-MM-DD'); // last available data

  React.useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();
    axios
      .get(
        `https://coronavirusapi-france.now.sh/AllDataByDate?date=${dayMinus1}`,
        {
          cancelToken: source.token,
        }
      )
      .then((response) => response.data)
      .then((data) => {
        setData(() =>
          /* getting the data from API, comparing it to countyList.json based on county code and adding for each county the number of beds in reanimation */
          data.allFranceDataByDate.filter((item) => item.code.includes('DEP'))
        );
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
        }
      }); // eslint-disable-next-line
    return function cleanup() {
      // cancels the previous request on unmount or query update :
      source.cancel('Operation canceled by the user.');
    }; // eslint-disable-next-line
  }, []);

  const customFrance =
    allData.length > 0 && checkboxRea === true // on vérifie qu'on a reçu les données de l'API, et que la box est check (celle "afficher un gradient de couleur" etc)
      ? {
          ...France,
          label: 'Custom map label',
          locations: France.locations.map((location) => {
            // Modify each location
            const nbRea = allData.find(
              (item) => item.code.split('-')[1] === location.id
            ).reanimation;

            if (nbRea > 250) {
              return {
                ...location,
                name: `${location.name}-red`,
              };
            }
            if (nbRea > 100) {
              return {
                ...location,
                name: `${location.name}-orange`,
              };
            }
            if (nbRea > 50) {
              return {
                ...location,
                name: `${location.name}-yellow`,
              };
            }
            return {
              ...location,
              name: `${location.name}-white`,
            };
          }),
        }
      : France;

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
      <div>
        <label htmlFor="sort-color">
          Afficher un gradient de couleur selon le nombre de personnes en réa
          <input
            type="checkbox"
            id="sort-color"
            name="sort-color"
            onChange={() => setCheckboxRea((prevState) => !prevState)}
            checked={checkboxRea}
          />
        </label>
      </div>
      {windowWidth < 600 ? (
        <TransformWrapper>
          <TransformComponent>
            <SVGMap map={customFrance} onLocationClick={handleClick} />
          </TransformComponent>
        </TransformWrapper>
      ) : (
        <SVGMap map={customFrance} onLocationClick={handleClick} />
      )}
    </div>
  );
};

export default Map;
