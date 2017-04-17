import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createComment } from '../../../../../../../actions';
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
    this.textInput.value = '';
    console.log('adding comment', this.props.ticketID, this.props.user);
    this.props.dispatch(createComment(this.props.ticketID, {
      owner: this.props.user,
      description: this.state.text,
    }));
  }

  render() {
    return (
      <div className="AddComment">
        <textarea onChange={this.handleChange} ref={(input) => { this.textInput = input; }} />
        <button onClick={this.submit}>Add Comment</button>
      </div>
    );
  }
}

AddComment.defaultProps = {
  user: '',
  ticketID: '',
  dispatch: () => {},
};

AddComment.propTypes = {
  user: PropTypes.string,
  ticketID: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(AddComment);
