/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        {tickets}
      </div>
    );
  }
}

TicketList.defaultProps = {
  tickets: [],
};

TicketList.propTypes = {
  tickets: PropTypes.array,
};

const mapStateToProps = state => ({
  tickets: state.tickets,
});

export default connect(mapStateToProps)(TicketList);
