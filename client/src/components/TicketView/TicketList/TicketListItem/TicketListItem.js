import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TicketListItem.css';
import Ticket from './Ticket/Ticket';

class TicketListItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      expand: false,
    };
  }

  handleClick() {
    this.setState({ expand: !this.state.expand });
  }

  render() {
    const { /* closed, created, */ description, priority } = this.props.ticket;
    // TODO use the other fields to determine styling
    const desc = `${description.substring(0, 30)}...`;
    return (
      <div className="TicketListItem">
        <button onClick={this.handleClick}>{desc}<span>Priority {priority}</span></button>
        {this.state.expand ? <Ticket id={this.props.ticket.id} /> : ''}
      </div>
    );
  }
}

TicketListItem.defaultProps = {
  ticket: {
    description: '',
    priority: 1,
  },
};

TicketListItem.propTypes = {
  ticket: PropTypes.shape({
    id: PropTypes.string,
    product: PropTypes.shape({
      name: PropTypes.string,
    }),
    consumer: PropTypes.shape({
      name: PropTypes.string,
    }),
    description: PropTypes.string,
    owner: PropTypes.shape({
      username: PropTypes.string,
    }),
    created: PropTypes.string,
    priority: PropTypes.number,
    closed: PropTypes.string,
  }),
};

export default TicketListItem;
