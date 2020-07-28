/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import { css } from '@emotion/core';

import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';
import { IconType, EuiIcon } from '../icon';

import { EuiText } from '../text';
import usePropagate from '../../services/propagate/use_propagate';

type Color = 'primary' | 'success' | 'warning' | 'danger';
type Size = 's' | 'm';
type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

export type EuiCallOutProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    title?: ReactNode;
    iconType?: IconType;
    color?: Color;
    size?: Size;
    heading?: Heading;
  };

const colorToClassNameMap: { [color in Color]: string } = {
  primary: 'euiCallOut--primary',
  success: 'euiCallOut--success',
  warning: 'euiCallOut--warning',
  danger: 'euiCallOut--danger',
};

export const COLORS = keysOf(colorToClassNameMap);
export const HEADINGS: Heading[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];

const sizeToClassNameMap: { [size in Size]: string } = {
  s: 'euiCallOut--small',
  m: '',
};

export const EuiCallOut: FunctionComponent<EuiCallOutProps> = ({
  title,
  color = 'primary',
  size = 'm',
  iconType,
  children,
  className,
  heading,
  ...rest
}) => {
  const [themeName, borders] = usePropagate(['name', 'borders']);

  const amsterdamClass = themeName.includes('amsterdam')
    ? 'euiCallOut--amsterdam'
    : undefined;

  const classes = classNames(
    'euiCallOut',
    colorToClassNameMap[color],
    sizeToClassNameMap[size],
    amsterdamClass,
    className
  );

  const amsterdamStyles = themeName.includes('amsterdam')
    ? css`
        border-radius: ${borders.euiBorderRadius};
        border-left-width: 0;
      `
    : undefined;

  let headerIcon;
  if (iconType) {
    headerIcon = (
      <EuiIcon
        className="euiCallOutHeader__icon"
        type={iconType}
        size="m"
        aria-hidden="true"
      />
    );
  }

  let optionalChildren;
  if (children && size === 's') {
    optionalChildren = <EuiText size="xs">{children}</EuiText>;
  } else if (children) {
    optionalChildren = <EuiText size="s">{children}</EuiText>;
  }

  const H: any = heading ? `${heading}` : 'span';
  let header;

  if (title) {
    header = (
      <div className="euiCallOutHeader">
        {headerIcon}
        <H className="euiCallOutHeader__title">{title}</H>
      </div>
    );
  }
  return (
    <div css={amsterdamStyles} className={classes} {...rest}>
      {header}

      {optionalChildren}
    </div>
  );
};
