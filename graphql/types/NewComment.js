/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import Comment from '../../models/Comment';
import Ticket from '../../models/Ticket';
import User from '../../models/User';

export default class NewCommentHandler {
  constructor(ticketID, input) {
    if (ticketID && input.owner && input.description) {
      return User.findOne({ username: input.owner })
        .then((user) => {
          if (!user) throw new Error('User not found.');
          Comment.create({
            owner: user._id,
            description: input.description,
            created: Date.now(),
          })
          .then((comment) => {
            if (!comment) throw new Error('Comment not found.');
            console.log('adding comment to ticket', ticketID, comment);
            return Ticket.findByIdAndUpdate(
              ticketID,
              { $push: { comments: comment._id } },
            );
          });
        })
        .catch(err => new Error(err));
    }
    return null;
  }
}
