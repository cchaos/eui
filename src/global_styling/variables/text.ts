/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';
import { computed } from '../../services/theme/utils';
import {
  fontSizeFromScale,
  lineHeightFromBaseline,
} from '../functions/_typography';
import { _EuiThemeFontScale, SCALES } from './_typography';

export type EuiThemeFontSize = {
  [mapType in _EuiThemeFontScale]: {
    fontSize: CSSProperties['fontSize'];
    lineHeight: CSSProperties['lineHeight'];
  };
};

export const fontSize: EuiThemeFontSize = SCALES.reduce((acc, elem) => {
  acc[elem] = {
    fontSize: computed(([base, scale]) => fontSizeFromScale(base, scale), [
      'base',
      `font.scale.${elem}`,
    ]),
    lineHeight: computed(
      ([base, font]) => lineHeightFromBaseline(base, font, font.scale[elem]),
      ['base', 'font']
    ),
  };
  return acc;
}, {} as EuiThemeFontSize);
