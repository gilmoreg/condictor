/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import NewTicket from './NewTicket';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewTicket />, div);
});
