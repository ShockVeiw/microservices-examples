import React from 'react';

export function ProductItem ({ title, reviewsAmount, price }: any) {
    return (
      <li className="product-item">
          <h3 className="product-item__title">{title}</h3>
          <span className="product-item__review-amount">{reviewsAmount} reviews</span>
          <span className="product-item__price">Price: {price}$</span>
      </li>
    );
}