import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Login from './Login';
import Logout from './Logout';
import './Auth.css';

export class Auth extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Auth">
        {this.props.user ?
          <Logout dispatch={this.props.dispatch} /> :
          <Login dispatch={this.props.dispatch} />
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
