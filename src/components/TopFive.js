import React from 'react';
import moment from 'moment';
import axios from 'axios';
import TopFiveCard from './TopFiveCard';

function TopFive() {
  const [dataTopFive, setDataTopFive] = React.useState([]);
  const dayMinus1 = moment().subtract(1, 'days').format('YYYY-MM-DD'); // last available data

  //   {
  //     "code": "DEP-02",
  //     "nom": "Aisne",
  //     "date": "2020-10-25",
  //     "hospitalises": 117,
  //     "reanimation": 12,
  //     "nouvellesHospitalisations": 8,
  //     "nouvellesReanimations": 2,
  //     "deces": 306,
  //     "gueris": 1259,
  //     "source": {
  //       "nom": "Santé publique France Data"
  //     },
  //     "sourceType": "sante-publique-france-data"
  //   },

  // THIS needs to be put inside a componentDidMount equivalent ASAP
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
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TopFive;
