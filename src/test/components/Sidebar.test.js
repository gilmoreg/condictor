import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../../components/Sidebar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sidebar />, div);
});
