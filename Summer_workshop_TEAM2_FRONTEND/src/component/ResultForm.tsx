import React from 'react';
import ProductCard from './ProductCard';
import "./ResultForm.css";
import type { Product } from '../type/type';

interface ResultFormProps {
    products: Product[];
}

const ResultForm: React.FC<ResultFormProps> = ({products}) => {
    // const products: Product[] = [
    //     {product_name: "ddd", approx_price_krw: 111, reason:"111"},
    //     {product_name: "ddd", approx_price_krw: 111, reason:"111"},
    //     {product_name: "ddd", approx_price_krw: 111, reason:"111"}
    // ];

    return (
        <div className={"result-form-container"}>
            {/* <ProductCard product={{product_name: "ddd", approx_price_krw: 111, reason:"111"}}/> */}
            {products.map((product, index) => (
                <ProductCard key={index} product={product}/>
            ))}
        </div>
    );
};

export default ResultForm;