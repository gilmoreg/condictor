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
  it('should create an action to add a comment', () => {
    const expectedAction = {
      type: actions.ADD_COMMENT,
      ticketID: '0',
      comment: fakeComment,
    };
    expect(actions.addComment('0', fakeComment)).toEqual(expectedAction);
  });

  it('should create an action to add a ticket', () => {
    const expectedAction = {
      type: actions.ADD_TICKET,
      ticket: fakeTicket,
    };
    expect(actions.addTicket(fakeTicket)).toEqual(expectedAction);
  });

  it('should create an action to clear search options', () => {
    const expectedAction = {
      type: actions.CLEAR_SEARCH_OPTIONS,
    };
    expect(actions.clearSearchOptions()).toEqual(expectedAction);
  });

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

  it('should create an action to mark a ticket closed', () => {
    const closed = Date.now();
    const expectedAction = {
      type: actions.MARK_TICKET_CLOSED,
      id: '0',
      closed,
    };
    expect(actions.markTicketClosed('0', closed))
    .toEqual(expectedAction);
  });

  it('should create an action to reset state', () => {
    const expectedAction = {
      type: actions.RESET,
    };
    expect(actions.reset())
    .toEqual(expectedAction);
  });
});

describe('Async Non-GraphQL Actions', () => {
  afterEach(() => {
    fetchMock.restore();
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

  it('LOGOUT should dispatch RESET after logout', (done) => {
    fetchMock.mock('http://localhost:3001/logout',
      { logoutSuccess: true },
    );
    const expectedActions = [
      { type: actions.RESET },
    ];
    const store = mockStore(initialState);
    store.dispatch(actions.logout())
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions).toEqual(expectedActions);
        done();
      });
  });

  it('SESSION_CHECK should dispatch FILL_USER with a valid user if logged in', (done) => {
    fetchMock.mock('http://localhost:3001/check',
      { user: 'test' },
    );
    const expectedActions = [
      { type: actions.FILL_USER, user: 'test' },
    ];
    const store = mockStore(initialState);
    store.dispatch(actions.sessionCheck())
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions).toEqual(expectedActions);
        done();
      });
  });

  it('SESSION_CHECK should dispatch FILL_USER with null if not logged in', (done) => {
    fetchMock.mock('http://localhost:3001/check',
      {},
    );
    const expectedActions = [
      { type: actions.RESET },
    ];
    const store = mockStore(initialState);
    store.dispatch(actions.sessionCheck())
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions).toEqual(expectedActions);
        done();
      });
  });
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
        done();
      });
  });

  it('should create an action to search for tickets', (done) => {
    // TODO
    done();
  });
}); */
