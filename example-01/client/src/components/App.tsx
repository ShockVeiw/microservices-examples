import React from 'react';
import axios from 'axios';

import { AddProductModal } from './AddProductModal';
import { ProductItem } from './ProductItem';
import '../styles/App.css';

function App() {
  const [products, setProducts] = React.useState<any>([]);
  const [isAddProductModalVisible, setIsAddProductModalVisible] = React.useState<boolean>(false);

  const fetchProducts = async () => {
      const res = await axios.get('http://localhost:5000/products');

      setProducts(res.data);
  }

  React.useEffect(() => {
      fetchProducts();
  }, []);

  return (
      <div className="app">
          <div className="container">
              <header className="app__header">
                  <h1 className="app__title">Products</h1>
                  <button
                      className="app__add-product-btn"
                      title="Add a product"
                      onClick={() => setIsAddProductModalVisible(true)}
                  >+</button>
              </header>
              {isAddProductModalVisible && <AddProductModal fetchProducts={fetchProducts} setIsAddProductModalVisible={setIsAddProductModalVisible}/>}
              <ul className="app__product-list">
                  {
                    products.map((product: any) => {
                      return <ProductItem title={product.title} reviewsAmount={product.reviewsAmount} price={product.price} />
                    })
                  }
              </ul>
          </div>
      </div>
  );
}

export default App;
