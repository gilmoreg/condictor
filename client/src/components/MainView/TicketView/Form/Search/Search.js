import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchOption from './SearchOption';
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
    console.log('handleChange', e.target.value);
    /* switch (type) {
      case 'Consumer': options.consumer = e.target.value; break;
      case 'Product': options.product = e.target.value; break;
      case 'Owner': options.owner = e.target.value; break;
      default: options = this.state;
    } */
    this.setState(options);
  }

  search(e) {
    e.preventDefault();
    const searchOptions = {};
    if (this.state.consumer) searchOptions.consumer = this.state.consumer;
    if (this.state.product) searchOptions.product = this.state.product;
    if (this.state.owner) searchOptions.owner = this.state.owner;
    console.log('search', searchOptions, this.props.dispatch);
    this.props.dispatch(actions.updateSearch(searchOptions));
  }

  render() {
    /* let consumerOptions = [];
    if (this.props.data &&
      this.props.data.consumers &&
      this.props.data.consumers.consumers) {
      consumerOptions = this.props.data.consumers.consumers
        .map(consumer => <option key={consumer.id} value={consumer.name}>{consumer.name}</option>);
    }
    let productOptions = [];
    if (this.props.data &&
      this.props.data.products &&
      this.props.data.products.products) {
      productOptions = this.props.data.products.products
        .map(product => <option key={product.id} value={product.name}>{product.name}</option>);
    }
    let userOptions = [];
    if (this.props.data &&
      this.props.data.users &&
      this.props.data.users.users) {
      userOptions = this.props.data.users.users
        .map(user => <option key={user.id} value={user.username}>{user.username}</option>);
    } */

    return (
      <form className="Search" onSubmit={this.search}>
        <SearchOption type={'Consumer'} handleChange={this.handleChange} />
        <SearchOption type={'Product'} handleChange={this.handleChange} />
        <SearchOption type={'Owner'} handleChange={this.handleChange} />
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
  data: {
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
};

export default connect()(Search);
