import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import './Form.css';
import NewTicket from './NewTicket/NewTicket';
import Search from './Search/Search';

function fetchOptions(data) {
  return {
    consumers: data.consumers.consumers.map(consumer => ({ id: consumer.id, name: consumer.name })),
    products: data.products.products.map(product => ({ id: product.id, name: product.name })),
    users: data.users.users.map(user => ({ id: user.id, name: user.name })),
  };
}

export class Form extends Component {
  render() {
    let formView;
    switch (this.props.activeTab) {
      case 'new': formView = (<NewTicket />); break;
      case 'search': formView = (<Search options={fetchOptions(this.props.data)} />); break;
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
        id
        name: username
      }
    } 
  }
`;


export default graphql(query)(Form);
