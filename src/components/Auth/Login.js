import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { login } from '../../actions';
import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.onChange = this.onChange.bind(this);    
    this.state = {
      username: '',
      password: '',
      error: '',
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
      )
      .then((response) => {
        if (response === null) this.setState({ error: <p className="error">Error logging in.</p> });
        else this.setState({ error: '' });
      });
    }
  }

  demoLogin(e) {
    e.preventDefault();
    this.props.dispatch(login({ username: 'test', password: 'test' }));
  }

  render() {
    return (
      <form className="Login" onSubmit={this.login}>
        <h1 className="h1">Condictor</h1>
        <hr />
        <p>
          Welcome to <strong>Condictor</strong>, the lightweight helpdesk issue tracker.
          Please log into the demo account to try it out!
          You can view existing tickets, open new ones, add comments to open tickets,
          and close them when you are done.
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
        {this.state.error ? this.state.error : ''}
        <button type="submit" className="btn btn-colorize login">Login</button>
        <button className="btn btn-colorize" onClick={this.demoLogin}>Login to Demo</button>
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
