import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';

const Home = () => {

  const { allCoin, currency } = useContext(CoinContext);

  const [displayCoin, setDisplayCoin] = useState([]);

  const [searchedName,setSearchedName] = useState('');

  const searchHandler =(event)=>{
    
    const userInput = event.target.value;
    setSearchedName(userInput.toLowerCase());
    if(event.target.value === ""){
      setDisplayCoin(allCoin);
    }
  }

  const resultHandler = async (event)=>{
    event.preventDefault();
    const coins =  await allCoin.filter((item)=>{
      return item.name.toLowerCase().includes(searchedName) || item.symbol.includes(searchedName) ;
    });
    setDisplayCoin(coins);
  }

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin])

  return (
    <div className="home">
      <div className="hero">
        <h1><span className="text-primary">Top 50 </span>Cryptocurrency Prices by Market Cap</h1>
        <p>CoinTrackr is now tracking the <span className="highlight">top 100 cryptocurrencies</span> due to the use of a demo API from CoinGecko.</p>
        <form onSubmit={resultHandler} >

          <input onChange={searchHandler} list="coinlist" value={searchedName} type="text"  placeholder='Search by name/ticker...' required />
          <button type="submit">Search</button>

          <datalist id="coinlist">
            {allCoin.map((item,index)=>(<option key={index} value={item.name} />))}
          </datalist>
        </form>
      </div>
      <div className="coin-table">
        <div className="table-layout text-start">
          <p>#</p>
          <p >Coin</p>
          <p >Price</p>
          <p className="text-center" >24H</p>
          <p className="market-cap text-center">Market Cap</p>
        </div>
        {
          displayCoin.slice(0, 50).map((item, index) => (
            <Link to={`/coin/${item.id}`} className="table-layout custom-link" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              <p>{item.current_price.toLocaleString(currency.locale, {style:'currency',currency:currency.name, minimumFractionDigits: 0, maximumFractionDigits: 7 })}</p>
              <p className={item.price_change_percentage_24h > 0 ? "text-success" : "text-danger"} style={{ textAlign: "center" }}>
                {Math.floor(item.price_change_percentage_24h * 100) / 100} %
              </p>
              <p style={{ textAlign: "center" }} className="market-cap" >{currency.symbol} {item.market_cap.toLocaleString(currency.locale,{style:'currency',currency:currency.name,maximumFractionDigits:0})}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home;