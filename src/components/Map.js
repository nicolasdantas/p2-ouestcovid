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
  const [colorSelection, setColorSelection] = React.useState('');
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
    allData.length > 0 && colorSelection === 'rea' // on vérifie qu'on a reçu les données de l'API, et qu'on a selectionné le choix rea
      ? //proposition pour futur choix mutiple : remplacer le ===rea par !== "" et ensuite jouer sur le nb à considérer ? switch case, nb= ~.reanimation ou .hospitalisations etc selon la valeur de colorSelection ?
        {
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
            if (nbRea > 80) {
              return {
                ...location,
                name: `${location.name}-orange`,
              };
            }
            if (nbRea > 30) {
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
        <label htmlFor="color-option">
          <select
            id="color-option"
            name="color-option"
            onChange={(e) => setColorSelection(e.target.value)}
            value={colorSelection}
          >
            <option value="">-Choix des données-</option>
            <option value="rea">Personnes en réanimation</option>
          </select>
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
