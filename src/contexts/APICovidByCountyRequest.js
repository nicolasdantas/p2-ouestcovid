import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

export const APICovidByCountyRequest = createContext();

export default function APICovidByCountyRequestProvider({ children }) {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const dayMinus1 = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const dayMinus2 = moment().subtract(2, 'days').format('YYYY-MM-DD');
    axios
      .get(
        `https://coronavirusapi-france.now.sh/AllDataByDate?date=${dayMinus1}`
      )
      .then((response) => response.data)
      .then((lastDayDatas) => {
        const lastDayDataArray = lastDayDatas.allFranceDataByDate;

        if (!Object.values(lastDayDataArray).includes(null)) {
          setAllData(lastDayDataArray);
        } else {
          axios
            .get(
              `https://coronavirusapi-france.now.sh/AllDataByDate?date=${dayMinus2}`,
              {
                cancelToken: source.token,
              }
            )
            .then((response) => response.data)
            .then((penultimateDataDatas) => {
              const penultimateDayDatasArray =
                penultimateDataDatas.allFranceDataByDate;
              setAllData(penultimateDayDatasArray);
            });
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Error: ', err.message);
        }
      });
    return () => {
      source.cancel('API request canceled by user');
    };
  }, []);

  return (
    <APICovidByCountyRequest.Provider value={{ allData }}>
      {children}
    </APICovidByCountyRequest.Provider>
  );
}
