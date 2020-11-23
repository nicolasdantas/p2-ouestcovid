import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { StoreContext } from '../contexts/StoreContext';

import './ProductCard.css';

export default function Store() {
  const { allProducts } = useContext(StoreContext);

  return (
    <div className="container-map">
      {allProducts.length > 0 &&
        allProducts.map((product) => (
          <Link to={{ pathname: `/store/${product.id}` }}>
            <ProductCard key={product.id} product={product} />
          </Link>
        ))}
    </div>
  );
}
