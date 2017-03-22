import { buildSchema } from 'graphql';
import CommentHandler from './types/Comment';
import TicketHandler from './types/Ticket';
import UserHandler from './types/User';

export const schema = buildSchema(`
  type Comment {
    owner: String,
    created: String,
    description: String
  }

  type Consumer {
    name: String,
    products: [Product]
  }

  type Product {
    name: String
  }

  type Ticket {
    description: String,
    product: Product,
    consumer: Consumer,
    owner: User,
    created: String,
    closed: String,
    priority: Int,
    category: String,
    comments: [Comment]
  }

  type User {
    username: String,
    fullname: String,
    tickets: [Ticket]
  }

  type Query {
    ticket(id: String): Ticket
    comment(id: String): Comment
    user(id: String): User
  }
`);

export const root = {
  ticket: ({ id }) =>
    new TicketHandler(id),
  comment: ({ id }) =>
    new CommentHandler(id),
  user: ({ id }) =>
    new UserHandler(id),
};
