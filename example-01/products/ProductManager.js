const shortId = require('shortid');
const fs = require('fs');
const products = require('./products.json');

function writeProduct(product) {
  return new Promise((resolve, reject) => {
    fs.writeFile('products.json', JSON.stringify(products), 'utf8', (e) => {
      if (e) reject(e);
      resolve(product);
    });
  });
}

class ProductManager {
  static create(product) {
    product.id = shortId.generate();
    products.push(product);

    return writeProduct(product);
  }

  static async getAll() {
    return products;
  }

  static incReviewsAmountById(id) {
    const index = products.findIndex(product => product.id === id);
    if (index === -1) return null;

    products[index].reviewsAmount += 1;
    return writeProduct(products[index]);
  }
}

module.exports = {
  ProductManager
}