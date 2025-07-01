import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
// // import { Chart } from 'react-chartjs-2'
ChartJS.register(...registerables);

const BarGraph = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: '',
        backgroundColor: 'rgb(0, 128, 252)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 0,
        barThickness: 24,
        data: data.values,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category',
          grid: {
            display: false,
          },
        labels: data.labels,
      },
      y: {
        grid: {        
         display: false,
          },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false, 
      },
    },
  };

  return (
    <div style={{padding: '20px' ,width: '680px'}}>
      <div style={{backgroundColor:'rgb(0, 128, 252)',width: '250px',height: '43px',marginLeft: '-19px',borderTopRightRadius: '20px',borderBottomRightRadius: '20px'}}>
      <h4 style={{color: '#fff',textAlign: 'center',fontWeight: 200,fontSize: '15px',padding: '9px'}}>{data.text}</h4>
      </div>
      <Bar style={{marginTop: '40px'}} data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarGraph;
