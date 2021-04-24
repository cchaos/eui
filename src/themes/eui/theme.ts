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

import { buildTheme } from '../../services/theme/utils';
import { EuiThemeShape } from '../../services/theme/types';
import { animation } from '../../global_styling/variables/_animations';
import { breakpoints } from '../../global_styling/variables/_responsive';
import { colors } from '../../global_styling/variables/_colors';
import { base, size } from '../../global_styling/variables/_size';
import { focus } from '../../global_styling/variables/_states';
import fonts from '../../global_styling/variables/_typography';
import { border } from '../../global_styling/variables/_borders';
import { title } from '../../global_styling/variables/title';
import { shadow } from '../../global_styling/variables/_shadows';
import { zIndex } from '../../global_styling/variables/_z_index';

export const euiThemeDefault: EuiThemeShape = {
  colors,
  base,
  size,
  ...fonts,
  border,
  title,
  focus,
  shadow,
  animation,
  breakpoints,
  zIndex,
};

export const EuiThemeDefault = buildTheme(euiThemeDefault, 'EUI_THEME_DEFAULT');