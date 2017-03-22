import Consumer from '../../models/Consumer';
import ProductHandler from './Product';

export default class ConsumerHandler {
  constructor(id) {
    this.id = id;
    this.consumer = null;
    // Array of Product objects
    // (as opposed to this.consumer.products which is an array of ids)
    this.Products = null;
  }
  fetchConsumer() {
    if (this.consumer) return this.consumer;
    return new Promise((resolve, reject) => {
      Consumer.findById(this.id)
        .then((consumer) => {
          this.consumer = consumer;
          resolve(consumer);
        })
        .catch(err => reject(err));
    });
  }
  name() {
    if (this.consumer) return this.consumer.name;
    return this.fetchConsumer()
      .then(consumer => consumer.name)
      .catch(() => null);
  }
  /* eslint-disable consistent-return */
  products() {
    if (this.consumer && this.Products) return this.Products;
    if (this.consumer) {
      this.Products = this.consumer.products.map(pid => new ProductHandler(pid));
      return this.Products;
    }
    return this.fetchConsumer()
      .then((consumer) => {
        this.consumer = consumer;
        this.Products = this.consumer.products.map(pid => new ProductHandler(pid));
        return this.Products;
      })
      .catch(() => null);
  }
}
