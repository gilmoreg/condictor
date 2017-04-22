/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { Search } from './Search';

it('renders without crashing', () => {
  const wrapper = shallow(<Search />);
  expect(wrapper.node.type).toEqual('form');
});
