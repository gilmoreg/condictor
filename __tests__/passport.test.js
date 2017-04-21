/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { TEST_DATABASE_URL, TEST_PORT } from '../config';

const mongoose = require('mongoose');
const request = require('supertest');
const { app, runServer, closeServer } = require('../server');

mongoose.Promise = global.Promise;
const agent = request.agent(app);

describe('Passport', () => {
  beforeEach((done) => {
    runServer(TEST_DATABASE_URL, TEST_PORT)
      .then(() => done())
      .catch(err => new Error(err));
  });

  afterEach((done) => {
    mongoose.connection.dropDatabase()
      .then(() => closeServer())
      .then(() => done())
      .catch(err => new Error(err));
  });

  it('should create a new user and sign in', (done) => {
    agent
      .post('/signup')
      .send({ username: 'admin', password: 'test' })
      .then((res) => {
        expect(res.status).toEqual(201);
        done();
      });
  });
});
