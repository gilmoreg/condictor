import * as actions from '../actions';

const initialState = {
  tickets: [],
  searchOptions: {},
  user: null,
};

export default function rootReducer(state = initialState, action) {
  console.log(action.type, 'dispatched');
  switch (action.type) {
    case actions.FILL_TICKET: {
      const tickets = state.tickets;
      tickets.push(action.ticket);
      return {
        ...tickets,
        searchOptions: state.searchOptions,
        user: state.user,
      };
    }
    case actions.UPDATE_SEARCH: {
      console.log('actions.UPDATE_SEARCH', action.options);
      return {
        tickets: state.tickets,
        searchOptions: action.options,
        user: state.user,
      };
    }
    default: return state;
  }
}
