import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addComment } from '../../../../../../../actions';
import './AddComment.css';

export class AddComment extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      text: '',
    };
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ text: e.target.value });
  }

  submit() {
    this.props.dispatch(addComment(this.props.ticketID, this.state.text));
  }

  render() {
    return (
      <div className="AddComment">
        <textarea onChange={this.handleChange} />
        <button onClick={this.submit}>Add Comment</button>
      </div>
    );
  }
}

AddComment.defaultProps = {
  ticketID: '',
  dispatch: () => {},
};

AddComment.propTypes = {
  ticketID: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(AddComment);
