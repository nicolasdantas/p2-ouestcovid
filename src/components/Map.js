import React, { useState, useEffect, useContext, useMemo } from 'react';
import France from '@svg-maps/france.departments';
import { SVGMap } from 'react-svg-map';
import Select from 'react-select';
import './style/Map.scss';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import countyListPop from './datas/countyListPop.json';
import { CountySelected } from '../contexts/CountySelected';
import { APICovidByCountyRequest } from '../contexts/APICovidByCountyRequest';

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

const Map = () => {
  const { setSelectedCountyName } = useContext(CountySelected);
  const { allData } = useContext(APICovidByCountyRequest);
  const allDataDep = useMemo(
    () =>
      allData
        .filter((item) => item.code.includes('DEP'))
        .map((item) => {
          return {
            ...item,
            code: item.code.split('-')[1], // string format because of corsica
          };
        }),
    [allData]
  );

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

  // updating the value of customFrance, the data used to draw the map, depending on the choice made by the user in the select list
  useEffect(() => {
    if (allDataDep.length > 0 && colorSelection.value !== '') {
      let selection = '';
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
          const nb = allDataDep.find((item) => item.code === location.id)[
            selection
          ];
          const { pop } = countyListPop.find(
            (item) => item.code.toString() === location.id
          );
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
    } else if (allDataDep.length > 0 && colorSelection.value === '') {
      setCustomFrance(France);
    }
  }, [allDataDep, colorSelection]);

  // handling resizing
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  // handling county selection
  const handleClick = (event) => {
    const { id } = event.target; // this extra step is necessary because the name in location is used, and modified, for color mapping | it cannot be passed straight away as an argument
    const name = allDataDep.find((item) => item.code === id).nom;
    setSelectedCountyName(name);
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
        <p className="legend-title">Légende</p>
        <div className="legend-row">
          <p className="legend-legend">
            En cas pour 10E5 hab (décès, hosp) ou 10E6 (réa)
          </p>
          <div className="legend-colors">
            <div className="line">
              <div className="legend-color red" />
              <p className="legend-number">{'>'} 100</p>
            </div>
            <div className="line">
              <div className="legend-color orange" />
              <p className="legend-number">{'>'} 50</p>
            </div>
            <div className="line">
              <div className="legend-color yellow" />
              <p className="legend-number">{'>'} 25</p>
            </div>
            <div className="line">
              <div className="legend-color white" />
              <p className="legend-number">{'<'} 25</p>
            </div>
          </div>
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
      <p className="precision">
        Sélectionner les données à afficher par code couleur
      </p>
    </div>
  );
};

export default Map;
