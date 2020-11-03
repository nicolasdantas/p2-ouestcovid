import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { Default } from 'react-spinners-css';
import TopFiveCard from './TopFiveCard';
import './TopFive.scss';

function TopFive() {
  const [dataTopFive, setDataTopFive] = React.useState([]);
  const dayMinus1 = moment().subtract(1, 'days').format('YYYY-MM-DD'); // last available data

  React.useEffect(() => {
    axios
      .get(
        `https://coronavirusapi-france.now.sh/AllDataByDate?date=${dayMinus1}`
      )
      .then((response) => response.data)
      .then((data) => {
        setDataTopFive(
          data.allFranceDataByDate
            .filter((item) => item.code.includes('DEP'))
            .sort((a, b) => (a.reanimation >= b.reanimation ? 1 : -1))
            .slice(0, 5)
        );
      });
  }, []);

  return (
    <div className="top-five">
      <h2>Top 5 des départements les plus sûrs</h2>
      <p>Situation le {moment(dayMinus1).format('DD/MM/YYYY')}</p>
      {dataTopFive.length > 0 ? (
        dataTopFive.map((county) => (
          <TopFiveCard key={county.code} county={county} />
        ))
      ) : (
        <div className="spinner">
          <Default color=" #0ca4c4" />
        </div>
      )}
    </div>
  );
}

export default TopFive;
