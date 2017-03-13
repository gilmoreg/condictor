import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  render() {
    return (
      <form className="Search">
        <button type="submit" id="search-submit-button">Search</button>
        <h4>Quick searches:</h4>
        <ul>
          <li><button id="quicksearch-allopen-button">All Open</button></li>
          <li><button id="quicksearch-allmyopen-button">All My Open</button></li>
          <li><button id="quicksearch-allmine-button">All Mine</button></li>
        </ul>
      </form>
    );
  }
}

export default Search;
