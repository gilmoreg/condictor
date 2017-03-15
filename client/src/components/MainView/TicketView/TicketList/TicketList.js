import React, { Component } from 'react';
import './TicketList.css';
import TicketListItem from './TicketListItem/TicketListItem';

class TicketList extends Component {
  constructor(props) {
    super(props);
    this.tickets = [
      {
        id: '0001',
        title: 'slowness in x during y',
        product: 'Condictor v0.1',
        consumer: 'Consumer A',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        author: 'tech A',
        created: Date.now(),
        priority: 1,
        status: 'open',
        closed: null,
      },
      {
        id: '0002',
        title: 'feature x not working',
        product: 'Condictor v0.2',
        consumer: 'Consumer B',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        author: 'tech B',
        created: Date.now(),
        priority: 2,
        status: 'open',
        closed: null,
      },
      {
        id: '0003',
        title: 'slowness in x during y',
        product: 'Condictor v0.1',
        consumer: 'Consumer C',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        author: 'tech C',
        created: Date.now() - 100000,
        priority: 3,
        status: 'closed',
        closed: Date.now(),
      },
    ];
  }

  render() {
    return (
      <div className="TicketList">
        <h4>TicketList</h4>
        <TicketListItem ticket={this.tickets[0]} />
        <TicketListItem ticket={this.tickets[1]} />
        <TicketListItem ticket={this.tickets[2]} />
      </div>
    );
  }
}

export default TicketList;
