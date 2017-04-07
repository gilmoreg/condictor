import * as actions from '../actions';

const initialState = {
  tickets: [{}],
  user: null,
};

export default function rootReducer(state = initialState, action) {
  console.log(action.type, 'dispatched');
  switch (action.type) {
    case actions.FILL_TICKET: {
      const tickets = state.tickets || [];
      tickets.push(action.ticket);
      return Object.assign({}, state, { tickets });
    }
    default: return state;
  }
}
