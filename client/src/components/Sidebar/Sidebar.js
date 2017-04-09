import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.changeView = this.changeView.bind(this);
  }

  changeView(e) {
    e.preventDefault();
    switch (e.target.innerText) {
      case 'tickets': this.props.changeView('tickets'); break;
      case 'stats': this.props.changeView('stats'); break;
      case 'login': this.props.changeView('login'); break;
      default: this.props.changeView('none');
    }
  }

  render() {
    return (
      <div className="Sidebar">
        <img className="logo" src="" alt="" />
        <ul>
          <li><button onClick={this.changeView}>tickets</button></li>
          <li><button onClick={this.changeView}>stats</button></li>
          <li><button onClick={this.changeView}>login</button></li>
        </ul>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  changeView: null,
};

Sidebar.propTypes = {
  changeView: React.PropTypes.func,
};

export default Sidebar;
