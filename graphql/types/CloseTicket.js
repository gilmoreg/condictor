/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import Ticket from '../../models/Ticket';
import TicketHandler from './Ticket';

export default class CloseTicketHandler {
  constructor(id) {
    if (id) {
      Ticket.findByIdAndUpdate(id, { closed: Date.now() })
      .then(ticket => new TicketHandler(ticket))
      .catch(err => new Error(err));
    }
    return null;
  }
}
