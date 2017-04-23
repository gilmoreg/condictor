import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import NewTicket from './NewTicket/NewTicket';
import Search from './Search/Search';

export class Form extends Component {
  render() {
    let formView;
    const options = {
      consumers: [],
      products: [],
      owners: [],
    };
    switch (this.props.activeTab) {
      case 'new': formView = (<NewTicket />); break;
      case 'search': formView = (<Search options={options} />); break;
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
  close: null,
};

Form.propTypes = {
  activeTab: PropTypes.string,
  close: PropTypes.func,
};

export default Form;
