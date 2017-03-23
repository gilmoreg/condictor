/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const mongoose = require('mongoose');
const { app, runServer, closeServer } = require('../server');
const Comment = require('../models/Comment');
const Consumer = require('../models/Consumer');
const Product = require('../models/Product');
const Ticket = require('../models/Ticket');
const User = require('../models/User');

const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;

describe('Mongo/Mongoose', () => {
  beforeAll(() => {
    runServer(TEST_DATABASE_URL)
    .catch(() => new Error('beforeAll fail'));
  });
  afterAll(() => {
    closeServer()
      .then(() => mongoose.connection.dropDatabase())
      .catch(err => new Error(err));
  });

  it('should create a new Comment', () => {
    Comment.create({ description: 'test' })
      .then((comment) => {
        expect(comment.description).toEqual('test');
      })
      .catch(err => new Error(err));
  });

  it('should create a new Consumer', () => {
    Consumer.create({ name: 'test' })
      .then((consumer) => {
        expect(consumer.name).toEqual('test');
      })
      .catch(err => new Error(err));
  });

  it('should create a new Product', () => {
    Product.create({ name: 'test' })
      .then((product) => {
        expect(product.name).toEqual('test');
      })
      .catch(err => new Error(err));
  });

  it('should create a new Ticket', () => {
    Ticket.create({ description: 'test' })
      .then((ticket) => {
        expect(ticket.description).toEqual('test');
      })
      .catch(err => new Error(err));
  });

  it('should create a new User', () => {
    User.create({ username: 'test', password: 'test' })
      .then((user) => {
        expect(user.username).toEqual('test');
      })
      .catch(err => new Error(err));
  });
});
