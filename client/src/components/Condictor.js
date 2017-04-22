import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TicketView from './TicketView/TicketView';
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
        <TicketView />
        <Auth />
      </div>
    );
  }
}

Condictor.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

Condictor.defaultProps = {
  dispatch: () => {},
};

export default connect()(Condictor);
