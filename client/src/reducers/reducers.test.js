/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import rootReducer from '.';
import * as actions from '../actions';

const initialState = {
  tickets: [],
  consumers: [],
  owners: [],
  products: [],
  user: null,
};

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

describe('Reducers', () => {
  it('should return current state on undefined action', () => {
    expect(rootReducer(initialState, { type: undefined })).toEqual(initialState);
  });

  it('should clear tickets on CLEAR_TICKETS', () => {
    const ticketState = Object.assign({}, initialState, { tickets: [fakeTicket] });
    expect(rootReducer(ticketState, { type: actions.CLEAR_TICKETS })).toEqual(initialState);
  });

  it('should fill a ticket on FILL_TICKET', () => {
    const ticketState = Object.assign({}, initialState, { tickets: [fakeTicket] });
    expect(
      rootReducer(
        initialState,
        { type: actions.FILL_TICKET, ticket: fakeTicket },
      ),
    )
    .toEqual(ticketState);
  });

  it('should add a comment to a ticket on ADD_COMMENT', () => {
    const updatedTicket = Object.assign({}, fakeTicket, { comments: [fakeComment, fakeComment] });
    const ticketState = Object.assign({}, initialState, { tickets: [fakeTicket] });
    const finalState = Object.assign({}, ticketState, { tickets: [updatedTicket] });
    expect(
      rootReducer(
        ticketState,
        { type: actions.ADD_COMMENT, id: 0, comment: fakeComment },
      ),
    )
    .toEqual(finalState);
  });

  it('should fill a consumer option on FILL_CONSUMER_OPTION', () => {
    const consumerState = Object.assign({}, initialState, { consumers: [fakeConsumer] });
    expect(
      rootReducer(
        initialState,
        { type: actions.FILL_CONSUMER_OPTION, consumer: fakeConsumer },
      ),
    )
    .toEqual(consumerState);
  });

  it('should fill an owner option on FILL_OWNER_OPTION', () => {
    const ownerState = Object.assign({}, initialState, { owners: [fakeOwner] });
    expect(
      rootReducer(
        initialState,
        { type: actions.FILL_OWNER_OPTION, owner: fakeOwner },
      ),
    )
    .toEqual(ownerState);
  });

  it('should fill a product option on FILL_PRODUCT_OPTION', () => {
    const productState = Object.assign({}, initialState, { products: [fakeProduct] });
    expect(
      rootReducer(
        initialState,
        { type: actions.FILL_PRODUCT_OPTION, product: fakeProduct },
      ),
    )
    .toEqual(productState);
  });

  it('should fill a user on FILL_USER', () => {
    const userState = Object.assign({}, initialState, { user: 'test' });
    expect(
      rootReducer(
        initialState,
        { type: actions.FILL_USER, user: 'test' },
      ),
    )
    .toEqual(userState);
  });
});
