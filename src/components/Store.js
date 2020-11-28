import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import axios from 'axios';
import ProductCard from './ProductCard';
import './style/ProductCard.scss';

export default function Store() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const source = axios.CancelToken.source();
    axios
      .get('https://ouestcovid-back.herokuapp.com/api/products', {
        cancelToken: source.token,
      })
      .then((response) => setAllProducts(response.data))
      .then(() => setIsLoading(false))
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Error: ', err.message);
        }
      });
    return () => {
      source.cancel('Store request canceled by user');
    };
  }, []);

  return (
    <div className="store-container">
      <h1>Bienvenue dans la boutique</h1>
      <Link to="/basket">
        <h3>
          Accéder au <ShoppingCartIcon />
        </h3>
        {isLoading && (
          <div className="loader-container">
            <div className="loader" />
          </div>
        )}
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
