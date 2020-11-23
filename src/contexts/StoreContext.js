import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StoreContext = createContext();

export default function StoreProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/allproducts')
      .then((response) => setAllProducts(response.data));
  }, []);
  
  console.log(allProducts)
  return (
    <StoreContext.Provider value={{ allProducts }}>
      {children}
    </StoreContext.Provider>
  );
}
