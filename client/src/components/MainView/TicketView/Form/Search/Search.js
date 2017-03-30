import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import searchTickets from '../../../../../actions';
import './Search.css';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleConsumerChange = this.handleConsumerChange.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleOwnerChange = this.handleOwnerChange.bind(this);
    this.state = {
      consumer: '',
      product: '',
      owner: '',
    };
  }

  handleConsumerChange(e) {
    console.log('changing consumer', e.target.value);
    this.setState({
      consumer: e.target.value,
    });
  }

  handleProductChange(e) {
    this.setState({
      product: e.target.value,
    });
  }

  handleOwnerChange(e) {
    this.setState({
      owner: e.target.value,
    });
  }

  search(e) {
    e.preventDefault();
    const searchOptions = {};
    if (this.state.consumer) searchOptions.consumer = this.state.consumer;
    if (this.state.product) searchOptions.product = this.state.product;
    if (this.state.owner) searchOptions.owner = this.state.owner;
    this.props.dispatch(searchTickets(searchOptions));
  }

  render() {
    let consumerOptions = [];
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
    }

    return (
      <form className="Search" onSubmit={this.search}>
        <label htmlFor="search-consumer">Consumer:</label>
        <select
          id="search-consumer"
          placeholder="Consumer"
          value={this.state.consumer}
          onChange={this.handleConsumerChange}
        >
          <option />
          {consumerOptions}
        </select>
        <label htmlFor="search-product">Product:</label>
        <select
          id="search-product"
          placeholder="Product"
          value={this.state.product}
          onChange={this.handleProductChange}
        >
          <option />
          {productOptions}
        </select>
        <label htmlFor="search-owner">Owner:</label>
        <select
          id="search-owner"
          placeholder="Owner"
          value={this.state.owner}
          onChange={this.handleOwnerChange}
        >
          <option />
          {userOptions}
        </select>
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
  data: React.PropTypes.shape({
    consumers: React.PropTypes.shape({
      consumers: React.PropTypes.array,
    }),
    products: React.PropTypes.shape({
      products: React.PropTypes.array,
    }),
    users: React.PropTypes.shape({
      users: React.PropTypes.array,
    }),
  }),
};

const query = gql`
  query { 
    products { 
      products {
        id
        name
      } 
    } 
    consumers { 
      consumers {
        id
        name
      } 
    }
    users {
      users {
        username
      }
    } 
  }
`;

const graphSearch = graphql(query)(Search);
export default connect()(graphSearch);
