/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import * as Models from '../models';

const chai = require('chai');
const mongoose = require('mongoose');
const { app, runServer, closeServer } = require('../server');

const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;

describe('Mongo/Mongoose', () => {
  beforeEach(() => {
    runServer(TEST_DATABASE_URL)
    .catch(() => new Error('beforeEach fail'));
  });

  afterEach(() => {
    mongoose.connection.dropDatabase()
      .then(() => closeServer())
      .catch(err => new Error(err));
  });

  it('should create a new Comment', () =>
    Models.Comment.create({ description: 'test' })
      .then((comment) => {
        expect(comment.description).toBe('test');
      }));

  it('should create a new Product', () =>
    Models.Product.create({ name: 'test' })
      .then((product) => {
        expect(product.name).toEqual('test');
      }));

  it('should create a new Consumer', () =>
    Models.Consumer.create({ name: 'test' })
      .then((consumer) => {
        expect(consumer.name).toEqual('test');
      }));

  it('should create a new Ticket', () =>
    Models.Ticket.create({ description: 'test' })
      .then((ticket) => {
        expect(ticket.description).toEqual('test');
      }));

  it('should create a new User', () =>
    Models.User.create({ username: 'test', password: 'test' })
      .then((user) => {
        expect(user.username).toEqual('test');
      }));
});
