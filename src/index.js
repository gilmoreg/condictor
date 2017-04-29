import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Condictor from './components/Condictor';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Condictor />
  </Provider>,
  document.getElementById('root'),
);
