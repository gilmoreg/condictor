/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import Ticket from '../../models/Ticket';
import TicketHandler from './Ticket';

export default class CloseTicketHandler {
  constructor(id) {
    console.log('CloseTicketHandler', id);
    if (id) {
      return Ticket.findByIdAndUpdate(id, { closed: Date.now() })
      .then(ticket => new TicketHandler(ticket._id))
      .catch(err => new Error(err));
    }
    return null;
  }
}
