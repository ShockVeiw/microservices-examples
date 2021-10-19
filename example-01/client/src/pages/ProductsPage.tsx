import React from 'react';
import axios from 'axios';

import { Product } from '../shared/interfaces';
import { AddProductModal } from '../components/AddProductModal';
import { ProductItem } from '../components/ProductItem';
import '../styles/ProductsPage.css';

export function ProductsPage() {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [isAddProductModalVisible, setIsAddProductModalVisible] = React.useState<boolean>(false);

    const fetchProducts = async () => {
        const res = await axios.get('http://localhost:5000/products');

        setProducts(res.data);
    }

    React.useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <header className="app__header">
                <h1 className="app__title">Products</h1>
                <button
                    className="app__add-product-btn"
                    title="Add a product"
                    onClick={() => setIsAddProductModalVisible(true)}
                >+
                </button>
            </header>
            {isAddProductModalVisible &&
            <AddProductModal fetchProducts={fetchProducts} setIsAddProductModalVisible={setIsAddProductModalVisible}/>}
            <ul className="app__product-list">
                {
                    products.map((product: Product) => {
                        return <ProductItem
                            title={product.title}
                            reviewsAmount={product.reviewsAmount}
                            price={product.price}
                            productId={product.id}
                        />
                    })
                }
            </ul>
        </>
    );
}
