/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '.';

const mockStore = configureMockStore([thunk]);

const fakeComment = {
  owner: 'test',
  created: Date.now(),
  description: 'test',
};

const fakeTicket = {
  id: '0',
  description: 'test',
  owner: 'test',
  product: 'test',
  consumer: 'test',
  created: Date.now(),
  closed: Date.now(),
  priority: 'test',
  comments: [fakeComment],
};

describe('Actions', () => {
  it('should create an action to fill a ticket', () => {
    const expectedAction = {
      type: actions.FILL_TICKET,
      ticket: fakeTicket,
    };
    expect(actions.fillTicket(fakeTicket)).toEqual(expectedAction);
  });
});
