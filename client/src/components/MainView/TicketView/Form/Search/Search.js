import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../actions';
import './Search.css';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }

  search(e) {
    e.preventDefault();
    // this.props.dispatch(actions.searchTickets());
  }

  render() {
    return (
      <form className="Search" onSubmit={this.search}>
        <label htmlFor="search-id">ID</label>
        <input id="search-id" type="number" placeholder="Title" />
        <button type="submit" id="search-submit-button">Search</button>
        <h4>Quick searches:</h4>
        <ul>
          <li><button id="quicksearch-allmyopen-button">All My Open</button></li>
          <li><button id="quicksearch-allopen-button">All Open</button></li>
          <li><button id="quicksearch-allmine-button">All Mine</button></li>
        </ul>
      </form>
    );
  }
}

Search.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(Search);
