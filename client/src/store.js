/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export const store = createStore(
  rootReducer,
  // compose(
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    applyMiddleware(thunk),
  //),
);

