import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions';
import './Login.css';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      username: '',
      password: '',
    };
  }

  onChange(e) {
    e.preventDefault();
    const credentials = this.state;
    switch (e.target.id) {
      case 'username-input': credentials.username = e.target.value; break;
      case 'password-input': credentials.password = e.target.value; break;
      default: break;
    }
    this.setState(credentials);
  }

  login(e) {
    e.preventDefault();
    if (this.state.username && this.state.password) {
      this.props.dispatch(
        login({ username: this.state.username, password: this.state.password }),
      );
    }
  }

  render() {
    return (
      <form className="Login" onSubmit={this.login}>
        <label htmlFor="username-input">Username</label>
        <input
          id="username-input"
          type="text"
          placeholder="Username"
          onChange={this.onChange}
        />
        <label htmlFor="password-input">Password</label>
        <input
          id="password-input"
          type="password"
          placeholder="Password"
          onChange={this.onChange}
        />
        <button type="submit">Login</button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
};

Login.defaultProps = {
  dispatch: null,
};

export default connect()(Login);
