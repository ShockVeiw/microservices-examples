import React from 'react';
import axios from 'axios';

import '../styles/AddProductModal.css';

interface AddProductModalProps {
    fetchProducts(): void;
    setIsAddProductModalVisible(state: boolean): void;
}

export function AddProductModal({ fetchProducts, setIsAddProductModalVisible }: AddProductModalProps) {
    const inputTitleRef = React.useRef<HTMLInputElement>(null);
    const inputPriceRef = React.useRef<HTMLInputElement>(null);

    const createProduct = (title: string, price: number): void => {
        axios
            .post('http://products.com/products/create', { title, price })
            .then(fetchProducts)

        if (inputTitleRef?.current?.value) inputTitleRef.current.value = '';
        if (inputPriceRef?.current?.value) inputPriceRef.current.value = '';
    }

    return (
        <div className="add-product-modal">
            <div className="add-product-modal__content">
                <button className="add-product-modal__close-btn" type="button" onClick={() => {
                    setIsAddProductModalVisible(false);
                }}>×</button>
                <form className="add-product-modal__form">
                    <input type="text" placeholder="Title" ref={inputTitleRef}/>
                    <input type="number" placeholder="USD price" ref={inputPriceRef}/>
                    <button onClick={
                        () => createProduct(
                            inputTitleRef?.current?.value || '',
                            inputPriceRef?.current?.valueAsNumber || 0
                        )
                    }>Add</button>
                </form>
            </div>
        </div>
    )
}