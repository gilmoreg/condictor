import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import './TicketList.css';
import TicketListItem from './TicketListItem/TicketListItem';

export class TicketList extends Component {
  render() {
    let tickets = [];
    if (this.props.data.search && this.props.data.search.results) {
      tickets = this.props.data.search.results.map(ticket => <TicketListItem key={ticket.id} ticket={ticket} />);
    }
    return (
      <div className="TicketList">
        <h4>TicketList</h4>
        {tickets}
      </div>
    );
  }
}

TicketList.defaultProps = {
  data: {
    loading: true,
    search: {
      results: [],
    },
  },
};

TicketList.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool.isRequired,
    search: React.PropTypes.shape({
      results: React.PropTypes.array,
    }),
  }),
};

// TODO convert this to search with current options
const query = gql`
  query search($consumer: String, $product: String, $owner: String) {
    search(consumer: $consumer, product: $product, owner: $owner) {
      results {
        id
        product {
          name
        }
        consumer {
          name
        }
        description
        owner {
          username
        }
        created
        closed
        priority
        comments {
          id
          created
          description
          owner {
            username
          }
        }
      }
    }
  }
`;

const mapStateToProps = state => ({
  searchOptions: state.root.searchOptions,
});

const calcOptions = ({ searchOptions }) => {
  const variables = {};
  console.log('searchOptions', searchOptions);
  if (!searchOptions) return {};
  if (searchOptions.consumer) variables.consumer = searchOptions.consumer;
  if (searchOptions.product) variables.product = searchOptions.product;
  if (searchOptions.owner) variables.owner = searchOptions.owner;
  return variables;
};

const ConnectTicketList = connect(mapStateToProps)(TicketList);
export default graphql(
  query,
  { options: calcOptions },
  )(ConnectTicketList);
