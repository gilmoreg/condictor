import Ticket from '../../models/Ticket';
import UserHandler from './User';

const ObjectId = require('mongoose').Types.ObjectId;

export default class UserStatsHandler {
  constructor(id) {
    this.id = id;
  }
  user() {
    return new UserHandler(this.id);
  }
  owned() {
    return new Promise((resolve, reject) => {
      Ticket.find({ owner: ObjectId(this.id) })
        .then((results) => {
          resolve(results.length);
        })
        .catch(() => reject(null));
    });
  }
  open() {
    return new Promise((resolve, reject) => {
      Ticket.find({ owner: ObjectId(this.id), closed: null })
        .then((results) => {
          resolve(results.length);
        })
        .catch(() => reject(null));
    });
  }
  averageOpenTime() {
    return new Promise((resolve, reject) => {
      Ticket.find({ owner: ObjectId(this.id) })
        .then((results) => {
          let totalOpenTime = 0;
          results.forEach((ticket) => {
            if (ticket.closed) {
              totalOpenTime += (ticket.closed - ticket.created);
            } else {
              totalOpenTime += (Date.now() - ticket.created);
            }
          });
          resolve(Math.floor(totalOpenTime / results.length));
        })
        .catch(() => reject(null));
    });
  }
}
