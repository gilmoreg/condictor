/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3001/graphql',
});

export const client = new ApolloClient({
  networkInterface,
});

let reduxDevtools;

if (typeof window !== 'undefined') {
  reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__();
} else {
  reduxDevtools = global.__REDUX_DEVTOOLS_EXTENSION__ &&
  global.__REDUX_DEVTOOLS_EXTENSION__();
}

export default createStore(
  combineReducers({
    root: rootReducer,
    apollo: client.reducer(),
  }),
  reduxDevtools,
  applyMiddleware(thunk),
);
