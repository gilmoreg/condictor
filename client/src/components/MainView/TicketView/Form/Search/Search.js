import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from '../Select';
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
      open: true,
    };
  }

  componentWillMount() {
    this.props.dispatch(actions.fillSearchOptions());
  }

  handleChange(e) {
    let options = this.state;
    switch (e.target.id) {
      case 'search-consumer': options.consumer = e.target.value; break;
      case 'search-product': options.product = e.target.value; break;
      case 'search-owner': options.owner = e.target.value; break;
      case 'open-checkbox': options.open = e.target.checked; break;
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
    if (this.state.open) searchOptions.open = this.state.open;
    this.props.dispatch(actions.searchTickets(searchOptions));
  }

  render() {
    return (
      <form className="Search" onSubmit={this.search}>
        <Select type={'Consumer'} handleChange={this.handleChange} options={this.props.options.consumers} />
        <Select type={'Product'} handleChange={this.handleChange} options={this.props.options.products} />
        <Select type={'Owner'} handleChange={this.handleChange} options={this.props.options.owners} />
        <label htmlFor="open-checkbox">Open</label>
        <input type="checkbox" onChange={this.handleChange} id="open-checkbox" value="open" />
        <button type="submit" id="search-submit-button">Submit</button>
      </form>
    );
  }
}

Search.defaultProps = {
  options: {
    consumers: [],
    products: [],
    owners: [],
  },
  dispatch: () => {},
  user: null,
};

Search.propTypes = {
  dispatch: PropTypes.func,
  options: PropTypes.shape({
    consumers: PropTypes.array,
    products: PropTypes.array,
    owners: PropTypes.array,
  }),
};

const mapStateToProps = state => ({
  options: {
    consumers: state.consumers,
    products: state.products,
    owners: state.owners,
  },
});

export default connect(mapStateToProps)(Search);
