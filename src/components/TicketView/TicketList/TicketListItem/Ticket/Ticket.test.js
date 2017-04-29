/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { Ticket } from './Ticket';

it('renders without crashing', () => {
  const wrapper = shallow(
    <Ticket
      tickets={
      [{
        id: '0',
        product: '',
        consumer: '',
        description: '',
        owner: '',
        created: '',
        priority: '',
        closed: '',
        comments: [],
      }]
    }
      id={'0'}
    />);
  expect(wrapper.node.type).toEqual('div');
});
