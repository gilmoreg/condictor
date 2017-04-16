/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import Comment from '../../models/Comment';
import Ticket from '../../models/Ticket';

export default class NewCommentHandler {
  constructor(ticketID, input) {
    if (ticketID && input.owner && input.description) {
      return Comment.create({
        owner: input.owner,
        description: input.description,
        created: Date.now(),
      })
      .then((comment) => {
        if (comment) {
          return Ticket.findByIdAndUpdate(
            ticketID,
            { $push: { comments: comment._id } },
          )
          .catch(err => new Error(err));
        }
        return new Error('Comment not created.');
      })
      .catch(err => new Error(err));
    }
    return null;
  }
}
