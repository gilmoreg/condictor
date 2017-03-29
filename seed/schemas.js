const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);

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

const Comment = mongoose.model('Comment', CommentSchema);

const TicketSchema = mongoose.Schema({
  description: String,
  product: mongoose.Schema.Types.ObjectId,
  consumer: mongoose.Schema.Types.ObjectId,
  owner: mongoose.Schema.Types.ObjectId,
  created: Date,
  closed: Date,
  priority: String,
  category: String,
  comments: [mongoose.Schema.Types.ObjectId],
});

const Ticket = mongoose.model('Ticket', TicketSchema);

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('Product', ProductSchema);

const ConsumerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products: [mongoose.Schema.Types.ObjectId],
});

const Consumer = mongoose.model('Consumer', ConsumerSchema);

module.exports = { User, Comment, Ticket, Consumer, Product };
