import React, { Component } from 'react';
import './TicketView.css';
import HorizontalTab from './HorizontalTab';
import Form from './Form/Form';
import TicketList from './TicketList/TicketList';

class TicketView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'search',
    };
    this.newClick = this.newClick.bind(this);
    this.searchClick = this.searchClick.bind(this);
  }

  newClick() {
    this.setState({ activeTab: (this.state.activeTab === 'new') ? 'closed' : 'new' });
  }

  searchClick() {
    this.setState({ activeTab: (this.state.activeTab === 'search') ? 'closed' : 'search' });
  }

  render() {
    return (
      <div className="TicketView">
        <HorizontalTab title="New" onClick={this.newClick} />
        <HorizontalTab title="Search" onClick={this.searchClick} />
        <Form activeTab={this.state.activeTab} />
        <TicketList />
      </div>
    );
  }
}

export default TicketView;
