import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MainView.css';
import TicketView from './TicketView/TicketView';
// import StatsView from './StatsView/StatsView';
import Auth from '../Auth/Auth';

export class MainView extends Component {
  render() {
    let view;
    switch (this.props.activeView) {
      case 'tickets': view = (<TicketView />); break;
      // case 'stats': view = (<StatsView />); break;
      case 'login': view = (<Auth />); break;
      default: view = (<div />);
    }
    return (
      <div className="MainView">
        Condictor
        {view}
      </div>
    );
  }
}

MainView.defaultProps = {
  activeView: '',
};

MainView.propTypes = {
  activeView: PropTypes.string,
};

export default MainView;
