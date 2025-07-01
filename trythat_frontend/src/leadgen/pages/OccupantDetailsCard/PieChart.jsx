import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ item }) => {
  const chartData = {
    labels: [item.vacant,item.occupied],
    datasets: [
      {
        data: [item.vacant,item.occupied],
        backgroundColor: [
          '#D3D3D3', 
          'rgb(0, 128, 252)', 
        ],
      },
    ],
  };

 
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ width: '220px', height: '220px',marginTop: '92px',marginLeft: '230px' }}> 
      <Pie data={chartData} options={options} />
    <div style={{backgroundColor: '#fff',width: '160px',height: '160px',borderRadius: '50%',position: "absolute",marginTop: '-192px',marginLeft: '30px',textAlign: 'center',justifyContent: 'center',display: 'flex',flexDirection: 'column'}}>
      <h2 style={{color: 'rgb(0, 128, 252)'}}>{item.total}</h2>
      <h3>{item.totalText}</h3>
    </div>
   
      <div style={{display: 'flex',justifyContent: 'space-around',width: '550px',border: '2px solid black',height: '50px',padding:'12px',marginTop: '30px',fontSize: '17px',marginLeft: '-150px',borderRadius: '10px'}}>
          <div style={{backgroundColor:'#D3D3D3',width: '12px',height:'12px',borderRadius: '50%',marginTop: '7px',marginRight: '-15px'}}></div>
        <h4 style={{fontWeight: '100'}}>
          {item.occupiedText}</h4>
        <div style={{backgroundColor:'rgb(0, 128, 252)',width: '12px',height:'12px',borderRadius: '50%',marginTop: '7px',marginRight: '-15px'}}></div>
        <h4 style={{fontWeight: '100'}}>
          {item.vacantText}</h4>
      </div>
    </div>
  );
};

export default PieChart;