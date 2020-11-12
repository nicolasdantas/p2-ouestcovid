import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import moment from 'moment';
import './style/Graphic.scss';

const Graphic = () => {
  const [confirmedCase, setConfirmedCase] = useState([]);
  const [date, setDate] = useState([]);

  const state = {
    labels: date,
    datasets: [
      {
        label: '',
        fill: false,
        lineTension: 0,
        backgroundColor: 'white',
        borderColor: ' #2d414d',
        borderWidth: 2,
        data: confirmedCase,
      },
    ],
  };

  useEffect(() => {
    const dayMinus1 = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const dayMinus7 = moment().subtract(7, 'days').format('YYYY-MM-DD');
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
            .map((item) => moment(item.Date).format('D MMM'))
        );
      });
  }, []);

  console.log(date);

  return (
    <div className="graph-container">
      <div className="graph">
        <Line
          data={state}
          options={{
            responsive: true,
            layout: {
              padding: {
                top: 0,
                left: 50,
                right: 60,
                bottom: 0,
              },
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    stepSize: 100000,
                    callback: function changeM(value) {
                      const ranges = [
                        { divider: 1e6, suffix: 'M' },
                        { divider: 1e3, suffix: 'k' },
                      ];
                      function formatNumber(n) {
                        for (let i = 0; i < ranges.length; i += 1) {
                          if (n >= ranges[i].divider) {
                            return (
                              (n / ranges[i].divider).toString() +
                              ranges[i].suffix
                            );
                          }
                        }
                        return n;
                      }
                      return formatNumber(value);
                    },
                  },
                },
              ],
            },
            title: {
              display: true,
              fontColor: '#2d414d',
              fontSize: 30,
              text: 'Cas confirmés durant les 7 derniers jours',
              padding: 30,
              fontFamily: "'Roboto', 'sans-serif'",
            },
            legend: {
              display: false,
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
    </div>
  );
};

export default Graphic;
