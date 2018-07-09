import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { RESPONSIVE_SIZES } from './sizes';

export const EuiShowFor = ({
  children,
  className,
  sizes,
  ...rest,
}) => {

  const sizingClasses = sizes.map((size) => {
    return `eui-showFor--${size}`;
  });

  const classes = classNames(
    'euiShowFor',
    sizingClasses,
    className
  );

  return (
    <span
      className={classes}
      {...rest}
    >
      {children}
    </span>
  );
};

EuiShowFor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * List of all the responsive sizes to show the children for
   */
  sizes: PropTypes.arrayOf(PropTypes.oneOf(RESPONSIVE_SIZES)).isRequired,
};
