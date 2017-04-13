/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { TicketList } from './TicketList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TicketList />, div);
});
