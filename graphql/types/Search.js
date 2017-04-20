 /* eslint-disable no-underscore-dangle */
import Ticket from '../../models/Ticket';
import Consumer from '../../models/Consumer';
import Product from '../../models/Product';
import User from '../../models/User';
import TicketHandler from './Ticket';

const ObjectId = require('mongoose').Types.ObjectId;

export default class SearchHandler {
  constructor(consumer, product, owner, open) {
    this.consumer = consumer || null;
    this.product = product || null;
    this.owner = owner || null;
    this.open = open || null;
  }
  results() {
    const promises = [];
    if (this.consumer) {
      promises.push(
        new Promise((resolve) => {
          Consumer.findOne({ name: this.consumer })
            .then(result => resolve({ consumer: ObjectId(result._id) }));
        }),
      );
    }
    if (this.product) {
      promises.push(
        new Promise((resolve) => {
          Product.findOne({ name: this.product })
            .then(result => resolve({ product: ObjectId(result._id) }));
        }),
      );
    }
    if (this.owner) {
      promises.push(
        new Promise((resolve) => {
          User.findOne({ username: this.owner })
            .then(result => resolve({ owner: ObjectId(result._id) }));
        }),
      );
    }
    return new Promise((resolve, reject) => {
      Promise.all(promises)
        .then((options) => {
          let dbOptions = {};
          const searchOptions = options;
          if (this.open) searchOptions.push({ closed: { $exists: false } });
          // See if we ended up with any search options. If not, send an empty object
          // (Mongo will complain about an $and with an empty array)
          if (searchOptions.length) dbOptions = { $and: [...searchOptions] };
          Ticket.find(dbOptions)
            .then((results) => {
              const ticketArray = results.map(ticket => new TicketHandler(ticket._id));
              resolve(ticketArray);
            });
        })
      .catch(err => reject(err));
    });
  }
}
