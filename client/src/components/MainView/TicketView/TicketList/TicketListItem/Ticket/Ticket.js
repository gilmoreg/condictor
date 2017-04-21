import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment-shortformat';
import './Ticket.css';
import Comment from './Comment/Comment';
import AddComment from './Comment/AddComment';
import { closeTicket } from '../../../../../../actions';

export class Ticket extends Component {
  constructor(props) {
    super(props);
    this.closeTicket = this.closeTicket.bind(this);
  }

  closeTicket() {
    this.props.dispatch(closeTicket(this.props.ticket.id, Date.now()));
  }

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
        {closed ? '' : <button onClick={this.closeTicket}>Close Ticket</button>}
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
  dispatch: () => {},
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
  dispatch: PropTypes.func,
};

export default connect()(Ticket);
