import React, { useContext, useEffect, useState } from 'react';
import './coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/lineChart/LineChart';
import { Link } from 'react-router-dom';

const Coin = () => {

  const {coinId} = useParams();
  const [coinData,setCoinData] = useState();
  const [coinHistory,setCoinHistory] = useState();
  const {currency} = useContext(CoinContext);

  const fetchCoinData = async ()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-FKKXQ7JR4ax1PMq9zyzWmaZQ'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => setCoinData(response))
      .catch(err => console.error(err));
  }

  const fetchCoinHistory = async ()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-FKKXQ7JR4ax1PMq9zyzWmaZQ'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=20&interval=daily`, options)
      .then(response => response.json())
      .then(response => setCoinHistory(response))
      .catch(err => console.error(err));
  }

  useEffect(()=>{
    fetchCoinData();
    fetchCoinHistory();
  },[currency])

if(coinData && coinHistory){

  const atl = new Date(coinData.market_data.atl_date[currency.name]);
  const atlDate = atl.toLocaleDateString(currency.locale,{year:'numeric',month:'short',day:'numeric'});
  const ath = new Date(coinData.market_data.ath_date[currency.name]);
  const athDate = ath.toLocaleDateString(currency.locale,{day:'numeric',year:'numeric',month:'short'})

  return (
    <div className='coin-page'>
      <div className='d-flex justify-content-center'>
        <Link to={'/'}>
        <button className='btn btn-light btn-outline-dark'>Back To<span className="bi bi-house-door ps-1"></span></button>
        </Link>
      </div>
      <div className="coin-name">
        <img src={coinData.image.large} alt="" />
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>
      <div className="coin-chart">
        <LineChart coinHistory={coinHistory}/>
      </div>
      <div className="coin-info">
        <ul>
          <h6>Market Cap Rank</h6>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <h6>Current Price</h6>
          <li>{coinData.market_data.current_price[currency.name].toLocaleString(currency.locale,{style:'currency',currency:currency.name,minimumFractionDigits:0,maximumFractionDigits:7})}</li>
        </ul>
        <ul>
          <h6>Market Cap</h6>
          <li>{coinData.market_data.market_cap[currency.name].toLocaleString(currency.locale,{style:'currency',currency:currency.name,maximumFractionDigits:0})}</li>
        </ul>
        <ul>
          <h6>Fully Diluted Valudation</h6>
          <li>{coinData.market_data.fully_diluted_valuation[currency.name].toLocaleString(currency.locale,{style:'currency',currency:currency.name,maximumFractionDigits:0})}</li>
        </ul>
        <ul>
        <h6>Circulating Supply</h6>
        <li>{coinData.market_data.circulating_supply.toLocaleString()}</li>
        </ul>
        <ul>
          <h6>Total Supply</h6>
          <li>{coinData.market_data.total_supply.toLocaleString()}</li>
        </ul>
        <ul>
          <h6>All Time Low</h6>
          <li>{coinData.market_data.atl[currency.name].toLocaleString(currency.locale,{style:'currency',currency:currency.name,minimumFractionDigits:0,maximumFractionDigits:7})} - on {atlDate}</li>
        </ul>
        <ul>
          <h6>All Time High</h6>
          <li>{coinData.market_data.ath[currency.name].toLocaleString(currency.locale,{style:'currency',currency:currency.name,minimumFractionDigits:0,maximumFractionDigits:7})} - on {athDate}</li>
        </ul>
       
        
      </div>
    </div>
  )
}else{
  return(
    <div className="spinner">
      <div className="spin">

      </div>
    </div>
  )
}
  
}

export default Coin