/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import SearchOption from './SearchOption';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchOption />, div);
});
