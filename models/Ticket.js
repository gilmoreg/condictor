const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const TicketSchema = mongoose.Schema({
  description: String,
  resource: String,
  consumer: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
