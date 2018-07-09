import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


import { RESPONSIVE_SIZES } from './sizes';

export const EuiHideFor = ({
  children,
  className,
  sizes,
  ...rest,
}) => {

  const sizingClasses = sizes.map((size) => {
    return `eui-hideFor--${size}`;
  });

  const classes = classNames(
    'euiHideFor',
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

EuiHideFor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * List of all the responsive sizes to hide the children from
   */
  sizes: PropTypes.arrayOf(PropTypes.oneOf(RESPONSIVE_SIZES)).isRequired,
};
