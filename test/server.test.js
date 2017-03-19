/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');

const should = chai.should();
chai.use(chaiHttp);

describe('Server Status', () => {
  before(() => runServer());
  after(() => closeServer());

  it('should give a 200 status', () => {
    chai.request(app)
      .get('/')
      .then((res) => {
        res.should.have.status(200);
      })
      .catch((err) => {
        should.fail();
      });
  });
});
