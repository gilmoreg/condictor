import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TicketList.css';
import TicketListItem from './TicketListItem/TicketListItem';

export class TicketList extends Component {
  render() {
    const tickets = [];
    // if (this.props.data.search && this.props.data.search.results) {
    //   tickets = this.props.data.search.results.map(ticket => <TicketListItem key={ticket.id} ticket={ticket} />);
    // }
    return (
      <div className="TicketList">
        <h4>TicketList</h4>
        {tickets}
      </div>
    );
  }
}

export default connect()(TicketList);
