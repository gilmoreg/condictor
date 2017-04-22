/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { TicketList } from './TicketList';

it('renders without crashing', () => {
  const wrapper = shallow(<TicketList />);
  expect(wrapper.node.type).toEqual('div');
});
