import { ProductLoader } from '../loaders';

export default class ProductHandler {
  constructor(id) {
    this.id = id || null;
  }
  fetchProduct() {
    return new Promise((resolve, reject) => {
      ProductLoader.load(this.id)
        .then((product) => {
          this.product = product;
          resolve(product);
        })
        .catch(err => reject(err));
    });
  }
  id() {
    return this.id;
  }
  name() {
    return this.fetchProduct()
      .then(product => product.name)
      .catch(() => null);
  }
}
