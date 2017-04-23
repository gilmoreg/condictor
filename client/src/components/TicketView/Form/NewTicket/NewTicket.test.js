/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { NewTicket } from './NewTicket';

it('renders without crashing', () => {
  const wrapper = shallow(<NewTicket />);
  expect(wrapper.node.type).toEqual('div');
});
