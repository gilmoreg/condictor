/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Condictor from './Condictor';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Condictor />, div);
});
