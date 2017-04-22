/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment-shortformat';
import './Ticket.css';
import Comment from './Comment/Comment';
import AddComment from './Comment/AddComment';
import { closeTicket } from '../../../../../actions';

export class Ticket extends Component {
  constructor(props) {
    super(props);
    this.closeTicket = this.closeTicket.bind(this);
  }

  closeTicket() {
    this.props.dispatch(closeTicket(this.props.id, Date.now()));
  }

  render() {
    const ticket = this.props.tickets.filter(t => (t.id === this.props.id))[0];
    const {
      product,
      consumer,
      description,
      owner,
      created,
      priority,
      closed,
    } = ticket;

    const createDate = moment(created).short();
    let closeDate;
    if (closed) {
      closeDate = moment(closed).short();
    }
    let comments = [];
    if (ticket.comments.length) {
      comments = ticket.comments
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
        {closed ? '' : <AddComment ticketID={this.props.id} />}
        {closed ? '' : <button onClick={this.closeTicket}>Close Ticket</button>}
      </div>
    );
  }
}

Ticket.defaultProps = {
  id: '',
  tickets: [],
  dispatch: () => {},
};

Ticket.propTypes = {
  id: PropTypes.string,
  tickets: PropTypes.array,
  dispatch: PropTypes.func,
};

const mapStateToProps = state => ({
  tickets: state.tickets,
});

export default connect(mapStateToProps)(Ticket);
