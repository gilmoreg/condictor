/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Ticket from './Ticket';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Ticket />, div);
});
