/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './Sidebar';

it('renders without crashing', () => {
  const wrapper = shallow(<Sidebar />);
  expect(wrapper.node.type).toEqual('div');
});
