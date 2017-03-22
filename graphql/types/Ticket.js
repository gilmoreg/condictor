import Ticket from '../../models/Ticket';
import ProductHandler from './Product';
import ConsumerHandler from './Consumer';
import CommentHandler from './Comment';

export default class TicketHandler {
  constructor(id) {
    this.id = id;
    this.ticket = null;
    this.Product = null;
    this.Consumer = null;
    this.Owner = null;
    this.Comments = null;
  }
  fetchTicket() {
    if (this.ticket) return this.ticket;
    return new Promise((resolve, reject) => {
      Ticket.findById(this.id)
        .then((ticket) => {
          this.ticket = ticket;
          resolve(ticket);
        })
        .catch(err => reject(err));
    });
  }
  description() {
    if (this.ticket) return this.ticket.description;
    return this.fetchTicket()
      .then(ticket => ticket.description)
      .catch(() => null);
  }
  category() {
    if (this.ticket) return this.ticket.category;
    return this.fetchTicket()
      .then(ticket => ticket.category)
      .catch(() => null);
  }
  priority() {
    if (this.ticket) return this.ticket.priority;
    return this.fetchTicket()
      .then(ticket => ticket.priority)
      .catch(() => null);
  }
  created() {
    if (this.ticket) return this.ticket.created;
    return this.fetchTicket()
      .then(ticket => ticket.created)
      .catch(() => null);
  }
  closed() {
    if (this.ticket) return this.ticket.closed;
    return this.fetchTicket()
      .then(ticket => ticket.closed)
      .catch(() => null);
  }
  product() {
    if (this.ticket && this.Product) return this.Product;
    if (this.ticket) {
      this.Product = new ProductHandler(this.ticket.product);
      return this.Product;
    }
    return this.fetchTicket()
      .then((ticket) => {
        this.ticket = ticket;
        this.Product = new ProductHandler(this.ticket.product);
        return this.Product;
      })
      .catch(() => null);
  }
  consumer() {
    if (this.ticket && this.Consumer) return this.Consumer;
    if (this.ticket) {
      this.Consumer = new ConsumerHandler(this.ticket.consumer);
      return this.Consumer;
    }
    return this.fetchTicket()
      .then((ticket) => {
        this.ticket = ticket;
        this.Consumer = new ConsumerHandler(this.ticket.consumer);
        return this.Consumer;
      })
      .catch(() => null);
  }
  owner() {
    if (this.ticket && this.Owner) return this.Owner;
    if (this.ticket) {
      this.Owner = new ConsumerHandler(this.ticket.owner);
      return this.Owner;
    }
    return this.fetchTicket()
      .then((ticket) => {
        this.ticket = ticket;
        this.Owner = new ConsumerHandler(this.ticket.owner);
        return this.Owner;
      })
      .catch(() => null);
  }
  comments() {
    if (this.ticket && this.Comments) return this.Comments;
    if (this.ticket) {
      this.Comments = this.ticket.comments.map(pid => new CommentHandler(pid));
      return this.Comments;
    }
    return this.fetchTicket()
      .then((ticket) => {
        this.ticket = ticket;
        this.Comments = this.ticket.comments.map(pid => new CommentHandler(pid));
        return this.Comments;
      })
      .catch(() => null);
  }
}
