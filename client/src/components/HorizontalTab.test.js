/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import HorizontalTab from './HorizontalTab';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HorizontalTab />, div);
});
