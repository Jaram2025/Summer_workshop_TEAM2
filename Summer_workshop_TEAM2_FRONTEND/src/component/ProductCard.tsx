import React from 'react';
import './ProductCard.css';
import type { Product } from '../type/type';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  const formattedPrice = product.approx_price_krw.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });

  return (
    <div className="product-card-container">
      <h3 className="product-name">{product.product_name}</h3>
      <p className="price">
        가격: <span className="price-value">{formattedPrice}</span>
      </p>
      <div className="reason-section">
        <h4 className="reason-title">추천 이유</h4>
        <p className="reason-text">{product.reason}</p>
      </div>
    </div>
  );
};

export default ProductCard;