import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MainView.css';
import TicketView from './TicketView/TicketView';
import StatsView from './StatsView/StatsView';
import Login from './Login';

export class MainView extends Component {
  render() {
    let view;
    switch (this.props.activeView) {
      case 'tickets': view = (<TicketView />); break;
      case 'stats': view = (<StatsView />); break;
      case 'login': view = (<Login />); break;
      default: view = (<div />);
    }
    return (
      <div className="MainView">
        MainView
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
