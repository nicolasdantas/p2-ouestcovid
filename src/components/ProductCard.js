import React from 'react';
import './ProductCard.css';

const ProductCard = (props) => {
  const { product } = props;
  return (
    <div className="container-card">
      <div className="product-card">
        <img
          src={product.main_img}
          style={{ maxWidth: '80px', height: '90px' }}
          alt="rien"
        />
        <div className="producer-paraphs">
          <p>
            <strong>Produit: </strong>
            {product.product}
          </p>
          <p>
            <strong>Description: </strong>
            {product.description}
          </p>
          <p>
            <strong>Prix: </strong> {product.price}€
          </p>
          <p>
            <strong>Stock: </strong>
            {product.stock} pièces
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
