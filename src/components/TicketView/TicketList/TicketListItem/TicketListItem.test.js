/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import TicketListItem from './TicketListItem';

it('renders without crashing', () => {
  const wrapper = shallow(<TicketListItem />);
  expect(wrapper.node.type).toEqual('div');
});
