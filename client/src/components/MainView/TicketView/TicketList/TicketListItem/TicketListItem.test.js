/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import TicketListItem from './TicketListItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TicketListItem />, div);
});
