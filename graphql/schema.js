import { buildSchema } from 'graphql';
import CommentHandler from './types/Comment';
import StatsHandler from './types/Stats';
import TicketHandler from './types/Ticket';
import TicketsHandler from './types/Tickets';
import UserHandler from './types/User';
import UserStatsHandler from './types/UserStats';

export const schema = buildSchema(`
  type Comment {
    owner: User,
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

  type TicketList {
    open: [Ticket],
    all: [Ticket]
  }

  type User {
    id: String,
    username: String,
    fullname: String,
    tickets: [Ticket]
  }

  type UserStats {
    id: String,
    owned: Int,
    open: Int,
    averageOpenTime: Int
  }

  type Stats {
    total: Int,
    open: Int,
    averageOpenTime: Int,
    users: [UserStats]
  }

  type Query {
    ticket(id: String): Ticket
    ticketList: TicketList
    comment(id: String): Comment
    user(id: String): User
    userStats(id: String): UserStats
    stats: Stats
  }
`);

export const root = {
  ticket: ({ id }) =>
    new TicketHandler(id),
  ticketList: () =>
    new TicketsHandler(),
  comment: ({ id }) =>
    new CommentHandler(id),
  user: ({ id }) =>
    new UserHandler(id),
  userStats: ({ id }) =>
    new UserStatsHandler(id),
  stats: () =>
    new StatsHandler(),
};
