import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import Sidebar from './Sidebar/Sidebar';
import MainView from './MainView/MainView';
import './Condictor.css';

export class Condictor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeView: 'tickets',
    };
    this.changeView = this.changeView.bind(this);
  }

  changeView(view) {
    this.setState({ activeView: view });
  }

  render() {
    return (
      <div className="Condictor">
        <Sidebar changeView={this.changeView} />
        <MainView activeView={this.state.activeView} />
      </div>
    );
  }
}

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

export default graphql(query)(Condictor);
