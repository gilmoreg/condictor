import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { store, client } from './store';
import Condictor from './components/Condictor';
import './index.css';

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Condictor />
  </ApolloProvider>,
  document.getElementById('root'),
);
