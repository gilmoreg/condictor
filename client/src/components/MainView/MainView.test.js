/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import MainView from './MainView';

it('renders without crashing', () => {
  const wrapper = shallow(<MainView />);
  expect(wrapper.node.type).toEqual('div');
});
