 /* eslint-disable no-underscore-dangle */
import { UserLoader } from '../loaders';
import Ticket from '../../models/Ticket';
import TicketHandler from './Ticket';

const ObjectId = require('mongoose').Types.ObjectId;

export default class UserHandler {
  constructor(id) {
    this.id = id;
    this.user = null;
  }
  fetchUser() {
    return new Promise((resolve, reject) => {
      if (this.user) resolve(this.user);
      UserLoader.load(this.id)
        .then((user) => {
          this.user = user;
          resolve(user);
        })
        .catch(err => reject(err));
    });
  }
  id() {
    return this.id;
  }
  username() {
    return this.fetchUser()
      .then(user => user.username)
      .catch(() => null);
  }
  fullname() {
    return this.fetchUser()
      .then(user => user.fullname)
      .catch(() => null);
  }
  tickets() {
    return new Promise((resolve, reject) => {
      Ticket.find({ owner: ObjectId(this.id) })
        .then((results) => {
          const ticketArray = results.map(ticket => new TicketHandler(ticket._id));
          resolve(ticketArray);
        })
        .catch(() => reject(null));
    });
  }
}
