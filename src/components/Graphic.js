import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import moment from 'moment';

const Graphic = () => {
  const [confirmedCase, setConfirmedCase] = useState([]);
  const [date, setDate] = useState([]);

  const dayMinus1 = moment().subtract(1, 'days').format('YYYY-MM-DD');
  const dayMinus7 = moment().subtract(7, 'days').format('YYYY-MM-DD');

  const state = {
    labels: date,
    datasets: [
      {
        label: 'Covid Cases',
        fill: false,
        lineTension: 0,
        backgroundColor: 'rgba(75,192,192,1)',
        fillColor: 'rgba(252,147,65,0.5)',
        borderColor: 'rgba(0,0,255,0.3)',
        borderWidth: 2,
        data: confirmedCase,
      },
    ],
  };

  useEffect(() => {
    axios
      .get(
        `https://api.covid19api.com/country/france?from=${dayMinus7}T00:00:00Z&to=${dayMinus1}T00:00:00Z`
      )
      .then((response) => response.data)
      .then((data) => {
        setConfirmedCase(
          data
            .filter((item) => item.Province === '')
            .map((item) => item.Confirmed)
        );
        setDate(
          data
            .filter((item) => item.Province === '')
            .map((item) => moment(item.Date.slice(5, 10)).format('D MMM'))
        );
      });
  }, []);

  console.log(date);

  return (
    <div>
      <Line
        data={state}
        options={{
          layout: {
            padding: {
              top: 0,
              left: 50,
              right: 50,
              bottom: 0,
            },
          },
          title: {
            display: true,
            fontSize: 35,
            text: 'Cas confirmés durant les 7 derniers jours',
          },
          legend: {
            display: true,
            position: 'top',
            onClick: false,
            labels: {
              boxWidth: 1,
              fontSize: 20,
              fontColor: 'black',
            },
          },
        }}
      />
    </div>
  );
};

export default Graphic;
