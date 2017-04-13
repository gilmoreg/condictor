/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, runServer, closeServer } = require('../server');

const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;
const TEST_PORT = process.env.TEST_PORT;
chai.use(chaiHttp);

describe('Server Status', () => {
  beforeEach((done) => {
    runServer(TEST_DATABASE_URL, TEST_PORT)
    .then(() => done())
    .catch(() => new Error('beforeEach fail'));
  });

  afterEach((done) => {
    closeServer()
    .then(() => done());
  });

  it('should give a 200 status', () =>
    chai.request(app)
      .get('/')
      .then(res => expect(res.status).toBe(200))
      .catch(err => err),
    );
});
