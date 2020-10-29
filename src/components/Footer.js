import React from 'react';
import './Footer.scss';
import LogoFacebook from '../img/facebook-logo.png';
import LogoTwitter from '../img/twitter-logo.png';
import LogoGitub from '../img/github-logo.png';
import LogoGouv from '../img/gouvernement-logo.png';

const Footer = () => {
  return (
    <footer>
      <ul className="footerUlMedia">
        <li>
          <a href="https://www.facebook.com">
            <img src={LogoFacebook} alt="logo Facebook" />
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com">
            <img src={LogoTwitter} alt="logo Twitter" />
          </a>
        </li>
        <li>
          <a href="https://www.gitub.com">
            <img src={LogoGitub} alt="logo Github" />
          </a>
        </li>
      </ul>

      <ul className="footerUlGouv">
        <li>
          <a href="https://www.gouvernement.fr/info-coronavirus">
            <img
              src={LogoGouv}
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
