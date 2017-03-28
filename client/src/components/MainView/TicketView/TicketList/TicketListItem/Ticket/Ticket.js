import React, { Component } from 'react';
import moment from 'moment-shortformat';
import './Ticket.css';
import Comment from './Comment/Comment';

class Ticket extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
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
    console.log(this.props);
    let comments = [];
    if (this.props.ticket.comments.length) {
      comments = this.props.ticket.comments
        .map(comment => <Comment key={comment.id} comment={comment} />);
    }
    return (
      <div className="Ticket">
        <ul>
          <li>ID: {id}</li>
          <li>priority: {priority}</li>
          <li>Consumer: {consumer.name}</li>
          <li>Product: {product.name}</li>
          <li>Owner: {owner.username}</li>
          <li>Created: {createDate}</li>
          <li>Closed: {closed ? closeDate : 'n/a'}</li>
          <li>Description: <p>{description}</p></li>
        </ul>
        {comments}
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
    comments: React.PropTypes.array,
  }),
};

export default Ticket;
