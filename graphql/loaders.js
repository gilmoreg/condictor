import DataLoader from 'dataloader';
import Comment from '../models/Comment';
import Consumer from '../models/Consumer';
import Product from '../models/Product';
import Ticket from '../models/Ticket';
import User from '../models/User';

const CommentLoader = new DataLoader(
  keys => Promise.all(keys.map(key => Comment.findById(key))),
);

const ConsumerLoader = new DataLoader(
  keys => Promise.all(keys.map(key => Consumer.findById(key))),
);

const ProductLoader = new DataLoader(
  keys => Promise.all(keys.map(key => Product.findById(key))),
);

const TicketLoader = new DataLoader(
  keys => Promise.all(keys.map(key => Ticket.findById(key))),
);

const UserLoader = new DataLoader(
  keys => Promise.all(keys.map(key => User.findById(key))),
);

module.exports = {
  CommentLoader,
  ConsumerLoader,
  ProductLoader,
  TicketLoader,
  UserLoader,
};
