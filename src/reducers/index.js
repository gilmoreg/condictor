import * as actions from '../actions';

const initialState = {
  tickets: [],
  newTicket: {},
  consumers: [],
  owners: [],
  products: [],
  user: null,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_COMMENT: {
      const tickets = state.tickets.map((ticket) => {
        if (`${action.ticketID}` !== ticket.id) {
          return ticket;
        }
        return Object.assign({}, ticket, { comments: [...ticket.comments, action.comment] });
      });
      return Object.assign({}, state, { tickets });
    }

    case actions.ADD_TICKET: {
      return Object.assign({},
        state,
        { newTicket: action.ticket, tickets: [...state.tickets, action.ticket] },
      );
    }

    case actions.CLEAR_SEARCH_OPTIONS: {
      return Object.assign({}, state, { consumers: [], owners: [], products: [] });
    }

    case actions.CLEAR_TICKETS: {
      return Object.assign({}, state, { tickets: [] });
    }

    case actions.FILL_CONSUMER_OPTION: {
      return Object.assign({}, state, { consumers: [...state.consumers, action.consumer] });
    }

    case actions.FILL_OWNER_OPTION: {
      return Object.assign({}, state, { owners: [...state.owners, action.owner] });
    }

    case actions.FILL_PRODUCT_OPTION: {
      return Object.assign({}, state, { products: [...state.products, action.product] });
    }

    case actions.FILL_TICKET: {
      return Object.assign({}, state, { tickets: [...state.tickets, action.ticket] });
    }

    case actions.FILL_USER: {
      return Object.assign({}, state, { user: action.user });
    }

    case actions.MARK_TICKET_CLOSED: {
      const tickets = state.tickets.map((ticket) => {
        if (action.id !== ticket.id) {
          return ticket;
        }
        return Object.assign({}, ticket, { closed: action.closed });
      });
      return Object.assign({}, state, { tickets });
    }

    case actions.RESET: {
      return initialState;
    }

    default: return state;
  }
}
