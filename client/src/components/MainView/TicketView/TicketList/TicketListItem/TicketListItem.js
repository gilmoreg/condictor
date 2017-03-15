import React, { Component } from 'react';
import './TicketListItem.css';
import Ticket from './Ticket/Ticket';

class TicketListItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      visible: false,
    };
  }

  handleClick() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { id, title, product, consumer, description, created, priority, status, closed } = this.props.ticket;
    return (
      <div className="TicketListItem">
        <button onClick={this.handleClick}>{`${id}: ${title} ${consumer} Priority: ${priority}`}</button>
        {this.state.visible ? <Ticket ticket={this.props.ticket} /> : ''}
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
    title: React.PropTypes.string,
    product: React.PropTypes.string,
    consumer: React.PropTypes.string,
    description: React.PropTypes.string,
    author: React.PropTypes.string,
    created: React.PropTypes.number,
    priority: React.PropTypes.number,
    status: React.PropTypes.string,
    closed: React.PropTypes.number,
  }),
};

export default TicketListItem;
