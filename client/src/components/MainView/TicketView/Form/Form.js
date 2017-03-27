import React, { Component } from 'react';
import './Form.css';
import NewTicket from './NewTicket/NewTicket';
import Search from './Search/Search';

class Form extends Component {
  render() {
    let formView;
    switch (this.props.activeTab) {
      case 'new': formView = (<NewTicket />); break;
      case 'search': formView = (<Search />); break;
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
};

Form.propTypes = {
  activeTab: React.PropTypes.string,
  close: React.PropTypes.func.isRequired,
};

export default Form;
