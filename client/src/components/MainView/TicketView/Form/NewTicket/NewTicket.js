import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from '../Select';
import * as actions from '../../../../../actions';
import './NewTicket.css';

export class NewTicket extends Component {
  constructor(props) {
    super(props);
    this.submitNewTicket = this.submitNewTicket.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      consumer: '',
      product: '',
      description: '',
      priority: 1,
    };
  }

  componentWillMount() {
    this.props.dispatch(actions.fillSearchOptions());
  }

  submitNewTicket(e) {
    e.preventDefault();
    if (this.props.user) {
      this.props.dispatch(actions.createTicket({
        owner: this.props.user,
        consumer: this.state.consumer,
        product: this.state.product,
        description: this.state.description,
        priority: this.state.priority,
      }));
    }
  }

  handleChange(e) {
    let options = this.state;
    switch (e.target.id) {
      case 'search-consumer': options.consumer = e.target.value; break;
      case 'search-product': options.product = e.target.value; break;
      case 'new-ticket-desc': options.description = e.target.value; break;
      case 'new-ticket-priority': {
        let priority = e.target.value;
        if (priority > 5) priority = 5;
        if (priority < 1) priority = 1;
        options.priority = priority;
        break;
      }
      default: options = this.state;
    }
    this.setState(options);
  }

  render() {
    return (
      <form className="NewTicket" onSubmit={this.submitNewTicket}>
        <label htmlFor="new-ticket-priority">Priority</label>
        <input
          id="new-ticket-priority"
          type="number"
          handleChange={this.handleChange}
          min="1"
          max="5"
          name="Priority"
        />
        <Select type={'Consumer'} handleChange={this.handleChange} options={this.props.options.consumers} />
        <Select type={'Product'} handleChange={this.handleChange} options={this.props.options.products} />
        <label htmlFor="new-ticket-desc">Description</label>
        <textarea id="new-ticket-desc" rows="5" onChange={this.handleChange} />
        <button type="submit" id="new-ticket-submit-button">Create Ticket</button>
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
  user: PropTypes.string,
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

