import React from 'react';
import './style/Banner.scss';
import FaceMask from './img/face-mask-banner1.png';

const Banner = () => {
  return (
    <section className="banner">
      <img src={FaceMask} alt="People wearing face masks" />
      <div className="text">
        <h1>Bienvenue sur Où est Covid !</h1>
        <p>Besoin d'infos sur la situation sanitaire actuelle ?</p>
        <p>Envie de voyager en France en toute sécurité ?</p>
        <p>Connaître les dernières actualités sur la pandémie ?</p>
        <h2>Vous êtes au bon endroit !</h2>
      </div>
    </section>
  );
};

export default Banner;
