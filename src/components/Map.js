import React, { useState, useEffect } from 'react';
import France from '@svg-maps/france.departments';
import { SVGMap } from 'react-svg-map';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import './style/Map.scss';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import countyListPop from './datas/countyListPop.json';

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: '250px',
    fontSize: '14px',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
  option: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    color: 'black',
    fontSize: '14px',
  }),
};

const Map = (props) => {
  // API data are passed in props but not used
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [allData, setData] = useState([]);
  const [colorSelection, setColorSelection] = useState({
    value: '',
    label: '- Aucun code couleur -',
  });
  const [customFrance, setCustomFrance] = useState(France);
  const options = [
    { value: '', label: '- Aucun code couleur -' },
    { value: 'rea', label: 'Personnes en réanimation' },
    { value: 'dead', label: 'Décès (cumulés)' },
    { value: 'hosp', label: 'Personnes hospitalisées' },
  ];

  // this API request is redundant and should be moved in another component, probably in a context
  useEffect(() => {
    const dayMinus1 = moment().subtract(1, 'days').format('YYYY-MM-DD'); // last available data
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
          // keeping only counties, not regions and not the whole country
          data.allFranceDataByDate
            .filter((item) => item.code.includes('DEP'))
            .map((item) => {
              return {
                ...item,
                code: item.code.split('-')[1], // string format because of corsica
              };
            })
        );
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
        }
      });
    return function cleanup() {
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  // updating the value of customFrance, the data used to draw the map, depending on the choice made by the user in the select list
  useEffect(() => {
    if (allData.length > 0 && colorSelection.value !== '') {
      let selection = ''; // here we could add a "threshold" array, with limits depending on the case, and it would be called later on instead of fixed values, arr[0] etc etc
      // still have to take care of the hole "inhabitants per region" and ratio thing
      let multiplier;
      switch (colorSelection.value) {
        case 'rea':
          selection = 'reanimation';
          multiplier = 1000000;
          break;
        case 'dead':
          selection = 'deces';
          multiplier = 100000;
          break;
        case 'hosp':
          selection = 'hospitalises';
          multiplier = 100000;
          break;
        default:
          console.log(
            `Problem setting the selected data for the gradient (map)`
          );
      }
      setCustomFrance({
        ...France,
        label: 'Custom map label',
        locations: France.locations.map((location) => {
          const nb = allData.find((item) => item.code === location.id)[
            selection
          ];
          const pop = countyListPop.find(
            (item) => item.code.toString() === location.id
          ).pop;
          const ratio = Math.round((nb / pop) * multiplier);

          if (ratio > 100) {
            return {
              ...location,
              name: `${location.name}-red`,
            };
          }
          if (ratio > 50) {
            return {
              ...location,
              name: `${location.name}-orange`,
            };
          }
          if (ratio > 25) {
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
      });
    } else if (allData.length > 0 && colorSelection.value === '') {
      setCustomFrance(France);
    }
  }, [allData, colorSelection]);

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
            <SVGMap map={customFrance} onLocationClick={handleClick} />
          </TransformComponent>
        </TransformWrapper>
      ) : (
        <SVGMap map={customFrance} onLocationClick={handleClick} />
      )}
      <div className="legend">
        <p>Légende</p>
        <p>En cas pour 10E5 hab (décès, hosp) ou 10E6 (réa)</p>
        <div className="line">
          <div className="legend-color red"></div>
          <p>{'>'} 100</p>
        </div>
        <div className="line">
          <div className="legend-color orange"></div>
          <p>{'>'} 50</p>
        </div>
        <div className="line">
          <div className="legend-color yellow"></div>
          <p>{'>'} 25</p>
        </div>
        <div className="line">
          <div className="legend-color white"></div>
          <p>{'<'} 25</p>
        </div>
      </div>
      <div>
        <Select
          options={options}
          getOptionLabel={(option) => option.label}
          onChange={(newValue) => setColorSelection(newValue)}
          styles={customStyles}
          noOptionsMessage={() => 'Aucun département trouvé'}
          value={colorSelection}
        />
      </div>
      <p>Sélectionner les données à afficher par code couleur</p>
    </div>
  );
};

export default Map;
