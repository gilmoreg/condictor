const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('http://localhost:3001/graphql', { credentials: false }),
});

// Sync Actions
export const FILL_TICKET = 'FILL_TICKET';
export const fillTicket = ticket => ({
  type: FILL_TICKET,
  ticket,
});

export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const updateSearch = options => ({
  type: UPDATE_SEARCH,
  options,
});
// Async Actions

/*
export const GET_TICKET = 'GET_TICKET';
export const getTicket = id => dispatch =>
  new Promise((resolve, reject) => {
    client.query(`
      query {
        ticket(id: "${id}") {
          id
          owner {
            username
          }
          description
          created
          consumer {
            name
          }
          product {
            name
          }
          comments {
            created
            owner {
              username
            }
            description
          }
        }
      }
    `)
    .then((response) => {
      dispatch(fillTicket(response.data));
      resolve(response.data);
    })
    .catch(err => reject(err));
  });
*/
export const SEARCH_TICKETS = 'SEARCH_TICKETS';
export const searchTickets = params => dispatch =>
  new Promise((resolve, reject) => {
    console.log('searchTickets', params);
    let options = '';
    if (params && params.length) {
      options = `(${params})`;
    }
    client.query(`
      query {
        search${options} {
          results {
            id
            priority
            created
            closed
          }
        }
      }
    `)
    .then((response) => {
      console.log('searchTickets response', response.search);
      if (response.search && response.search.results) {
        response.search.results.forEach(ticket => dispatch(fillTicket(ticket)));
        resolve(response.search.results);
      } else {
        reject('no results');
      }
    })
    .catch(err => reject(err));
  });
