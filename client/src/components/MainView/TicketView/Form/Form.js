import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Form.css';
import NewTicket from './NewTicket/NewTicket';
import Search from './Search/Search';
// import * as actions from '../../../../actions';

// function fetchOptions(data) {
//   return {
//     consumers: data.consumers.consumers.map(consumer => ({ id: consumer.id, name: consumer.name })),
//     products: data.products.products.map(product => ({ id: product.id, name: product.name })),
//     users: data.users.users.map(user => ({ id: user.id, name: user.name })),
//   };
// }

export class Form extends Component {
  constructor(props) {
    super(props);
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(e) {
    console.log('updateSearch', this, e);
    // this.props.dispatch(actions.updateSearch(e));
  }

  render() {
    let formView;
    const options = {
      consumers: [],
      products: [],
      owners: [],
    };
    switch (this.props.activeTab) {
      case 'new': formView = (<NewTicket />); break;
      case 'search': formView = (<Search options={options} updateSearch={this.updateSearch} />); break;
      case 'closed': formView = (<div />); break;
      default: formView = (<div />);
    }

    return (
      <div className="Form">
        {formView}
        {this.props.activeTab !== 'closed' ? <div className="close-button"><button onClick={this.props.close}>Close</button></div> : <div />}
      </div>
    );
  }
}

Form.defaultProps = {
  activeTab: 'closed',
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
  loading: true,
};

Form.propTypes = {
  activeTab: React.PropTypes.string,
  close: React.PropTypes.func.isRequired,
};

export default connect()(Form);
