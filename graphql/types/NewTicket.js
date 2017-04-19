/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import User from '../../models/User';
import Consumer from '../../models/Consumer';
import Product from '../../models/Product';
import Ticket from '../../models/Ticket';
import TicketHandler from './Ticket';

export default class NewTicketHandler {
  constructor(input) {
    const { product, consumer, owner } = input;
    return Promise.all([
      User.findOne({ username: owner }),
      Consumer.findOne({ name: consumer }),
      Product.findOne({ name: product }),
    ])
    .then((results) => {
      if (results.length > 2) {
        return Ticket.create({
          owner: results[0]._id,
          consumer: results[1]._id,
          product: results[2]._id,
          description: input.description,
          priority: input.priority,
          comments: [],
          created: Date.now(),
        })
        .then(ticket => new TicketHandler(ticket._id));
      }
      return null;
    })
    .catch(err => new Error(err));
  }
}
