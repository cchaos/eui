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

import { computed } from '../../services/theme/utils';
import { ColorModeSwitch } from '../../services/theme/types';
import { shade, tint, transparentize } from '../../services/color';
import { CSSProperties } from 'react';
import { sizeToPixel } from './_size';

export interface _EuiThemeFocusOutline {
  /**
   * A single CSS property: value
   */
  [key: string]: ColorModeSwitch;
}

export interface _EuiThemeFocus {
  /**
   * Color is used deterministically by the legacy theme, and as fallback for Amsterdam
   */
  color: ColorModeSwitch;
  /**
   * Used to transprentize any color at certain values
   */
  transparency: ColorModeSwitch<number>;
  /**
   * Default color plus transparency
   */
  backgroundColor: ColorModeSwitch;
  /**
   * Width is the thickness of the outline or faux ring
   */
  width: CSSProperties['borderWidth'];
  /**
   * Larger thickness of the outline for larger components
   */
  widthLarge: CSSProperties['borderWidth'];
  /**
   * Using `outline` is new for Amsterdam but is set to `none` in legacy theme
   */
  outline: _EuiThemeFocusOutline;
}

export const focus: _EuiThemeFocus = {
  color: computed(({ colors }) => transparentize(colors.primary, 0.3)),
  transparency: { LIGHT: 0.1, DARK: 0.3 },
  backgroundColor: {
    LIGHT: computed(
      ([primary, transparency]) => tint(primary, 1 - transparency),
      ['colors.primary', 'focus.transparency']
    ),
    DARK: computed(
      ([primary, transparency]) => shade(primary, 1 - transparency),
      ['colors.primary', 'focus.transparency']
    ),
  },

  // Sizing
  widthLarge: computed(sizeToPixel(0.25)),
  width: computed(sizeToPixel(0.125)),

  // Outline
  outline: {
    'box-shadow': computed(([color, width]) => `0 0 0 ${width} ${color}`, [
      'focus.color',
      'focus.width',
    ]),
  },
};
