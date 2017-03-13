import React, { Component } from 'react';
import './NewTicket.css';

class NewTicket extends Component {
  constructor(props) {
    super(props);
    this.submitNewTicket = this.submitNewTicket.bind(this);
  }

  submitNewTicket(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form className="NewTicket" onSubmit={this.submitNewTicket}>
        <label htmlFor="new-ticket-title">Title</label>
        <input id="new-ticket-title" type="text" placeholder="Title" />
        <label htmlFor="new-ticket-priority">Priority</label>
        <select id="new-ticket-priority">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <label htmlFor="new-ticket-category">Category</label>
        <input
          id="new-ticket-category"
          type="text"
          placeholder="Category"
          list="new-ticket-category-list"
        />
        <datalist id="new-ticket-category-list">
          <option value="Technical" />
          <option value="Billing" />
          <option value="Feedback" />
        </datalist>
        <label htmlFor="new-ticket-resource">Resource</label>
        <input
          id="new-ticket-resource"
          type="text"
          placeholder="Resource"
          list="new-ticket-resource-list"
        />
        <datalist id="new-ticket-resource-list">
          <option value="Condictor v0.1" />
          <option value="Condictor v0.2" />
          <option value="PeopleSoft v9.2 HR Deployment" />
        </datalist>
        <label htmlFor="new-ticket-desc">Description</label>
        <textarea id="new-ticket-desc" rows="5" />
        <button type="submit" id="new-ticket-submit-button">Create</button>
      </form>
    );
  }
}

export default NewTicket;

