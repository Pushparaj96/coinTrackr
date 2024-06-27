import React, { useContext } from 'react';
import './navbar.css';
import logo from '../../assets/logo.png';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';


const Navbar = () => {

  const {setCurrency} = useContext(CoinContext);

  const currencyHandler = (event)=>{
    switch(event.target.value)
    {
      case "usd":{
        setCurrency({name:"usd",locale:"en-US"});
        break;
      }
      case "inr":{
        setCurrency({name:"inr",locale:"en-IN"});
        break;
      }
      default:{
        setCurrency({name:"usd",locale:"en-US"});
        break;
      }
    }
  }

  return (
    <div className="Navbar fixed-top bg-white">
      <Link to={'/'}>
      <img src={logo} alt="site-logo" className="logo" />
      </Link>
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