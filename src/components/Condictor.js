import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TicketView from './TicketView/TicketView';
import Login from './Auth/Login';
import Auth from './Auth/Auth';
import { sessionCheck } from '../actions';
import './Condictor.css';

export class Condictor extends Component {
  componentWillMount() {
    this.props.dispatch(sessionCheck());
  }

  render() {
    return (
      <div className="Condictor">
        <nav>
          <h1>C</h1>
          <Auth />
        </nav>
        {this.props.user ? <TicketView /> : <Login dispatch={this.props.dispatch} />}
      </div>
    );
  }
}

Condictor.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.string,
};

Condictor.defaultProps = {
  dispatch: () => {},
  user: '',
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Condictor);
