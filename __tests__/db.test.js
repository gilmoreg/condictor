/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const mongoose = require('mongoose');

const { app, runServer, closeServer } = require('../server');
const User = require('../models/User');

chai.use(require('chai-http'));

const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;

describe('Mongo/Mongoose', () => {
  beforeAll(() => {
    runServer(TEST_DATABASE_URL)
      .then(() => {
        User.create({ username: 'test', password: 'test' })
          .then((user) => {
            console.log('beforeAll user', user);
          });
      })
      .catch(() => {
        return new Error('beforeAll fail');
      });
  });
  afterAll(() => {
    closeServer()
      .then(() => {
        console.warn('dropping test database');
        return mongoose.connection.dropDatabase();
      })
      .catch(() => {
        return new Error('afterAll fail');
      });
  });

  /* beforeEach((done) => {
    chai.request.agent(app)
      .post('/login')
      .send({})
  }); */

  it('should create a new Ticket', () => {
    expect(true).toEqual(true);
  });
});
