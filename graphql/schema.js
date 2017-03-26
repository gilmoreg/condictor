import { buildSchema } from 'graphql';
import CommentHandler from './types/Comment';
import ConsumerHandler from './types/Consumer';
import ProductHandler from './types/Product';
import SearchHandler from './types/Search';
import StatsHandler from './types/Stats';
import TicketHandler from './types/Ticket';
import UserHandler from './types/User';
import UserStatsHandler from './types/UserStats';

export const schema = buildSchema(`
  type Comment {
    id: String,
    owner: User,
    created: String,
    description: String
  }

  type Consumer {
    id: String,
    name: String,
    products: [Product]
  }

  type Product {
    id: String,
    name: String
  }

  type Ticket {
    id: String,
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
    id: String,
    username: String,
    fullname: String,
    tickets: [Ticket]
  }

  type UserStats {
    user: User,
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

  type SearchResults {
    results: [Ticket]
  }

  type Query {
    ticket(id: String): Ticket
    consumer(id: String): Consumer
    product(id: String): Product
    comment(id: String): Comment
    user(id: String): User
    userStats(id: String): UserStats
    stats: Stats
    search(consumer: String, product: String, owner: String, open: Boolean): SearchResults
  }
`);

export const root = {
  ticket: ({ id }) =>
    new TicketHandler(id),
  consumer: ({ id }) =>
    new ConsumerHandler(id),
  product: ({ id }) =>
    new ProductHandler(id),
  comment: ({ id }) =>
    new CommentHandler(id),
  user: ({ id }) =>
    new UserHandler(id),
  userStats: ({ id }) =>
    new UserStatsHandler(id),
  stats: () =>
    new StatsHandler(),
  search: ({ consumer, product, owner, open }) =>
    new SearchHandler(consumer, product, owner, open),
};
