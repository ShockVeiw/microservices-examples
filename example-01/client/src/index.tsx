import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ProductsPage } from './pages/ProductsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
      <div className="app">
          <div className="container">
              <Router>
                  <Switch>
                      <Route exact path="/">
                          <ProductsPage/>
                      </Route>
                      <Route path="/products/:productId/reviews">
                          <ReviewsPage/>
                      </Route>
                  </Switch>
              </Router>
          </div>

      </div>
  </React.StrictMode>,
  document.getElementById('root')
);
