const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('http://localhost:3001/graphql'),
});

// Sync Actions
export const CLEAR_TICKETS = 'CLEAR_TICKETS';
export const clearTickets = () => ({
  type: CLEAR_TICKETS,
});

export const UPDATE_TICKET = 'UPDATE_TICKET';
export const updateTicket = ticket => ({
  type: UPDATE_TICKET,
  ticket,
});

export const FILL_TICKET = 'FILL_TICKET';
export const fillTicket = ticket => ({
  type: FILL_TICKET,
  ticket,
});

export const ADD_COMMENT = 'ADD_COMMENT';
export const addComment = (ticketID, comment) => ({
  type: ADD_COMMENT,
  ticketID,
  comment,
});

export const CLEAR_SEARCH_OPTIONS = 'CLEAR_SEARCH_OPTIONS';
export const clearSearchOptions = () => ({
  type: CLEAR_SEARCH_OPTIONS,
});

export const FILL_CONSUMER_OPTION = 'FILL_CONSUMER_OPTION';
export const fillConsumerOption = consumer => ({
  type: FILL_CONSUMER_OPTION,
  consumer,
});

export const FILL_OWNER_OPTION = 'FILL_OWNER_OPTION';
export const fillOwnerOption = owner => ({
  type: FILL_OWNER_OPTION,
  owner,
});

export const FILL_PRODUCT_OPTION = 'FILL_PRODUCT_OPTION';
export const fillProductOption = product => ({
  type: FILL_PRODUCT_OPTION,
  product,
});

export const FILL_USER = 'FILL_USER';
export const fillUser = user => ({
  type: FILL_USER,
  user,
});

// Async Actions
export const LOGIN = 'LOGIN';
export const login = credentials => dispatch =>
  fetch('http://localhost:3001/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password,
    }),
  })
  .then((res) => {
    if (res.status !== 200) throw new Error('Login failed');
    return res.json();
  })
  .then((res) => {
    dispatch(fillUser(res.user));  // todo more
  })
  .catch((err) => {
    dispatch(fillUser({ error: 'Login failed' }));
    console.log('LOGIN ERROR', err);
  });

export const LOGOUT = 'LOGOUT';
export const logout = () => dispatch =>
  fetch('http://localhost:3001/logout', {
    credentials: 'include',
  })
  .then(() => {
    dispatch(fillUser(null));
  });

export const SESSION_CHECK = 'SESSION_CHECK';
export const sessionCheck = () => dispatch =>
  fetch('http://localhost:3001/check', {
    credentials: 'include',
  })
  .then(res => res.json())
  .then((res) => {
    if (res.user) dispatch(fillUser(res.user));
    else dispatch(fillUser(null));
  });

export const SEARCH_TICKETS = 'SEARCH_TICKETS';
export const searchTickets = params => dispatch =>
  new Promise((resolve, reject) => {
    let options = '';
    if (Object.keys(params).length) {
      options = '(';
      Object.keys(params).forEach((key) => {
        options += `${key}: "${params[key]}" `;
      });
      options += ')';
    }
    const query = `
      query {
        search${options} {
          results {
            id
            priority
            created
            closed
            owner {
              username
            }
            description
            consumer {
              name
            }
            product {
              name
            }
            comments {
              id
              created
              owner {
                username
              }
              description
            }
          }
        }
      }
    `;
    client.query(query)
    .then((response) => {
      if (response.search && response.search.results) {
        dispatch(clearTickets());
        response.search.results.forEach(ticket => dispatch(fillTicket(ticket)));
        resolve(response.search.results);
      } else {
        reject('no results');
      }
    })
    .catch(err => reject(err));
  });

export const FILL_SEARCH_OPTIONS = 'FILL_SEARCH_OPTIONS';
export const fillSearchOptions = () => dispatch =>
  new Promise((resolve, reject) => {
    client.query(`
      query {
        products {
          products {
            id
            name
          }
        }
        consumers {
          consumers {
            id
            name
          }
        }
        users {
          users {
            id
            username
          }
        }
      }
    `)
    .then((options) => {
      if (!options) throw new Error('Server response empty');
      dispatch(clearSearchOptions());
      const { consumers } = options.consumers;
      const { products } = options.products;
      const { users } = options.users;
      if (consumers) consumers.forEach(consumer => dispatch(fillConsumerOption(consumer)));
      if (products) products.forEach(product => dispatch(fillProductOption(product)));
      if (users) users.forEach(user => dispatch(fillOwnerOption(user)));
      resolve(options);
    })
    .catch(err => reject(err));
  });

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const createComment = (ticketID, comment) => dispatch =>
  new Promise((resolve, reject) => {
    client.query(`
      mutation {
        newComment(ticketID: "${ticketID}", input: { 
          owner: "${comment.owner}", description: "${comment.description}"
        }) {
          id
          owner {
            username
          }
          description
        }
      }
    `)
    .then((newComment) => {
      if (newComment) dispatch(addComment(ticketID, newComment.newComment));
    })
    .catch(err => reject(err));
  });
