import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

export class Table extends React.Component {

  static propTypes = {
    hover: PropTypes.bool,
    border: PropTypes.bool,
    condense: PropTypes.bool,
    stripe: PropTypes.bool,
    responsive: PropTypes.bool,
    style: PropTypes.object,
  }

  static defaultProps = {
    responsive: true,
    hover: true,
    stripe: false,
    condense: false,
    border: false,
  }

  render() {
    const classes = cx({
      table: true,
      'table-hover': this.props.hover,
      'table-bordered': this.props.border,
      'table-condensed': this.props.condense,
      'table-striped': this.props.stripe,
    });

    return (
      <div className={this.props.responsive ? 'table-responsive' : ''}>
        <table className={classes} style={this.props.style}>
          {this.props.children}
        </table>
      </div>
    );
  }
}
