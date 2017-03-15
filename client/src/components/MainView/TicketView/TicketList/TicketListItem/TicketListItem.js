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
    return (
      <div className="TicketListItem">
        <button onClick={this.handleClick}>TicketListItem</button>
        {this.state.visible ? <Ticket /> : ''}
      </div>
    );
  }
}

export default TicketListItem;
