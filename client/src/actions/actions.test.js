/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { mockServer } from 'graphql-tools';
import * as actions from '.';
import schema from '../../../graphql/schema';

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

console.log('mockServer args', schema, root);
const myMockServer = mockServer(schema, root);

describe('Sync Actions', () => {
  it('should create an action to fill a ticket', () => {
    const expectedAction = {
      type: actions.FILL_TICKET,
      ticket: fakeTicket,
    };
    expect(actions.fillTicket(fakeTicket)).toEqual(expectedAction);
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
});

it('should create an action to fill a User', () => {
  const expectedAction = {
    type: actions.FILL_USER,
    user: 'test',
  };
  expect(actions.fillUser('test')).toEqual(expectedAction);
});

describe('Async Actions', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  it('should dispatch FILL_USER with valid data from the server', (done) => {
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

  it('should dispatch FILL_USER with a null user after logout', (done) => {
    fetchMock.mock('http://localhost:3001/logout',
      { logoutSuccess: true },
    );
    const expectedActions = [
      { type: 'FILL_USER', user: { user: null } },
    ];
    const store = mockStore(initialState);
    store.dispatch(actions.logout())
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions).toEqual(expectedActions);
        done();
      });
  });

  it('should create an action to fill search options from the server', (done) => {
    // TODO
    done();
  });

  it('should create an action to search for tickets', (done) => {
    // TODO
    done();
  });
});
