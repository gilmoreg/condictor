import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
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
  {
    search {
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

export default graphql(query)(TicketList);
