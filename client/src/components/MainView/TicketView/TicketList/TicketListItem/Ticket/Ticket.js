import React, { Component } from 'react';
import './Ticket.css';
import Comment from './Comment/Comment';

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.comments = [
      { author: 'tech A', text: 'Lorem ipsum dolor sit amet', created: Date.now() },
      { author: 'tech B', text: 'Lorem ipsum dolor sit amet', created: Date.now() },
    ];
  }

  render() {
    const { id, title, product, consumer, description, author, created, priority, status, closed } = this.props.ticket;
    const d = new Date(created);
    const dateCreated = d.toISOString();
    let c;
    let dateClosed;
    if (closed) {
      c = new Date(closed);
      dateClosed = c.toISOString();
    }
    return (
      <div className="Ticket">
        <ul>
          <li>ID: {id}</li>
          <li>priority: {priority}</li>
          <li>Title: {title}</li>
          <li>Consumer: {consumer}</li>
          <li>Product: {product}</li>
          <li>Author: {author}</li>
          <li>Created: {dateCreated}</li>
          <li>Status: {status}</li>
          <li>Closed: {closed ? dateClosed : 'n/a'}</li>
          <li>Description: <p>{description}</p></li>
        </ul>
        <Comment comment={this.comments[0]} />
        <Comment comment={this.comments[1]} />
        <button>Add Comment</button>
        <button>Edit</button>
        <button>Close</button>
      </div>
    );
  }
}

Ticket.defaultProps = {
  ticket: {},
};

Ticket.propTypes = {
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

export default Ticket;
