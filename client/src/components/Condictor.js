import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
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
      <Provider store={store}>
        <div className="Condictor">
          <Sidebar changeView={this.changeView} />
          <MainView activeView={this.state.activeView} />
        </div>
      </Provider>
    );
  }
}

export default Condictor;
