import React from 'react';
import './Footer.scss';
const Footer = () => {
  return (
    <footer>
      <ul className="footerUlMedia">
        <li>
          <a href="https://www.facebook.com">
            <img
              src={require('../img/facebook-logo.png')}
              alt="logo Facebook"
            />
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com">
            <img src={require('../img/twitter-logo.png')} alt="logo Twitter" />
          </a>
        </li>
        <li>
          <a href="https://www.gitub.com">
            <img src={require('../img/github-logo.png')} alt="logo Github" />
          </a>
        </li>
      </ul>

      <ul className="footerUlGouv">
        <li>
          <a href="https://www.gouvernement.fr/info-coronavirus">
            <img
              src={require('../img/gouvernement-logo.png')}
              alt="logo du gouvernement de la république Française"
            />
          </a>
        </li>
      </ul>

      <p className="footerP">
        Made with madness by Matt Damon, Candide Guiness , Moufette Anonyme, Lou
        Lou, Moi Même
      </p>
    </footer>
  );
};

export default Footer;
