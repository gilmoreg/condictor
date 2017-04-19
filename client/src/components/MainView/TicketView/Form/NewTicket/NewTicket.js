import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from '../Select';
import * as actions from '../../../../../actions';
import './NewTicket.css';

class NewTicket extends Component {
  constructor(props) {
    super(props);
    this.submitNewTicket = this.submitNewTicket.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(actions.fillSearchOptions());
  }

  submitNewTicket(e) {
    e.preventDefault();
    /*
      owner: "${fields.owner}",
      priority: "${fields.product}",
      description: "${fields.description}",
      consumer: "${fields.consumer}",
      product: "${fields.product}"
    */
    this.props.dispatch(actions.newTicket());
  }

  render() {
    return (
      <form className="NewTicket" onSubmit={this.submitNewTicket}>
        <Select type={'Consumer'} handleChange={this.handleChange} options={this.props.options.consumers} />
        <Select type={'Product'} handleChange={this.handleChange} options={this.props.options.products} />
        <label htmlFor="new-ticket-desc">Description</label>
        <textarea id="new-ticket-desc" rows="5" />
        <button type="submit" id="new-ticket-submit-button">Create</button>
      </form>
    );
  }
}

NewTicket.defaultProps = {
  options: {
    consumers: [],
    products: [],
  },
  dispatch: () => {},
  user: null,
};

NewTicket.propTypes = {
  dispatch: PropTypes.func,
  options: PropTypes.shape({
    consumers: PropTypes.array,
    products: PropTypes.array,
  }),
};

const mapStateToProps = state => ({
  user: state.user,
  options: {
    consumers: state.consumers,
    products: state.products,
  },
});

export default connect(mapStateToProps)(NewTicket);

