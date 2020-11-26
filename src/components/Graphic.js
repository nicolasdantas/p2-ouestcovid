/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import moment from 'moment';
import './style/Graphic.scss';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const Graphic = () => {
  const [confirmedCase, setConfirmedCase] = useState([]);
  const [date, setDate] = useState([]);
  const [valueRadio, setValueRadio] = useState('confirmed');
  const [stepSize, setStepSize] = useState();

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
    const { CancelToken } = axios;
    const source = CancelToken.source();
    const dayMinus1 = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const dayMinus7 = moment().subtract(20, 'days').format('YYYY-MM-DD');
    axios
      .get(
        `https://api.covid19api.com/country/france/status/${valueRadio}?from=${dayMinus7}T00:00:00Z&to=${dayMinus1}T00:00:00Z`,
        {
          cancelToken: source.token,
        }
      )
      .then((response) => response.data)
      .then((data) => {
        setConfirmedCase(
          data.filter((item) => item.Province === '').map((item) => item.Cases)
        );
        setDate(
          data
            .filter((item) => item.Province === '')
            .map((item) => moment(item.Date).format('D MMM'))
        );
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Error: ', err.message); // => prints: Api is being canceled
        }
      });
    return function cleanup() {
      source.cancel('Graphic datas request canceled');
    };
  }, [valueRadio]);

  const handleChange = (event) => {
    setValueRadio(event.target.value);
  };

  const useLabelStyles = makeStyles({
    root: {
      color: '#2d414d',
    },
  });

  const useRadioStyles = makeStyles({
    root: {
      color: '#2d414d',
      '&$checked': {
        color: '#2d414d',
      },
    },
    checked: {},
  });

  return (
    <div className="graph-container">
      <h1>
        {valueRadio === 'confirmed'
          ? 'Cas confirmés'
          : valueRadio === 'deaths'
          ? 'Décès'
          : 'Patients guéris'}{' '}
        depuis le début de l'épidémie
      </h1>
      <div className="graph-criteria">
        <div className="graph">
          <Line
            data={state}
            options={{
              responsive: true,
              layout: {
                padding: {
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                },
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      stepSize,
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
        <div className="criteria">
          <FormControl component="fieldset">
            <FormLabel
              className={useLabelStyles().root}
              component="legend"
              focused={false}
            >
              Choisissez un critère
            </FormLabel>
            <RadioGroup
              aria-label="criteria"
              name="criteria"
              value={valueRadio}
              onChange={handleChange}
            >
              <FormControlLabel
                className={useLabelStyles().root}
                value="confirmed"
                control={<Radio classes={useRadioStyles()} />}
                label="Cas confirmés"
                onChange={() => setStepSize(100000)}
              />
              <FormControlLabel
                className={useLabelStyles().root}
                value="deaths"
                control={<Radio classes={useRadioStyles()} />}
                label="Nombre de décès"
                onChange={() => setStepSize(1000)}
              />
              <FormControlLabel
                className={useLabelStyles().root}
                value="recovered"
                control={<Radio classes={useRadioStyles()} />}
                label="Patients guéris"
                onChange={() => setStepSize(10000)}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Graphic;
