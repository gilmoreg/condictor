import { ConsumerLoader } from '../loaders';
import ProductHandler from './Product';

export default class ConsumerHandler {
  constructor(id) {
    this.id = id;
    this.consumer = null;
  }
  fetchConsumer() {
    return new Promise((resolve, reject) => {
      if (this.consumer) resolve(this.consumer);
      ConsumerLoader.load(this.id)
        .then((consumer) => {
          this.consumer = consumer;
          resolve(consumer);
        })
        .catch(err => reject(err));
    });
  }
  id() {
    return this.id;
  }
  name() {
    return this.fetchConsumer()
      .then(consumer => consumer.name)
      .catch(() => null);
  }
  products() {
    return this.fetchConsumer()
      .then(consumer => consumer.products.map(pid => new ProductHandler(pid)))
      .catch(() => null);
  }
}
