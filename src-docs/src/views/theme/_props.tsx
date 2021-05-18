import React, { FunctionComponent } from 'react';
import { useView } from 'react-view';
// @ts-ignore NOT TS
import { propUtilityForPlayground } from '../../services/playground';

export function getPropsFromThemeKey(component: any) {
  const docgenInfo = Array.isArray(component.__docgenInfo)
    ? component.__docgenInfo[0]
    : component.__docgenInfo;
  const { props } = docgenInfo;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = useView({ props: propUtilityForPlayground(props) });
  return params.knobProps.state;
}

import { EuiThemeShape } from '../../../../src/services';

export const EuiTheme: FunctionComponent<EuiThemeShape> = () => <div />;

import { _EuiThemeColors } from '../../../../src/global_styling/variables/_colors';

export const EuiThemeColors: FunctionComponent<_EuiThemeColors> = () => <div />;

import { EuiThemeSize } from '../../../../src/global_styling/variables/_size';

export const _EuiThemeSize: FunctionComponent<EuiThemeSize> = () => <div />;

import {
  _EuiThemeFontBase,
  _EuiThemeFontWeight,
  _EuiThemeFontScale,
} from '../../../../src/global_styling/variables/_typography';

export const EuiThemeFontBase: FunctionComponent<_EuiThemeFontBase> = () => (
  <div />
);
export const EuiThemeFontWeight: FunctionComponent<_EuiThemeFontWeight> = () => (
  <div />
);
export const EuiThemeFontScale: FunctionComponent<_EuiThemeFontScale> = () => (
  <div />
);

import {
  _EuiThemeBorderValues,
  _EuiThemeBorderTypes,
} from '../../../../src/global_styling/variables/_borders';

export const EuiThemeBorderValues: FunctionComponent<_EuiThemeBorderValues> = () => (
  <div />
);
export const EuiThemeBorderTypes: FunctionComponent<_EuiThemeBorderTypes> = () => (
  <div />
);

import { _EuiThemeFocus } from '../../../../src/global_styling/variables/_states';

export const EuiThemeFocus: FunctionComponent<_EuiThemeFocus> = () => <div />;

import {
  _EuiThemeAnimationSpeed,
  _EuiThemeAnimationEasing,
} from '../../../../src/global_styling/variables/_animations';

export const EuiThemeAnimationSpeed: FunctionComponent<_EuiThemeAnimationSpeed> = () => (
  <div />
);
export const EuiThemeAnimationEasing: FunctionComponent<_EuiThemeAnimationEasing> = () => (
  <div />
);

import { _EuiThemeBreakpoint } from '../../../../src/global_styling/variables/_breakpoint';

export const EuiThemeBreakpoint: FunctionComponent<_EuiThemeBreakpoint> = () => (
  <div />
);
