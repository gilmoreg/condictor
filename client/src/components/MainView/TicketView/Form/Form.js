import React, { Component } from 'react';
import './Form.css';
import NewTicket from './NewTicket/NewTicket';
import Search from './Search/Search';

class Form extends Component {
  render() {
    return (
      <div className="Form">
        <NewTicket />
        <Search />
      </div>
    );
  }
}

export default Form;
