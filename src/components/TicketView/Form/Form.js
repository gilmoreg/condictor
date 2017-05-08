import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import NewTicket from './NewTicket/NewTicket';
import Search from './Search/Search';

const Form = (props) => {
  let formView;
  const options = {
    consumers: [],
    products: [],
    owners: [],
  };
  switch (props.activeTab) {
    case 'new': formView = (<NewTicket />); break;
    case 'search': formView = (<Search options={options} />); break;
    default: formView = (<Search options={options} />);
  }

  return (
    <div className="Form">
      {formView}
    </div>
  );
};

Form.defaultProps = {
  activeTab: 'search',
};

Form.propTypes = {
  activeTab: PropTypes.string,
};

export default Form;
