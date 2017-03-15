import React, { Component } from 'react';
import './MainView.css';
import TicketView from './TicketView/TicketView';
import StatsView from './StatsView/StatsView';

class MainView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let view;
    switch (this.props.activeView) {
      case 'tickets': view = (<TicketView />); break;
      case 'stats': view = (<StatsView />); break;
      default: view = (<div />);
    }
    console.log(this.props.activeView);
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
  activeView: React.PropTypes.string,
};

export default MainView;
