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

  // {
  //   "code": "DEP-01",
  //   "nom": "Ain",
  //   "date": "2020-10-24",
  //   "hospitalises": 171,
  //   "reanimation": 14,
  //   "nouvellesHospitalisations": 16,
  //   "nouvellesReanimations": 1,
  //   "deces": 126,
  //   "gueris": 593,
  //   "source": {
  //     "nom": "Santé publique France Data"
  //   },
  //   "sourceType": "sante-publique-france-data"
  // },

  React.useEffect(() => {
    axios
      .get(
        `https://coronavirusapi-france.now.sh/AllDataByDate?date=${dayMinus1}`
      )
      .then((response) => response.data)
      .then((data) => {
        setDataAPI(() =>
          //getting the data from API, comparing it to countyList.json based on county code and adding for each county the number of beds in reanimation
          data.allFranceDataByDate
            .filter((item) => item.code.includes('DEP'))
            .map((item) => ({ ...item, code: item.code.split('-')[1] }))
            .map((item) => ({
              ...item,
              lits: countyList.find((county) => county.code === item.code).lits,
            }))
        );
      }); // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    setDataTopFive(() =>
      dataAPI
        .sort((a, b) =>
          a.reanimation / +a.lits >= b.reanimation / +b.lits ? 1 : -1
        )
        .slice(0, 5)
    );
  }, [dataAPI]);

  return (
    <div className="top-five">
      <h2>Top 5 des départements les plus sûrs</h2>
      <p>Situation le {moment(dayMinus1).format('DD/MM/YYYY')}</p>
      {dataTopFive.length > 0 ? (
        dataTopFive.map((county) => (
          <TopFiveCard key={county.code} county={county} />
        ))
      ) : (
        <div className="spinner">Loading...</div>
      )}
    </div>
  );
}

export default TopFive;
