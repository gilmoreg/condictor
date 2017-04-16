import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Select extends Component {
  render() {
    const options = this.props.options
      .map(item => <option key={item.id} value={item.username || item.name}>{item.username || item.name}</option>);
    const type = this.props.type.toLowerCase();

    return (
      <div>
        <label htmlFor={`search-${type}`}>{this.props.type}:</label>
        <select
          id={`search-${type}`}
          placeholder={this.props.type}
          onChange={this.props.handleChange}
        >
          <option />
          {options}
        </select>
      </div>
    );
  }
}

Select.defaultProps = {
  type: '',
  options: [],
  handleChange: () => {},
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
