import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TYPES as ICON_TYPES } from './constants';
export const TYPES = Object.keys(ICON_TYPES);

const colorToClassMap = {
  default: null,
  primary: 'euiIcon--primary',
  secondary: 'euiIcon--secondary',
  success: 'euiIcon--success',
  accent: 'euiIcon--accent',
  warning: 'euiIcon--warning',
  danger: 'euiIcon--danger',
  text: 'euiIcon--text',
  subdued: 'euiIcon--subdued',
  ghost: 'euiIcon--ghost',
};

export const COLORS = Object.keys(colorToClassMap);

const sizeToClassNameMap = {
  original: null,
  s: 'euiIcon--small',
  m: 'euiIcon--medium',
  l: 'euiIcon--large',
  xl: 'euiIcon--xLarge',
  xxl: 'euiIcon--xxLarge',
};

export const SIZES = Object.keys(sizeToClassNameMap);

const alignmentToClassNameMap = {
  middle: null,
  baseline: 'euiIcon--alignBaseline',
  bottom: 'euiIcon--alignBottom',
  top: 'euiIcon--alignTop',
};

export const ALIGNMENTS = Object.keys(alignmentToClassNameMap);

export const EuiIcon = ({
  type,
  size,
  color,
  className,
  tabIndex,
  verticalAlign,
  style,
  ...rest
}) => {
  let optionalAlignmentClass = null;
  let optionalColorClass = null;
  const optionalCustomStyles = { ...style };

  if (typeof verticalAlign === 'number') {
    optionalCustomStyles.top = verticalAlign;
    optionalAlignmentClass = 'euiIcon--customAlign';
  }

  if (COLORS.indexOf(color) > -1) {
    optionalColorClass = colorToClassMap[color];
  } else {
    optionalCustomStyles.fill = color;
  }

  // These icons are a little special and get some extra CSS flexibility
  const isAppIcon = /.+App$/.test(type) || /.+Job$/.test(type) || (type === 'dataVisualizer');

  const classes = classNames(
    'euiIcon',
    sizeToClassNameMap[size],
    alignmentToClassNameMap[verticalAlign],
    optionalAlignmentClass,
    optionalColorClass,
    {
      'euiIcon--app': isAppIcon,
    },
    className,
  );

  const Svg = ICON_TYPES[type] || ICON_TYPES.empty;

  // This is a fix for IE and Edge, which ignores tabindex="-1" on an SVG, but respects
  // focusable="false".
  //   - If there's no tab index specified, we'll default the icon to not be focusable,
  //     which is how SVGs behave in Chrome, Safari, and FF.
  //   - If tab index is -1, then the consumer wants the icon to not be focusable.
  //   - For all other values, the consumer wants the icon to be focusable.
  const focusable = (!tabIndex || tabIndex === '-1') ? 'false' : 'true';

  return (
    <Svg
      className={classes}
      style={optionalCustomStyles}
      tabIndex={tabIndex}
      focusable={focusable}
      {...rest}
    />
  );
};

function checkValidColor(props, propName, componentName) {
  const validHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(props.color);
  if (props.color && !validHex && !COLORS.includes(props.color)) {
    throw new Error(
      `${componentName} needs to pass a valid color. This can either be a three ` +
      `or six character hex value or one of the following: ${COLORS}`
    );
  }
}

EuiIcon.propTypes = {
  type: PropTypes.oneOf(TYPES),
  color: checkValidColor,
  size: PropTypes.oneOf(SIZES),

  /**
   * Sets the vertical alignment of the icon compared to it's siblings,
   * set to a string matching one of the possible alignment options,
   * or set to an integer (negative/positive) of the amount to shift the top of the icon
   */
  verticalAlign: PropTypes.oneOfType([
    PropTypes.oneOf(ALIGNMENTS),
    PropTypes.number,
  ]),
};

EuiIcon.defaultProps = {
  size: 'm',
  verticalAlign: 'middle',
};
