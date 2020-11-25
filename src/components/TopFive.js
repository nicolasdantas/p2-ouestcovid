import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import TopFiveCard from './TopFiveCard';
import countyList from './datas/countyList.json';
import TopFiveCountyModal from './TopFiveCountyModal';
import './style/TopFive.scss';
import { APICovidByCountyRequest } from '../contexts/APICovidByCountyRequest';

function TopFive() {
  const [dataTopFive, setDataTopFive] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [countyClicked, setCountyClicked] = useState('');

  const dayMinus1 = moment().subtract(1, 'days').format('YYYY-MM-DD'); // last available data

  const handleClick = (event) => {
    setModalShow(true);
    setCountyClicked(event.currentTarget.id);
  };

  const { allData } = useContext(APICovidByCountyRequest);

  useEffect(() => {
    setDataTopFive(() =>
      /* getting the data from the context and adding for each county the number of beds in reanimation */
      allData
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
        .sort((a, b) => (a.ratio >= b.ratio ? 1 : -1))
        .slice(0, 5)
    );
  }, [allData]);

  return (
    <>
      {countyClicked && (
        <TopFiveCountyModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          county={countyClicked}
          datacounty={dataTopFive.filter(
            (county) => county.code === countyClicked
          )}
        />
      )}
      <div className="top-five">
        <h3>Top 5 des départements les plus sûrs</h3>
        <p className="situation">
          Situation le {moment(dayMinus1).format('DD/MM/YYYY')} <br />
          <span className="small">
            Le classement se base sur le taux d'occupation des lits en
            réanimation
          </span>
        </p>
        <div className="column">
          {dataTopFive.length > 0 ? (
            dataTopFive.map((county, index) => (
              <TopFiveCard
                key={county.code}
                county={county}
                index={index + 1}
                openModal={(event) => handleClick(event)}
              />
            ))
          ) : (
            <div className="spinner">Loading...</div>
          )}
        </div>
        <p className="sources">
          Sources :{' '}
          <a
            href="https://github.com/florianzemma/CoronavirusAPI-France/blob/master/README.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            CoronavirusAPI
          </a>{' '}
          (chiffres COVID) et{' '}
          <a
            href="https://drees.solidarites-sante.gouv.fr/etudes-et-statistiques/publications/article/nombre-de-lits-de-reanimation-de-soins-intensifs-et-de-soins-continus-en-france"
            target="_blank"
            rel="noopener noreferrer"
          >
            DREES 2019
          </a>{' '}
          (lits en réanimation){' '}
        </p>
      </div>
    </>
  );
}

export default TopFive;
