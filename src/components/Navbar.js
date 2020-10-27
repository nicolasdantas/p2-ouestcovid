import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <h1>I'm the header</h1>
      <Link to="/">Accueil </Link>
      <Link to="/ou-partir">Où partir ?</Link>
    </header>
  );
};

export default Navbar;
