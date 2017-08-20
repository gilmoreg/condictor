/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from '../Select';
import Ticket from '../../TicketList/TicketListItem/Ticket/Ticket';
import NewTicketHowto from './NewTicketHowto';
import * as actions from '../../../../actions';
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
    if (this.props.user &&
        this.state.consumer &&
        this.state.product &&
        this.state.description &&
        this.state.priority) {
      const newTicket = {
        owner: this.props.user,
        consumer: this.state.consumer,
        product: this.state.product,
        description: this.state.description,
        priority: this.state.priority,
      };
      this.props.dispatch(actions.createTicket(newTicket));
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
      <div className="NewTicket">
        <form onSubmit={this.submitNewTicket}>
          <label htmlFor="new-ticket-priority">Priority</label>
          <input
            id="new-ticket-priority"
            type="number"
            onChange={this.handleChange}
            min="1"
            max="5"
            name="Priority"
            defaultValue="1"
          />
          <Select type={'Consumer'} handleChange={this.handleChange} options={this.props.options.consumers} />
          <Select type={'Product'} handleChange={this.handleChange} options={this.props.options.products} />
          <label htmlFor="new-ticket-desc">Description</label>
          <textarea id="new-ticket-desc" rows="5" onChange={this.handleChange} />
          <button className="btn btn-colorize-blue" type="submit" id="new-ticket-submit-button">Create Ticket</button>
        </form>
        <NewTicketHowto />
      </div>
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
  newTicket: {},
};

NewTicket.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.string,
  options: PropTypes.shape({
    consumers: PropTypes.array,
    products: PropTypes.array,
  }),
  newTicket: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.user,
  options: {
    consumers: state.consumers,
    products: state.products,
  },
  newTicket: state.newTicket,
});

export default connect(mapStateToProps)(NewTicket);
