import React, { Component } from 'react';
import './StatsView.css';

class StatsView extends Component {
  render() {
    return (
      <div className="StatsView">
        StatsView
        <ul>
          <li>Average open duration: xxxx</li>
          <li>Average tickets per user: xxxx</li>
          <li>Percent Resolved: x%</li>
        </ul>
        Stats per User:
        <ul>
          <li>Tech A
            <ul>
              <li>Tickets Open: x</li>
              <li>Tickets Closed: x</li>
              <li>Average open duration: x</li>
            </ul>
          </li>
          <li>Tech B
            <ul>
              <li>Tickets Open: x</li>
              <li>Tickets Closed: x</li>
              <li>Average open duration: x</li>
            </ul>
          </li>
          <li>Tech C
            <ul>
              <li>Tickets Open: x</li>
              <li>Tickets Closed: x</li>
              <li>Average open duration: x</li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default StatsView;
