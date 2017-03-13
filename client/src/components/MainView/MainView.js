import React, { Component } from 'react';
import './MainView.css';
import TicketView from './TicketView/TicketView';

class MainView extends Component {
  render() {
    return (
      <div className="MainView">
        MainView
        <TicketView />
      </div>
    );
  }
}

export default MainView;
