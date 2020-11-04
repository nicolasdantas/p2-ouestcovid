import React from 'react';
import { Line } from 'react-chartjs-2';

const state = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Covid Cases',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 0, 56],
    },
  ],
};

const Graphic = () => {
  return (
    <div>
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: 'Evolution',
            fontSize: 20,
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
