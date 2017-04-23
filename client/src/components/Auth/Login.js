import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { login } from '../../actions';
import './Login.css';

export default class Login extends Component {
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
      case 'username': credentials.username = e.target.value; break;
      case 'password': credentials.password = e.target.value; break;
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
        <h1 className="h1">Condictor</h1>
        <hr />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          In reiciendis ad laborum rem
          nulla sequi dolore minima sit debitis.
        </p>
        <i className="fa fa-user-circle-o" />
        <input
          id="username"
          type="text"
          placeholder="Username"
          onChange={this.onChange}
        />
        <br />
        <i className="fa fa-key" />
        <input
          id="password"
          type="password"
          placeholder="Password"
          onChange={this.onChange}
        />
        <button type="submit" className="btn btn-colorize">Login</button>
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
