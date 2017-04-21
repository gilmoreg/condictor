/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import * as actions from '.';

const mockStore = configureMockStore([thunk]);

const fakeOwner = {
  username: 'test',
};

const fakeProduct = {
  name: 'test',
};

const fakeConsumer = {
  name: 'test',
  products: [fakeProduct],
};

const fakeComment = {
  owner: fakeOwner,
  created: Date.now(),
  description: 'test',
};

const fakeTicket = {
  id: '0',
  description: 'test',
  owner: fakeOwner,
  product: fakeProduct,
  consumer: fakeConsumer,
  created: Date.now(),
  closed: Date.now(),
  priority: 'test',
  comments: [fakeComment],
};

const initialState = {
  tickets: [],
  consumers: [],
  owners: [],
  products: [],
  user: null,
};

const root = {
  ticket: ({ id }) => fakeTicket,
  consumer: ({ id }) => fakeConsumer,
  consumers: () => [fakeConsumer],
  product: ({ id }) => fakeProduct,
  products: () => [fakeProduct],
  comment: ({ id }) => fakeComment,
  user: ({ id }) => fakeOwner,
  users: () => [fakeOwner],
  search: ({ consumer, product, owner, open }) => [fakeTicket],
};

describe('Sync Actions', () => {
  // ADD_COMMENT
  // ADD_TICKET
  // CLEAR_SEARCH_OPTIONS
  it('should create an action to clear tickets', () => {
    const expectedAction = {
      type: actions.CLEAR_TICKETS,
    };
    expect(actions.clearTickets()).toEqual(expectedAction);
  });

  it('should create an action to fill the Consumer options', () => {
    const expectedAction = {
      type: actions.FILL_CONSUMER_OPTION,
      consumer: fakeConsumer,
    };
    expect(actions.fillConsumerOption(fakeConsumer)).toEqual(expectedAction);
  });

  it('should create an action to fill the Owner options', () => {
    const expectedAction = {
      type: actions.FILL_OWNER_OPTION,
      owner: fakeOwner,
    };
    expect(actions.fillOwnerOption(fakeOwner)).toEqual(expectedAction);
  });

  it('should create an action to fill the Product options', () => {
    const expectedAction = {
      type: actions.FILL_PRODUCT_OPTION,
      product: fakeProduct,
    };
    expect(actions.fillProductOption(fakeProduct)).toEqual(expectedAction);
  });

  it('should create an action to fill a ticket', () => {
    const expectedAction = {
      type: actions.FILL_TICKET,
      ticket: fakeTicket,
    };
    expect(actions.fillTicket(fakeTicket)).toEqual(expectedAction);
  });

  it('should create an action to fill a User', () => {
    const expectedAction = {
      type: actions.FILL_USER,
      user: 'test',
    };
    expect(actions.fillUser('test')).toEqual(expectedAction);
  });

  // MARK_TICKET_CLOSED
});

describe('Async Non-GraphQL Actions', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  it('LOGIN should dispatch FILL_USER with valid data from the server', (done) => {
    fetchMock.mock('http://localhost:3001/login',
      { message: 'Login successful', user: 'test' },
      { method: 'post' },
    );
    const expectedActions = [
      { type: actions.FILL_USER, user: 'test' },
    ];
    const store = mockStore(initialState);
    store.dispatch(actions.login({ username: 'test', password: 'test' }))
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions).toEqual(expectedActions);
        done();
      });
  });

  it('LOGOUT should dispatch FILL_USER with a null user after logout', (done) => {
    fetchMock.mock('http://localhost:3001/logout',
      { logoutSuccess: true },
    );
    const expectedActions = [
      { type: 'FILL_USER', user: null },
    ];
    const store = mockStore(initialState);
    store.dispatch(actions.logout())
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions).toEqual(expectedActions);
        done();
      });
  });

  // SESSION_CHECK
});

/*
describe('Async GraphQL actions', () => {

  // CLOSE_TICKET
  // CREATE_COMMENT
  // CREATE_TICKET
  // FILL_SEARCH_OPTIONS
  // SEARCH_TICKETS


  let server = null;
  beforeEach(() => {
    server = sinon.fakeServer.create();
  });

  afterEach(() => {
    server.restore();
  });

  it('should create an action to fill search options from the server', (done) => {
    const okResponse = [
      200,
      { 'Content-type': 'application/json' },
      '{"hello":"world"}',
    ];
    server.respondWith('POST', '/graphql', okResponse);
    const store = mockStore(initialState);
    store.dispatch(actions.searchTickets({}))
      .then((res) => {
        console.log('async search', res);
        done();
      });
  });

  it('should create an action to search for tickets', (done) => {
    // TODO
    done();
  });
}); */
