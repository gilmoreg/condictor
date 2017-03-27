/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import Product from '../../models/Product';
import ProductHandler from './Product';

export default class ProductsHandler {
  products() {
    return new Promise((resolve, reject) => {
      Product.find({})
        .then((products) => {
          console.log('products fetched', products);
          products.map(product => new ProductHandler(product._id));
          resolve(products);
        })
        .catch((err) => {
          console.log('err fetching products', err);
          reject(err);
        });
    });
  }
}
