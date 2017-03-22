import Comment from '../../models/Comment';

export default class CommentHandler {
  constructor(id) {
    this.id = id;
    this.comment = null;
  }
  fetchComment() {
    if (this.comment) return this.comment;
    return new Promise((resolve, reject) => {
      Comment.findById(this.id)
        .then((comment) => {
          this.comment = comment;
          resolve(comment);
        })
        .catch(err => reject(err));
    });
  }
  owner() {
    if (this.comment) return this.comment.owner;
    return this.fetchComment()
      .then(comment => comment.owner)
      .catch(() => null);
  }
  created() {
    if (this.comment) return this.comment.created;
    return this.fetchComment()
      .then(comment => comment.created)
      .catch(() => null);
  }
  description() {
    if (this.comment) return this.comment.description;
    return this.fetchComment()
      .then(comment => comment.description)
      .catch(() => null);
  }
}
