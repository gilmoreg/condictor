import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar/Sidebar';
import MainView from './MainView/MainView';
import { sessionCheck } from '../actions';
import './Condictor.css';

export class Condictor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeView: 'login',
    };
    this.changeView = this.changeView.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(sessionCheck());
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

Condictor.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

Condictor.defaultProps = {
  dispatch: () => {},
};

export default connect()(Condictor);
