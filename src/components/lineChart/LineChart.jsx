import React, { useEffect, useState } from 'react';
import './lineChart.css';
import Chart from 'react-google-charts';

const LineChart = ({coinHistory}) => {

    const [data,setData] = useState([["Date","Prices"]]);


    useEffect(()=>{
        let dataCopy = [["Date","Prices"]];
        if(coinHistory.prices){
            coinHistory.prices.map((item)=>{
                dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`,item[1]])
            })
            setData(dataCopy);
        }
    },[coinHistory])

  return (
    <Chart
        chartType='LineChart'
        data={data}
        height="100%"
        legendToggle
    />
  )
}

export default LineChart