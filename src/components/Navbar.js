import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  return (
    <header>
      <nav className="menu" role="navigation">
        <div className="inner">  
          <div className = "navBarLeft">
          <img src={require("../pictures/logo.png")} alt="logo"/>
          </div>
          
          <div className="navBarRight">
          <button id="hamburger_button">&#9776;</button>
            <ul>
            <li className="liste"><Link to='/'>Accueil </Link></li>
            <li className="liste"><Link to='/ou-partir'>Où partir ?</Link></li>
            </ul>
          </div> 
        </div>     
      </nav>
    </header>
  );
};

export default Navbar;
