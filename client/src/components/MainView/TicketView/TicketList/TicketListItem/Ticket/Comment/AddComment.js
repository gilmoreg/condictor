import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './AddComment.css';

export class AddComment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="AddComment">
        Add a comment! {this.props.ticketID}
      </div>
    );
  }
}

AddComment.defaultProps = {
  dispatch: () => {},
};

AddComment.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(AddComment);
