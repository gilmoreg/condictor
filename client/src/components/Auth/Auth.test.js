/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { Auth } from './Auth';

it('renders without crashing', () => {
  const wrapper = shallow(<Auth />);
  expect(wrapper.node.type).toEqual('div');
});
