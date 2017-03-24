import Ticket from '../../models/Ticket';

export default class TicketsHandler {
  open() {
    return new Promise((resolve, reject) => {
      Ticket.find({ closed: null })
        .then((tickets) => {
          resolve(tickets);
        })
        .catch(err => reject(err));
    });
  }
  all() {
    return new Promise((resolve, reject) => {
      Ticket.find({})
        .then((tickets) => {
          resolve(tickets);
        })
        .catch(err => reject(err));
    });
  }
}
