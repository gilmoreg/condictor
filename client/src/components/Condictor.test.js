/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Condictor from './Condictor';

it('renders without crashing', () => {
  const wrapper = shallow(<Condictor />);
  expect(wrapper.node.type).toEqual('div');
});
