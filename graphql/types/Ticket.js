import Ticket from '../../models/Ticket';
import ProductHandler from './Product';
import ConsumerHandler from './Consumer';
import CommentHandler from './Comment';
import UserHandler from './User';

export default class TicketHandler {
  constructor(id) {
    this.id = id;
    this.ticket = null;
    this.Product = null;
    this.Owner = null;
    this.Comments = null;
  }
  fetchTicket() {
    return new Promise((resolve, reject) => {
      if (this.ticket) resolve(this.ticket);
      Ticket.findById(this.id)
        .then((ticket) => {
          this.ticket = ticket;
          resolve(ticket);
        })
        .catch(err => reject(err));
    });
  }
  description() {
    return this.fetchTicket()
      .then(ticket => ticket.description)
      .catch(() => null);
  }
  category() {
    return this.fetchTicket()
      .then(ticket => ticket.category)
      .catch(() => null);
  }
  priority() {
    return this.fetchTicket()
      .then(ticket => ticket.priority)
      .catch(() => null);
  }
  created() {
    return this.fetchTicket()
      .then(ticket => ticket.created)
      .catch(() => null);
  }
  closed() {
    return this.fetchTicket()
      .then(ticket => ticket.closed)
      .catch(() => null);
  }
  product() {
    return this.fetchTicket()
      .then(ticket => new ProductHandler(ticket.product))
      .catch(() => null);
  }
  consumer() {
    return this.fetchTicket()
      .then(ticket => new ConsumerHandler(ticket.consumer))
      .catch(() => null);
  }
  owner() {
    return this.fetchTicket()
      .then(ticket => new UserHandler(ticket.owner))
      .catch(() => null);
  }
  comments() {
    return this.fetchTicket()
      .then(ticket => ticket.comments.map(pid => new CommentHandler(pid)))
      .catch(() => null);
  }
}
