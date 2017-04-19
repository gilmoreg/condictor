import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const TicketSchema = mongoose.Schema({
  description: String,
  product: mongoose.Schema.Types.ObjectId,
  consumer: mongoose.Schema.Types.ObjectId,
  owner: mongoose.Schema.Types.ObjectId,
  created: Date,
  closed: Date,
  priority: String,
  comments: [mongoose.Schema.Types.ObjectId],
});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
