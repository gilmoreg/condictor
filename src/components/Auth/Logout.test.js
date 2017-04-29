/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Logout from './Logout';

it('renders without crashing', () => {
  const wrapper = shallow(<Logout />);
  expect(wrapper.node.type).toEqual('button');
});
