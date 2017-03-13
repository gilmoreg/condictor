/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import TicketView from './TicketView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TicketView />, div);
});
