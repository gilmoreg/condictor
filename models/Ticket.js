const mongoose = require('mongoose');
const Comment = require('./Comment');

mongoose.Promise = global.Promise;

const TicketSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  resource: String,
  consumer: String,
  owner: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
  closed: Date,
  priority: String,
  category: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = { Ticket };
