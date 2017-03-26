import * as actions from '../actions';

const initialState = {
  tickets: [],
  user: null,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FILL_TICKET: {
      const tickets = state.tickets;
      tickets.push(action.ticket);
      return { tickets, user: state.user };
    }
    default: return state;
  }
}
