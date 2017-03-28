import React, { Component } from 'react';
import moment from 'moment-shortformat';
import './Comment.css';

class Comment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
  comment: {},
};

Comment.propTypes = {
  comment: React.PropTypes.shape({
    id: React.PropTypes.string,
    owner: React.PropTypes.shape({
      username: React.PropTypes.string,
    }),
    description: React.PropTypes.string,
    created: React.PropTypes.string,
  }),
};

export default Comment;
