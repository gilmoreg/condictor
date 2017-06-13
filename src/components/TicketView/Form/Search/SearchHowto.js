import React from 'react';
import './SearchHowto.css';

const SearchHowto = () =>
  <div className="search-howto">
    <h3>Searching for existing tickets</h3>
    <p><strong>Condictor</strong> allows you to search existing tickets by <em>consumer</em>, <em>product</em>, or <em>owner</em> (the person who created the ticket).</p>
    <p>Leaving any of the fields blank will ignore them in the search; <strong>leaving all of the fields blank will return all tickets</strong>.</p>
    <p>The <em>Only Open</em> option allows you to filter out closed tickets.</p>
    <p><strong>Try searching with all fields blank first</strong>. The more specific your search is, the less likely it will return anything.</p>
  </div>;

export default SearchHowto;
