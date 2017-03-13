import React from 'react';
import ReactDOM from 'react-dom';
import Condictor from '../../components/Condictor';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Condictor />, div);
});
