import Product from '../../models/Product';

export default class ProductHandler {
  constructor(id) {
    this.id = id;
    this.product = null;
  }
  fetchProduct() {
    if (this.product) return this.product;
    return new Promise((resolve, reject) => {
      Product.findById(this.id)
        .then((product) => {
          this.product = product;
          resolve(product);
        })
        .catch(err => reject(err));
    });
  }
  name() {
    if (this.product) return this.product.name;
    return this.fetchProduct()
      .then(product => product.name)
      .catch(() => null);
  }
}
