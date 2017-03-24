/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import Ticket from '../../models/Ticket';
import User from '../../models/User';
import UserStatsHandler from './UserStats';

export default class StatsHandler {
  total() {
    return new Promise((resolve, reject) => {
      Ticket.find({})
        .then((results) => {
          resolve(results.length);
        })
        .catch(() => reject(null));
    });
  }
  open() {
    return new Promise((resolve, reject) => {
      Ticket.find({ closed: null })
        .then((results) => {
          resolve(results.length);
        })
        .catch(() => reject(null));
    });
  }
  averageOpenTime() {
    return new Promise((resolve, reject) => {
      Ticket.find({})
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
  users() {
    return new Promise((resolve, reject) => {
      User.find({})
        .then((results) => {
          const usersArray = results.map(user => new UserStatsHandler(user._id));
          resolve(usersArray);
        })
        .catch(() => reject(null));
    });
  }
}
