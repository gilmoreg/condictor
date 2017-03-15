/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import StatsView from './StatsView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StatsView />, div);
});
