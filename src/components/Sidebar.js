import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {
  render() {
    return (
      <div className="Sidebar">
        <img className="logo" src="" alt=""/>
        <ul>
          <li>tickets</li>
          <li>stats</li>
          <li>login</li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
