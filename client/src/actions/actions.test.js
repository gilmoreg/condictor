/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
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

describe('Async Actions', () => {
  it('should create an action to fill search options from the server', (done) => {
    // TODO
    done();
  });

  it('should create an action to search for tickets', (done) => {
    // TODO
    done();
  });
});
