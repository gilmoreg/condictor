import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-shortformat';
import './Ticket.css';
import Comment from './Comment/Comment';
import AddComment from './Comment/AddComment';

class Ticket extends Component {
  render() {
    const {
      product,
      consumer,
      description,
      owner,
      created,
      priority,
      closed,
    } = this.props.ticket;
    const createDate = moment(created).short();
    let closeDate;
    if (closed) {
      closeDate = moment(closed).short();
    }
    let comments = [];
    if (this.props.ticket.comments.length) {
      comments = this.props.ticket.comments
        .map(comment => <Comment key={comment.id} comment={comment} />);
    }
    return (
      <div className="Ticket">
        <ul>
          <li>Priority: {priority}</li>
          <li>Consumer: {consumer.name}</li>
          <li>Product: {product.name}</li>
          <li>Owner: {owner.username}</li>
          <li>Created: {createDate}</li>
          <li>Closed: {closed ? closeDate : 'n/a'}</li>
          <li>Description: <p>{description}</p></li>
        </ul>
        {comments}
        <AddComment ticketID={this.props.ticket.id} />
        {closed ? '' : <button>Close Ticket</button>}
      </div>
    );
  }
}

Ticket.defaultProps = {
  ticket: {
    product: {
      name: '',
    },
    consumer: {
      name: '',
    },
    description: '',
    owner: {
      username: '',
    },
    comments: [],
  },
};

Ticket.propTypes = {
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
    comments: PropTypes.array,
  }),
};

export default Ticket;
