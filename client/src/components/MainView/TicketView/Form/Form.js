import React, { Component } from 'react';
import './Form.css';
import NewTicket from './NewTicket/NewTicket';
import Search from './Search/Search';

class Form extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let formView;
    switch (this.props.activeTab) {
      case 'new': formView = (<NewTicket />); break;
      case 'search': formView = (<Search />); break;
      default: formView = (<div />);
    }

    return (
      <div className="Form">
        {formView}
      </div>
    );
  }
}

Form.defaultProps = {
  activeTab: 'new',
};

Form.propTypes = {
  activeTab: React.PropTypes.string,
};

export default Form;
