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

import euiColorsDark from '../eui/eui_colors_dark';

const brand = {
  euiColorPrimary: '#238CFF',
  euiColorSecondary: '#7DE2D1',
  euiColorAccent: '#F990C0',
};

const colors = {
  ...euiColorsDark,
  ...brand,

  euiColorHighlight: '#232635',
};

export default colors;
export { colors };