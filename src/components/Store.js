import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ProductCard from './ProductCard';
import { StoreContext } from '../contexts/StoreContext';

import './style/ProductCard.scss';

export default function Store() {
  const { allProducts } = useContext(StoreContext);

  return (
    <div className="store-container">
      <h1>Bienvenue dans la boutique</h1>
      <Link to="/basket">
        <h3>
          Accéder au <ShoppingCartIcon />
        </h3>
      </Link>
      <div className="container-map">
        {allProducts.length > 0 &&
          allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
