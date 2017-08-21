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

  componentWillReceiveProps(nextProps) {
    if (nextProps.fresh === this.props.ticket.id) {
      this.setState({ expand: true });
      console.log(this.props.fresh);
    }
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
        <button onClick={this.handleClick}>{desc}<span className={`priority${priority}`}>Priority {priority}</span></button>
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
  fresh: null,
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
  fresh: PropTypes.string,
};

export default TicketListItem;
