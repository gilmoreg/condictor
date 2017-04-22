import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './HorizontalTab.css';

class HorizontalTab extends Component {
  render() {
    return (
      <div className="HorizontalTab">
        <button onClick={this.props.onClick}>{this.props.title}</button>
      </div>
    );
  }
}

HorizontalTab.defaultProps = {
  title: '',
  onClick: null,
};

HorizontalTab.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default HorizontalTab;
