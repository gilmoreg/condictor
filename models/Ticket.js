const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const CommentSchema = mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
  description: String,
});

const TicketSchema = mongoose.Schema({
  description: String,
  resource: String,
  consumer: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
  },
  created: {
    type: Date,
  },
  closed: Date,
  priority: String,
  category: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId /*, ref: 'Comment' */ }],
});

const Ticket = mongoose.model('Ticket', TicketSchema);
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Ticket, Comment };
