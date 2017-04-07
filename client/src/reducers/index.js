import * as actions from '../actions';

const initialState = {
  tickets: [],
  user: null,
};

export default function rootReducer(state = initialState, action) {
  console.log(action.type, 'dispatched');
  switch (action.type) {
    case actions.FILL_TICKET: {
      return Object.assign({}, state, { tickets: [...state.tickets, action.ticket] });
    }
    default: return state;
  }
}
