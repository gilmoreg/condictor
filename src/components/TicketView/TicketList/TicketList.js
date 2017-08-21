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
        <TicketListItem key={ticket.id} ticket={ticket} fresh={this.props.fresh} />,
      );
      if (this.props.fresh) {
        const fresh = tickets.findIndex(e => e.key === this.props.fresh);
        // Move fresh ticket to the top
        if (fresh) [tickets[0], tickets[fresh]] = [tickets[fresh], tickets[0]];
      }
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
  fresh: null,
};

TicketList.propTypes = {
  tickets: PropTypes.array,
  fresh: PropTypes.string,
};

const mapStateToProps = state => ({
  tickets: state.tickets,
  fresh: state.fresh,
});

export default connect(mapStateToProps)(TicketList);
