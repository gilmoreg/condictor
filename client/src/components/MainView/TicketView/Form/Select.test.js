/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Select from './Select';

it('renders without crashing', () => {
  const wrapper = shallow(<Select />);
  expect(wrapper.node.type).toEqual('div');
});
