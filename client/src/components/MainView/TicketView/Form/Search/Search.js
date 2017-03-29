import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import './Search.css';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }

  search(e) {
    e.preventDefault();
    console.log('searching', this.props);
    // this.props.dispatch(actions.searchTickets());
  }

  render() {
    let consumerOptions = [];
    if (this.props.data &&
      this.props.data.consumers &&
      this.props.data.consumers.consumers) {
      consumerOptions = this.props.data.consumers.consumers
        .map(consumer => <option key={consumer.id}>{consumer.name}</option>);
    }
    let productOptions = [];
    if (this.props.data &&
      this.props.data.products &&
      this.props.data.products.products) {
      productOptions = this.props.data.products.products
        .map(product => <option key={product.id}>{product.name}</option>);
    }
    let userOptions = [];
    if (this.props.data &&
      this.props.data.users &&
      this.props.data.users.users) {
      userOptions = this.props.data.users.users
        .map(user => <option key={user.id}>{user.username}</option>);
    }

    return (
      <form className="Search" onSubmit={this.search}>
        <label htmlFor="search-consumer">Consumer:</label>
        <select id="search-consumer" placeholder="Consumer">
          <option />
          {consumerOptions}
        </select>
        <label htmlFor="search-product">Product:</label>
        <select id="search-product" placeholder="Product">
          <option />
          {productOptions}
        </select>
        <label htmlFor="search-owner">Owner:</label>
        <select id="search-owner" placeholder="Owner">
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
  // dispatch: React.PropTypes.func.isRequired,
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
