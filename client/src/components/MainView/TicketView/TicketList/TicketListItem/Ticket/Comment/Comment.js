import React, { Component } from 'react';
import './Comment.css';

class Comment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { author, text, created } = this.props.comment;
    const d = new Date(created);
    const dateCreated = d.toISOString();
    return (
      <div className="Comment">
        {author} ({dateCreated}):
        <p>{text}</p>
      </div>
    );
  }
}

Comment.defaultProps = {
  comment: {},
};

Comment.propTypes = {
  comment: React.PropTypes.shape({
    author: React.PropTypes.string,
    text: React.PropTypes.string,
    created: React.PropTypes.number,
  }),
};

export default Comment;
