import User from '../../models/User';
import CommentHandler from './Comment';
import TicketHandler from './Ticket';

export default class UserHandler {
  constructor(id) {
    this.id = id;
    this.user = null;
    this.Tickets = null;
  }
  fetchUser() {
    if (this.user) return this.user;
    return new Promise((resolve, reject) => {
      User.findById(this.id)
        .then((user) => {
          this.user = user;
          resolve(user);
        })
        .catch(err => reject(err));
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
    if (this.user && this.Tickets) return this.Comments;
    if (this.user) {
      this.Comments = this.ticket.comments.map(pid => new CommentHandler(pid));
      return this.Comments;
    }
    return this.fetchUser()
      .then(() => {
        this.Tickets = this.user.tickets.map(tid => new TicketHandler(tid));
        return this.Tickets;
      })
      .catch(() => null);
  }
}
