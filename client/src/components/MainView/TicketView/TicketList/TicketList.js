import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TicketList.css';
import TicketListItem from './TicketListItem/TicketListItem';

export class TicketList extends Component {
  render() {
    let tickets = [];
    if (this.props.tickets.length) {
      tickets = this.props.tickets.map(ticket =>
        <TicketListItem key={ticket.id} ticket={ticket} />,
      );
    }
    return (
      <div className="TicketList">
        <h4>TicketList</h4>
        {tickets}
      </div>
    );
  }
}

TicketList.defaultProps = {
  tickets: [],
};

TicketList.propTypes = {
  tickets: React.PropTypes.array,
};

const mapStateToProps = state => ({
  tickets: state.tickets,
});

export default connect(mapStateToProps)(TicketList);
