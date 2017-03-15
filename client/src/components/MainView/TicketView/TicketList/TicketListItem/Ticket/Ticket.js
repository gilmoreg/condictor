import React, { Component } from 'react';
import './Ticket.css';
import Comment from './Comment/Comment';

class Ticket extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Ticket">
        Ticket
        <Comment />
        <Comment />
        <Comment />
      </div>
    );
  }
}

export default Ticket;
