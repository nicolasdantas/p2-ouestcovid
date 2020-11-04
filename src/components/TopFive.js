import React from 'react';
import moment from 'moment';
import axios from 'axios';
// import { Default } from 'react-spinners-css';
import TopFiveCard from './TopFiveCard';
import countyList from './countyList.json';
import './TopFive.scss';

function TopFive() {
  const [dataAPI, setDataAPI] = React.useState([]);
  const [dataTopFive, setDataTopFive] = React.useState([]);
  const dayMinus1 = moment().subtract(1, 'days').format('YYYY-MM-DD'); // last available data

  React.useEffect(() => {
    axios
      .get(
        `https://coronavirusapi-france.now.sh/AllDataByDate?date=${dayMinus1}`
      )
      .then((response) => response.data)
      .then((data) => {
        setDataAPI(() =>
          /* getting the data from API, comparing it to countyList.json based on county code and adding for each county the number of beds in reanimation */
          data.allFranceDataByDate
            .filter((item) => item.code.includes('DEP'))
            .map((item) => ({ ...item, code: item.code.split('-')[1] }))
            .map((item) => ({
              ...item,
              lits: countyList.find((county) => county.code === item.code).lits,
            }))
            .map((item) => ({
              ...item,
              ratio: Math.round((item.reanimation / +item.lits) * 100),
            }))
        );
      }); // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    setDataTopFive(() =>
      dataAPI.sort((a, b) => (a.ratio >= b.ratio ? 1 : -1)).slice(0, 5)
    );
  }, [dataAPI]);

  return (
    <div className="top-five">
      <h2>Top 5 des départements les plus sûrs</h2>
      <p className="situation">
        Situation le {moment(dayMinus1).format('DD/MM/YYYY')}
      </p>
      {dataTopFive.length > 0 ? (
        dataTopFive.map((county, index) => (
          <TopFiveCard key={county.code} county={county} index={index + 1} />
        ))
      ) : (
        <div className="spinner">Loading...</div>
      )}
      <p className="sources">
        Sources :{' '}
        <a
          href="https://github.com/florianzemma/CoronavirusAPI-France/blob/master/README.md"
          target="_blank"
        >
          CoronavirusAPI
        </a>{' '}
        (chiffres COVID) et{' '}
        <a
          href="https://drees.solidarites-sante.gouv.fr/etudes-et-statistiques/publications/article/nombre-de-lits-de-reanimation-de-soins-intensifs-et-de-soins-continus-en-france"
          target="_blank"
        >
          DREES 2019
        </a>{' '}
        (lits en réanimation){' '}
      </p>
    </div>
  );
}

export default TopFive;
