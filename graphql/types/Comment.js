import { CommentLoader } from '../loaders';
import UserHandler from './User';

export default class CommentHandler {
  constructor(id) {
    this.id = id;
    this.comment = null;
  }
  fetchComment() {
    return new Promise((resolve, reject) => {
      if (this.comment) resolve(this.comment);
      CommentLoader.load(this.id)
        .then((comment) => {
          this.comment = comment;
          resolve(comment);
        })
        .catch(err => reject(err));
    });
  }
  id() {
    return this.id;
  }
  owner() {
    return this.fetchComment()
      .then(ticket => new UserHandler(ticket.owner))
      .catch(() => null);
  }
  created() {
    return this.fetchComment()
      .then(comment => comment.created)
      .catch(() => null);
  }
  description() {
    return this.fetchComment()
      .then(comment => comment.description)
      .catch(() => null);
  }
}
