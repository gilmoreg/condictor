 /* eslint-disable no-underscore-dangle */
import User from '../../models/User';
import Ticket from '../../models/Ticket';
import TicketHandler from './Ticket';

const ObjectId = require('mongoose').Types.ObjectId;

export default class UserHandler {
  constructor(id) {
    console.log('creating new UserHandler');
    this.id = id;
    this.user = null;
  }
  fetchUser() {
    if (this.user) return this.user;
    return new Promise((resolve, reject) => {
      User.findById(this.id).exec()
        .then((user) => {
          this.user = user;
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  username() {
    if (this.user) return this.user.username;
    return this.fetchUser()
      .then(user => user.username)
      .catch(() => null);
  }
  fullname() {
    if (this.user) return this.user.fullname;
    return this.fetchUser()
      .then(user => user.fullname)
      .catch(() => null);
  }
  tickets() {
    console.log('getting tickets', this.id);
    return new Promise((resolve, reject) => {
      Ticket.find({ owner: ObjectId(this.id) })
        .then((results) => {
          console.log('results: ', results);
          const ticketArray = results.map(ticket => new TicketHandler(ticket._id));
          resolve(ticketArray);
        })
        .catch((err) => {
          console.log('error fetching user tickets', err);
          reject(err);
        });
    });
  } 
}
