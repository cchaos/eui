import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT
} from '../../services';

const ALIGNMENT = [
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT
];

export const EuiTableRowCell = ({
  align,
  children,
  className,
  truncateText,
  textOnly,
  colSpan,
  header,
  hideForMobile,
  isMobileHeader,
  ...rest
}) => {
  const cellClasses = classNames('euiTableRowCell', {
    'euiTableRowCell--hideForMobile': hideForMobile,
    'euiTableRowCell--isMobileHeader': isMobileHeader,
  });

  const contentClasses = classNames('euiTableCellContent', className, {
    'euiTableCellContent--alignRight': align === RIGHT_ALIGNMENT,
    'euiTableCellContent--alignCenter': align === CENTER_ALIGNMENT,
    'euiTableCellContent--truncateText': truncateText,
    // We're doing this rigamarole instead of creating `euiTableCellContent--textOnly` for BWC
    // purposes for the time-being.
    'euiTableCellContent--overflowingContent': !textOnly,
  });

  return (
    <td className={cellClasses} colSpan={colSpan} data-header={header}>
      <div className={contentClasses} {...rest}>
        {
          textOnly === true
            ? <span className="euiTableCellContent__text">{children}</span>
            : children
        }
      </div>
    </td>
  );
};

EuiTableRowCell.propTypes = {
  align: PropTypes.oneOf(ALIGNMENT),
  truncateText: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  textOnly: PropTypes.bool,
  colSpan: PropTypes.number,
  header: PropTypes.string,
  hideForMobile: PropTypes.bool,
  isMobileHeader: PropTypes.bool,
};

EuiTableRowCell.defaultProps = {
  align: LEFT_ALIGNMENT,
  textOnly: true
};
