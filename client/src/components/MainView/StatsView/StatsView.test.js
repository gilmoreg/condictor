/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import StatsView from './StatsView';

it('renders without crashing', () => {
  const wrapper = shallow(<StatsView />);
  expect(wrapper.node.type).toEqual('div');
});
