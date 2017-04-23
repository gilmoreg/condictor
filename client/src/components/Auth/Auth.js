import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Logout from './Logout';
import './Auth.css';

export class Auth extends Component {
  render() {
    return (
      <div className="Auth">
        {this.props.user ?
          <Logout dispatch={this.props.dispatch} /> :
          <div />
        }
      </div>
    );
  }
}

Auth.propTypes = {
  user: PropTypes.string,
  dispatch: PropTypes.func,
};

Auth.defaultProps = {
  user: '',
  dispatch: () => {},
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Auth);
