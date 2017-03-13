import React, { Component } from 'react';
import './HorizontalTab.css';

class HorizontalTab extends Component {
  render() {
    return (
      <div className="HorizontalTab">
        {this.props.title}
      </div>
    );
  }
}

HorizontalTab.defaultProps = {
  title: 'Tab',
};

HorizontalTab.propTypes = {
  title: React.PropTypes.string,
};

export default HorizontalTab;
