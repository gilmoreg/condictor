import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { store, client } from './store';
import Condictor from './components/Condictor';
import './index.css';

console.log(store);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Condictor />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);
