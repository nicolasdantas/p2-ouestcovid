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
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
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
            .map((item) => moment(item.Date.slice(5, 10)).format('DD-MM'))
        );
      });
  }, []);

  console.log(date);

  return (
    <div>
      <Line
        data={state}
        options={{
          title: {
            display: true,
            fontSize: 20,
            text: 'Cas confirmés durant les 7 derniers jours',
          },
          legend: {
            display: true,
            position: 'right',
          },
        }}
      />
    </div>
  );
};

export default Graphic;
