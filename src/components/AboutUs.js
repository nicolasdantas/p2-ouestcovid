import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './style/AboutUs.scss';
import './style/Global.css';
import avatar1 from './img/avatar1.jpeg';
import avatar2 from './img/avatar2.jpeg';
import avatar3 from './img/avatar3.jpeg';
import avatar4 from './img/avatar4.jpeg';
import avatar5 from './img/avatar5.jpeg';

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="about-us-carousel-container" id="AboutUs">
        <h1 className="about-us-title"> Les créateurs du site </h1>
        <Carousel
          className="about-us-carousel"
          autoPlay
          showThumbs={false}
          showStatus={false}
          infiniteLoop
        >
          <div className="about-us-container">
            <img alt="Matt Damon" src={avatar1} />
            <p className="legend">Matt Damon</p>
          </div>
          <div className="about-us-container">
            <img alt="Candide Guiness" src={avatar2} />
            <p className="legend">Candide Guiness</p>
          </div>
          <div className="about-us-container">
            <img alt="Moufette Anonyme" src={avatar3} />
            <p className="legend">Moufette Anonyme</p>
          </div>
          <div className="about-us-container">
            <img alt="Lou Lou" src={avatar4} />
            <p className="legend">Lou Lou</p>
          </div>
          <div className="about-us-container">
            <img alt="Someone" src={avatar5} />
            <p className="legend">Someone</p>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default AboutUs;
