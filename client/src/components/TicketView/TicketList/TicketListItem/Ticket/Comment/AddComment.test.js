/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import AddComment from './Comment';

it('renders without crashing', () => {
  const wrapper = shallow(<AddComment />);
  expect(wrapper.node.type).toEqual('div');
});
