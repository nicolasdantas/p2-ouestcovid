import React from 'react';
import './style/Footer.scss';
import logo from './img/logo.png';
import LogoGouv from './img/gouvernement-logo.png';

const Footer = () => {
  return (
    <footer>
      <img className="footer-logo" src={logo} alt="logo du site" />

      <a
        className="footer-logo-gouv"
        href="https://www.gouvernement.fr/info-coronavirus"
      >
        <img
          src={LogoGouv}
          alt="logo du gouvernement de la république Française"
        />
      </a>

      <p className="footerP">
        Made with madness by Matt Damon, Candide Guiness , Moufette Anonyme, Lou
        Lou, Someone
      </p>
    </footer>
  );
};

export default Footer;
