import React, { Component } from 'react';

export default class SearchOption extends Component {
  render() {
    let options = [];
    if (this.props.options) {
      options = this.props.options
        .map(item => <option key={item.id} value={item.name}>{item.name}</option>);
    }
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

SearchOption.defaultProps = {
  options: [],
};

SearchOption.propTypes = {
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string,
    }),
  ),
  type: React.PropTypes.string.isRequired,
  handleChange: React.PropTypes.func.isRequired,
};
