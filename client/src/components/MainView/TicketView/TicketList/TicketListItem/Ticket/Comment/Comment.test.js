/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Comment from './Comment';

it('renders without crashing', () => {
  const wrapper = shallow(<Comment />);
  expect(wrapper.node.type).toEqual('div');
});
