/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3001/graphql',
});

export const client = new ApolloClient({
  networkInterface,
});

export const store = createStore(
  combineReducers({
    root: rootReducer,
    apollo: client.reducer(),
  }),
  {},
  compose(
    applyMiddleware(client.middleware()),
    applyMiddleware(thunk),
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  ),
);
