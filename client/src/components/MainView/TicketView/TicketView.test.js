/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import TicketView from './TicketView';

it('renders without crashing', () => {
  const wrapper = shallow(<TicketView />);
  expect(wrapper.node.type).toEqual('div');
});
