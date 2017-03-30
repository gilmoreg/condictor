import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from './Select';
import * as actions from '../../../../../actions';
import './Search.css';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      consumer: '',
      product: '',
      owner: '',
    };
  }

  handleChange(e) {
    let options = this.state;
    console.log('handleChange', e.target.value, e.target.id);
    switch (e.target.id) {
      case 'search-consumer': options.consumer = e.target.value; break;
      case 'search-product': options.product = e.target.value; break;
      case 'search-owner': options.owner = e.target.value; break;
      default: options = this.state;
    }
    this.setState(options);
  }

  search(e) {
    e.preventDefault();
    const searchOptions = {};
    if (this.state.consumer) searchOptions.consumer = this.state.consumer;
    if (this.state.product) searchOptions.product = this.state.product;
    if (this.state.owner) searchOptions.owner = this.state.owner;
    this.props.dispatch(actions.updateSearch(searchOptions));
  }

  render() {
    return (
      <form className="Search" onSubmit={this.search}>
        <Select type={'Consumer'} handleChange={this.handleChange} options={this.props.options.consumers} />
        <Select type={'Product'} handleChange={this.handleChange} options={this.props.options.products} />
        <Select type={'Owner'} handleChange={this.handleChange} options={this.props.options.users} />
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

Search.defaultProps = {
  options: {
    consumers: {
      consumers: [],
    },
    products: {
      products: [],
    },
    users: {
      users: [],
    },
  },
};

Search.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  options: React.PropTypes.shape({
    consumers: React.PropTypes.array,
    products: React.PropTypes.array,
    users: React.PropTypes.array,
  }),
};

export default connect()(Search);
