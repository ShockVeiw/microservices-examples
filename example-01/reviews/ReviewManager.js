const shortId = require('shortid');
const fs = require('fs');
const reviews = require('./reviews.json');

class ReviewManager {
  static create(review) {
    review.id = shortId.generate();
    reviews.push(review);

    return new Promise((resolve, reject) => {
      fs.writeFile('reviews.json', JSON.stringify(reviews), 'utf8', (e) => {
        if (e) reject(e);
        resolve(review);
      });
    });
  }

  static async getAllByProductId(productId) {
    return reviews.filter(review => review.productId === productId);
  }
}

module.exports = {
  ReviewManager
}