import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'moment/locale/fr';
import './style/TopFive.scss';
import countyList from './datas/countyList.json';

function CountyModal(props) {
  const [dataCounty, setDataCounty] = useState([]);

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();
    const url = `https://coronavirusapi-france.now.sh/AllDataByDepartement?Departement=${props.datacounty[0].nom}`;
    axios
      .get(url, {
        cancelToken: source.token,
      })
      .then((response) => response.data)
      .then((data) => setDataCounty(data.allDataByDepartement.slice(-7)))
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
        }
      });
    return function cleanup() {
      // cancels the previous request on unmount or query update :
      source.cancel('Modal request canceled');
    };
  }, [props.datacounty]);

  const data = {
    labels: dataCounty.map((item) => moment(item.date).format('D MMM')),
    datasets: [
      {
        label:
          "Evolution des hospitalisations (en nombre d'hospitalisés par jour)",
        data: dataCounty.map((item) => item.hospitalises),
        fill: false,
        lineTension: 0,
        backgroundColor: 'white',
        borderColor: '#c3ebe2',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    legend: {
      onClick: false,
      labels: {
        boxWidth: 1,
        fontColor: 'white',
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            stepSize: 1,
            beginAtZero: false,
            fontColor: 'white',
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: 'white',
          },
        },
      ],
    },
  };

  return (
    dataCounty.length && (
      <div>
        <div>
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="county-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title
                bsPrefix="customized-modal-title"
                id="contained-modal-title-vcenter"
              >
                {props.datacounty[0].nom}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <h4>
                  Dernières données au{' '}
                  {moment(props.datacounty[0].date).format('LL')}
                </h4>
                <ul>
                  <li>
                    <em>Hospitalisés : </em> {props.datacounty[0].hospitalises}
                  </li>
                  <li>
                    <em>En réanimation : </em> {props.datacounty[0].reanimation}
                  </li>
                  <li>
                    <em>Nouvelles hospitalisations : </em>{' '}
                    {props.datacounty[0].nouvellesHospitalisations}
                  </li>
                  <li>
                    <em>Nouvelles réanimations : </em>{' '}
                    {props.datacounty[0].nouvellesReanimations}
                  </li>
                  <li>
                    {' '}
                    <em>Décès (cumulés) : </em> {props.datacounty[0].deces}
                  </li>
                  <li>
                    <em>Guéris (cumulés) : </em> {props.datacounty[0].gueris}
                  </li>
                </ul>
                <p className="ratio">
                  Taux d'occupation des lits en réanimation :{' '}
                  {props.datacounty[0].ratio}%
                </p>
                <Line data={data} options={options} width={40} height={15} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                href={countyList
                  .filter((county) => props.datacounty[0].code === county.code)
                  .map((datas) => datas.url)
                  .toString()}
                variant="light"
                target="_blank"
                onClick={props.onHide}
              >
                Je veux partir ici !
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    )
  );
}

export default CountyModal;
