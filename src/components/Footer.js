import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="divLinkFooter">
        <ul>
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
              <img
                src={require('../img/twitter-logo.png')}
                alt="logo Twitter"
              />
            </a>
          </li>
          <li>
            <a href="https://www.gitub.com">
              <img src={require('../img/github-logo.png')} alt="logo Github" />
            </a>
          </li>
          <li>
            <a href="https://www.gouvernement.fr/info-coronavirus">
              <img
                src={require('../img/gouvernement-logo.png')}
                alt="logo du gouvernement de la république Française"
              />
            </a>
          </li>
        </ul>
      </div>
      <div className="divTag">
        <p>
          Made with madness by Matt Damon, Candide Guiness , Moufette Anonyme,
          Lou Lou, Moi Même
        </p>
      </div>
    </footer>
  );
};

export default Footer;
