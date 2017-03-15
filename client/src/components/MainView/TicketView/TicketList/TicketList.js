import React, { Component } from 'react';
import './TicketList.css';
import TicketListItem from './TicketListItem/TicketListItem';

class TicketList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="TicketList">
        <h4>TicketList</h4>
        <TicketListItem />
        <TicketListItem />
        <TicketListItem />
        <TicketListItem />
      </div>
    );
  }
}

export default TicketList;
