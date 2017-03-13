import React, { Component } from 'react';
import './TicketView.css';
import HorizontalTab from '../../HorizontalTab';
import Form from './Form/Form';

class TicketView extends Component {
  render() {
    return (
      <div className="TicketView">
        <HorizontalTab title="New" />
        <HorizontalTab title="Search" />
        <Form />
      </div>
    );
  }
}

export default TicketView;
