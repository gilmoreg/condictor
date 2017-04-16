/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Ticket from './Ticket';

it('renders without crashing', () => {
  const wrapper = shallow(<Ticket />);
  expect(wrapper.node.type).toEqual('div');
});
