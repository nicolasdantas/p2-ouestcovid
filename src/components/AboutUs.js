import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './style/AboutUs.scss';
import Alex from './img/Alex.jpeg';
import Nicolas from './img/Nicolas.png';
import Karen from './img/Karen.jpg';
import Louise from './img/Louise.jpeg';
import Thomas from './img/Thomas.jpg';

const avatarArray = [
  {
    src: Alex,
    legend: 'Alex',
  },
  {
    src: Nicolas,
    legend: 'Nicolas',
  },
  {
    src: Karen,
    legend: 'Karen',
  },
  {
    src: Louise,
    legend: 'Louise',
  },
  {
    src: Thomas,
    legend: 'Thomas',
  },
];
const AboutUs = () => {
  return (
    <div className="about-us" id="about-us">
      <div className="about-us-carousel-container" id="AboutUs">
        <h1 className="about-us-title"> Les créateurs du site </h1>
        <Carousel
          className="about-us-carousel"
          autoPlay
          showThumbs={false}
          showStatus={false}
          infiniteLoop
        >
          {avatarArray.map((avatar) => (
            <div className="about-us-container" key={avatar.legend}>
              <img alt={avatar.legend} src={avatar.src} />
              <p className="legend">{avatar.legend}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default AboutUs;
