import React, { useContext } from 'react';
import './navbar.css';
import logo from '../../assets/logo.png';
import { CoinContext } from '../../context/CoinContext';


const Navbar = () => {

  const {setCurrency} = useContext(CoinContext);

  const currencyHandler = (event)=>{
    switch(event.target.value)
    {
      case "usd":{
        setCurrency({name:"usd",symbol:"$"});
        break;
      }
      case "inr":{
        setCurrency({name:"inr",symbol:"₹"});
        break;
      }
      default:{
        setCurrency({name:"usd",symbol:"$"});
        break;
      }
    }
  }

  return (
    <div className="Navbar fixed-top bg-white">
      <img src={logo} alt="site-logo" className="logo" />
      <div className="nav-right">
          <div className="currency-text">
            <label className="form-label fw-bold">Currency</label>
          </div>
          <select className="form-select no-outline" onChange={currencyHandler} >
            <option value="usd">USD</option>
            <option value="inr">INR</option>
          </select>
        </div>
    </div>
  )
}

export default Navbar;