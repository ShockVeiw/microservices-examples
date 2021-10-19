import React from 'react';
import { Link } from 'react-router-dom';

interface ProductItemProps {
    title: string;
    reviewsAmount: number;
    price: number;
    productId: string;
}

export function ProductItem ({ title, reviewsAmount, price, productId }: ProductItemProps) {
    return (
        <Link to={`/products/${productId}/reviews`}>
          <li className="product-item">
              <h3 className="product-item__title">{title}</h3>
              <span className="product-item__review-amount">{reviewsAmount} reviews</span>
              <span className="product-item__price">Price: {price}$</span>
          </li>
        </Link>
    );
}