import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StoreContext = createContext();

export default function StoreProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    axios
      .get('https://ouestcovid-back.herokuapp.com/api/products')
      .then((response) => setAllProducts(response.data));
  });

  return (
    <StoreContext.Provider value={{ allProducts }}>
      {children}
    </StoreContext.Provider>
  );
}
