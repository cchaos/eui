import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiIcon,
  ICON_SIZES,
  ICON_TYPES,
} from '../icon';

export const EuiHeaderLogo = ({ iconType, iconTitle, href, children, className, iconSize, ...rest }) => {
  const classes = classNames('euiHeaderLogo', className);

  return (
    <a href={href} className={classes} {...rest}>
      <EuiIcon
        className="euiHeaderLogo__icon"
        size={iconSize}
        type={iconType}
        title={iconTitle}
        verticalAlign={-2}
      />

      {children &&
        <span className="euiHeaderLogo__text">{children}</span>
      }
    </a>
  );
};

EuiHeaderLogo.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
  iconTitle: PropTypes.string,
  iconType: PropTypes.oneOf(ICON_TYPES),
  iconSize: PropTypes.oneOf(ICON_SIZES),
};

EuiHeaderLogo.defaultProps = {
  iconType: 'logoElastic',
  iconTitle: 'Elastic',
  iconSize: 'xl',
};
