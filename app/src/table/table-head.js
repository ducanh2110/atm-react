import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

export class TableHead extends React.Component {

  static propTypes = {
    blackMutedBackground: PropTypes.bool,
  }

  static defaultProps = {
    blackMutedBackground: true,
  }

  render() {
    const classes = cx({
      'black-muted-bg': this.props.blackMutedBackground,
    });

    return (
      <thead>
        <tr className={classes}>
          {this.props.children}
        </tr>
      </thead>
    );
  }
}
