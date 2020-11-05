import React from 'react';
import { Link } from 'react-router-dom';
import './style/Navbar.scss';
import CustomizedMenus from './Burger';
import logo from './img/logo.png';

const Navbar = () => {
  return (
    <header className="header">
      <nav className="menu" role="navigation">
        <div className="inner">
          <div className="navbar-left">
            <Link to="/">
              <img
                className="logo"
                src={logo}
                alt="logo"
                width="70px"
                height="70px"
              />
            </Link>
          </div>

          <div className="navbar-right">
            <div>
              <CustomizedMenus />
            </div>
            <ul className="lien-navbar">
              <li>
                <Link className="liste" to="/">
                  Statistiques
                </Link>
              </li>
              <li>
                <Link className="liste" to="/ou-partir">
                  Où partir ?
                </Link>
              </li>
              <li>
                <a className="liste" href="#news">
                  News
                </a>
              </li>
              <li>
                <a className="liste" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
