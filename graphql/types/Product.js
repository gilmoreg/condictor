import Product from '../../models/Product';

export default class ProductHandler {
  constructor(id) {
    this.id = id;
    this.product = null;
  }
  fetchProduct() {
    return new Promise((resolve, reject) => {
      if (this.product) resolve(this.product);
      Product.findById(this.id)
        .then((product) => {
          this.product = product;
          resolve(product);
        })
        .catch(err => reject(err));
    });
  }
  name() {
    return this.fetchProduct()
      .then(product => product.name)
      .catch(() => null);
  }
}
