import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-shortformat';
import './Comment.css';

class Comment extends Component {
  render() {
    console.log('Comment', this.props.comment);
    const { owner, description, created } = this.props.comment;
    const createDate = moment(created).short();
    return (
      <div className="Comment">
        {owner.username} ({createDate}):
        <p>{description}</p>
      </div>
    );
  }
}

Comment.defaultProps = {
  comment: {
    owner: {
      username: '',
    },
    description: '',
    created: '',
  },
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string,
    owner: PropTypes.shape({
      username: PropTypes.string,
    }),
    description: PropTypes.string,
    created: PropTypes.string,
  }),
};

export default Comment;
