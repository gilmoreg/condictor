import React, { Component } from 'react';
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
    const desc = `${description}...`;
    return (
      <div className="TicketListItem">
        <button onClick={this.handleClick}>{`${desc} Priority ${priority}`}</button>
        {this.state.expand ? <Ticket ticket={this.props.ticket} /> : ''}
      </div>
    );
  }
}

TicketListItem.defaultProps = {
  ticket: {},
};

TicketListItem.propTypes = {
  ticket: React.PropTypes.shape({
    id: React.PropTypes.string,
    product: React.PropTypes.shape({
      name: React.PropTypes.string,
    }),
    consumer: React.PropTypes.shape({
      name: React.PropTypes.string,
    }),
    description: React.PropTypes.string,
    owner: React.PropTypes.shape({
      username: React.PropTypes.string,
    }),
    created: React.PropTypes.string,
    priority: React.PropTypes.number,
    closed: React.PropTypes.string,
  }),
};

export default TicketListItem;
