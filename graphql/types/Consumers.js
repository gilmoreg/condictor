/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import Consumer from '../../models/Consumer';
import ConsumerHandler from './Consumer';

export default class ConsumersHandler {
  consumers() {
    return new Promise((resolve, reject) => {
      Consumer.find({})
      .then((consumers) => {
        const consumerList = consumers.map(consumer => new ConsumerHandler(consumer._id));
        resolve(consumerList);
      })
      .catch(() => reject(null));
    });
  }
}
