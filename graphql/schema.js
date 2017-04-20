import { buildSchema } from 'graphql';
import * as Handlers from './types';

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

  type Consumers {
    consumers: [Consumer]
  }

  type Product {
    id: String,
    name: String
  }

  type Products {
    products: [Product]
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
    comments: [Comment]
  }

  type User {
    id: String,
    username: String,
    fullname: String,
    tickets: [Ticket]
  }

  type Users {
    users: [User]
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
  
  input NewComment {
    owner: String,
    description: String
  }

  input NewTicket {
    description: String,
    product: String,
    consumer: String,
    owner: String,
    priority: Int
  }

  input UpdateTicket {
    id: String,
    description: String,
    product: String,
    consumer: String,
    owner: String,
    priority: Int,
    closed: String
  }

  type Query {
    ticket(id: String): Ticket
    consumer(id: String): Consumer
    consumers: Consumers
    product(id: String): Product
    products: Products
    comment(id: String): Comment
    user(id: String): User
    users: Users
    userStats(id: String): UserStats
    stats: Stats
    search(consumer: String, product: String, owner: String, open: Boolean): SearchResults
  }

  type Mutation {
    newComment(ticketID: String!, input: NewComment): Comment
    newTicket(input: NewTicket): Ticket
    updateTicket(id: String!, input: UpdateTicket): Ticket
    closeTicket(id: String!): Ticket
  }
`);

export const root = {
  ticket: ({ id }) =>
    new Handlers.TicketHandler(id),
  consumer: ({ id }) =>
    new Handlers.ConsumerHandler(id),
  consumers: () =>
    new Handlers.ConsumersHandler(),
  product: ({ id }) =>
    new Handlers.ProductHandler(id),
  products: () =>
    new Handlers.ProductsHandler(),
  comment: ({ id }) =>
    new Handlers.CommentHandler(id),
  user: ({ id }) =>
    new Handlers.UserHandler(id),
  users: () =>
    new Handlers.UsersHandler(),
  userStats: ({ id }) =>
    new Handlers.UserStatsHandler(id),
  stats: () =>
    new Handlers.StatsHandler(),
  search: ({ consumer, product, owner, open }) =>
    new Handlers.SearchHandler(consumer, product, owner, open),
  newComment: ({ ticketID, input }) =>
    new Handlers.NewCommentHandler(ticketID, input),
  newTicket: ({ input }) =>
    new Handlers.NewTicketHandler(input),
  closeTicket: ({ id }) =>
    new Handlers.CloseTicketHandler(id),
};
