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

import { computed } from '../../../../services/theme/utils';
import {
  makeHighContrastColor,
  shade,
  tint,
} from '../../../../global_styling/functions/_colors';

export const light_colors_ams = {
  // Brand
  primary: '#07C',
  accent: '#F04E98',

  // Status
  success: '#00BFB3',
  warning: '#FEC514',
  danger: '#BD271E',

  // Grays
  emptyShade: '#FFF',
  lightestShade: '#F5F7FA',
  lightShade: '#D3DAE6',
  mediumShade: '#98A2B3',
  darkShade: '#69707D',
  darkestShade: '#343741',
  fullShade: '#000',

  // Backgrounds
  pageBackground: computed(['colors.lightestShade'], ([lightestShade]) =>
    tint(lightestShade, 0.5)
  ),
  highlight: computed(['colors.warning'], ([warning]) => tint(warning, 0.9)),

  // Every color below must be based mathematically on the set above and in a particular order.
  text: computed(['colors.darkestShade'], ([darkestShade]) => darkestShade),
  title: computed(['colors.text'], ([text]) => shade(text, 0.5)),
  disabled: '#ABB4C4',

  textSubdued: computed(['colors.darkShade'], ([darkShade]) =>
    makeHighContrastColor(darkShade)
  ),
};