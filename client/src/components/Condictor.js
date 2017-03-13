import React, { Component } from 'react';
import './Condictor.css';
import Sidebar from './Sidebar';
import MainView from './MainView/MainView';

class Condictor extends Component {
  render() {
    return (
      <div className="Condictor">
        <Sidebar />
        <MainView />
      </div>
    );
  }
}

export default Condictor;
