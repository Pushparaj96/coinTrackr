import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import { CoinContext } from '../../context/CoinContext';

const Home = () => {

  const {allCoin,currency} = useContext(CoinContext);

  const [displayCoin,setDisplayCoin] = useState([]);

  useEffect(()=>{
    setDisplayCoin(allCoin);
  },[allCoin])

  return (
    <div className="home">
      <div className="hero">
        <h1><span className="text-primary">Top 50 </span>Cryptocurrency Prices by Market Cap</h1>
        <p>Total cryptocurrency trading volume in the last day is at $70.3 Billion. Bitcoin dominance is at 51.5% and Ethereum dominance is at 17.1%. CoinTrackr is now tracking 14,820 cryptocurrencies. The largest gainers in the industry right now are Polkadot Ecosystem and Play To Earn cryptocurrencies.</p>
        <form>
          <input type="text" placeholder='Search any ticker...' />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="coin-table">
        <div className="table-layout">
          <p>#</p>
          <p className="ps-4 ms-2">Coin</p>
          <p className="ps-1">Price</p>
          <p className="ps-4 ms-3">24H</p>
          <p className="ps-4 ms-3 market-cap">Market Cap</p>
        </div>
        {
          displayCoin.slice(0,50).map((item,index)=>(
            <div className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt=""/>
                <p>{item.name + " - " +item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h>0?"text-success":"text-danger"} style={{textAlign:"center"}}>
                {Math.floor(item.price_change_percentage_24h*100)/100} %
                </p>
              <p style={{textAlign:"center"}} className="market-cap" >{currency.symbol} {item.market_cap.toLocaleString()}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home;