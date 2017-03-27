import React, { Component } from 'react';
import Sidebar from './Sidebar/Sidebar';
import MainView from './MainView/MainView';
import './Condictor.css';

class Condictor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeView: 'tickets',
    };
    this.changeView = this.changeView.bind(this);
  }

  changeView(view) {
    this.setState({ activeView: view });
  }

  render() {
    return (
      <div className="Condictor">
        <Sidebar changeView={this.changeView} />
        <MainView activeView={this.state.activeView} />
      </div>
    );
  }
}

export default Condictor;
