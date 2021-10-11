const shortId = require('shortid');
const fs = require('fs');
const products = require('./products.json');

class ProductManager {
  static create(product) {
    product.id = shortId.generate();
    products.push(product);

    return new Promise((resolve, reject) => {
      fs.writeFile('products.json', JSON.stringify(products), 'utf8', (e) => {
        if (e) reject(e);
        resolve(product);
      });
    });
  }

  static async get() {
    return products;
  }
}

module.exports = {
  ProductManager
}