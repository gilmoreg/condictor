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

const ConsumersLoader = new DataLoader(
  keys => Promise.all(keys.map(() => Consumer.find())),
);

const ProductLoader = new DataLoader(
  keys => Promise.all(keys.map(key => Product.findById(key))),
);

const ProductsLoader = new DataLoader(
  keys => Promise.all(keys.map(() => Product.find())),
);

const TicketLoader = new DataLoader(
  keys => Promise.all(keys.map(key => Ticket.findById(key))),
);

const TicketsLoader = new DataLoader(
  keys => Promise.all(keys.map(() => Ticket.find())),
);

const UserLoader = new DataLoader(
  keys => Promise.all(keys.map(key => User.findById(key))),
);

const UsersLoader = new DataLoader(
  keys => Promise.all(keys.map(() => User.find())),
);

module.exports = {
  CommentLoader,
  ConsumerLoader,
  ConsumersLoader,
  ProductLoader,
  ProductsLoader,
  TicketLoader,
  TicketsLoader,
  UserLoader,
  UsersLoader,
};
