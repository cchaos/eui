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

// // Converting a normal hex color to RBG
// @function hexToRGB($color) {
//   @return 'rgb%28#{round(red($color))}, #{round(green($color))}, #{round(blue($color))}%29';
// }
//
// // Mixes a provided color with white.
// @function tint($color, $percent) {
//   @return mix($euiColorGhost, $color, $percent);
// }
//
// // Mixes a provided color with black.
// @function shade($color, $percent) {
//   @return mix($euiColorInk, $color, $percent);
// }
//
// // For theming. Checks the text color and tells us whether it's light or dark.
// // Based on that we either tint (add white) or shade (add black).
// @function tintOrShade($color, $tint, $shade) {
//   @if (lightness($euiTextColor) > 50) {
//     @return shade($color, $shade);
//   } @else {
//     @return tint($color, $tint);
//   }
// }
//
// // The reverse of the above
// @function shadeOrTint($color, $shade, $tint) {
//   @if (lightness($euiTextColor) < 50) {
//     @return shade($color, $shade);
//   } @else {
//     @return tint($color, $tint);
//   }
// }
//
// // Similar to above, but uses the light or dark color based
// // on whether it's the light or dark theme
// @function lightOrDarkTheme($lightColor, $darkColor) {
//   @if (lightness($euiTextColor) < 50) {
//     @return $lightColor;
//   } @else {
//     @return $darkColor;
//   }
// }
//
// // Calculates luminance, which is better than brightness for checking colors
// // pow, nth functions come from the _math.scss functions
// @function luminance($color) {
//   // Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
//   $rgba: red($color), green($color), blue($color);
//   $rgba2: ();
//
//   @for $i from 1 through 3 {
//     $rgb: nth($rgba, $i);
//     $rgb: $rgb / 255;
//
//     $rgb: if($rgb < .03928, $rgb / 12.92, pow(($rgb + .055) / 1.055, 2.4));
//
//     $rgba2: append($rgba2, $rgb);
//   }
//
//   @return .2126 * nth($rgba2, 1) + .7152 * nth($rgba2, 2) + .0722 * nth($rgba2, 3);
// }
//
// // Calculate contrast
// @function contrastRatio($background, $foreground) {
//   $backgroundLum: luminance($background) + .05;
//   $foregroundLum: luminance($foreground) + .05;
//
//   @return max($backgroundLum, $foregroundLum) / min($backgroundLum, $foregroundLum);
// }
//
// // Given $color, decide whether $lightText or $darkText should be used as the text color
// // ex: chooseLightOrDarkText(#EEE, #FFF, #000) would return #000 because it has
// //     a higher contrast than #FFF against a #EEE background.
// @function chooseLightOrDarkText($background, $lightText, $darkText) {
//   $lightContrast: contrastRatio($background, $lightText);
//   $darkContrast: contrastRatio($background, $darkText);
//
//   @if ($lightContrast > $darkContrast) {
//     @return $lightText;
//   } @else {
//     @return $darkText;
//   }
// }
//
// // Given a $foreground and a $background, make the $foreground AA accessibility by slightly
// // adjusting it till the contrast is high enough
// // By default it will compare against the page background color
//
// // ex: makeContrastColor($lightPink, #FFF) would continually shade the pink until
// //     it had higher than 4.5 contrast on a white background.
// @function makeHighContrastColor($foreground, $background: $euiPageBackgroundColor, $ratio: 4.5) {
//   $contrast: contrastRatio($foreground, $background);
//
//   // Determine the lightness factor of the background color first to
//   // determine whether to shade or tint the foreground.
//   $brightness: lightness($background);
//
//   $highContrastTextColor: $foreground;
//
//   @while ($contrast < $ratio) {
//     @if ($brightness > 50) {
//       $highContrastTextColor: shade($highContrastTextColor, 5%);
//     } @else {
//       $highContrastTextColor: tint($highContrastTextColor, 5%);
//     }
//
//     $contrast: contrastRatio($highContrastTextColor, $background);
//
//     @if (lightness($highContrastTextColor) < 5) {
//       @warn 'High enough contrast could not be determined. Most likely your background color does not adjust for light mode.';
//       @return $highContrastTextColor;
//     }
//
//     @if (lightness($highContrastTextColor) > 95) {
//       @warn 'High enough contrast could not be determined. Most likely your background color does not adjust for dark mode.';
//       @return $highContrastTextColor;
//     }
//   }
//
//   @return $highContrastTextColor;
// }
//
// // Graphics such as stand alone icons and pieces of a graph only need a minimum ratio of 3:1 with its background.
// // Therefore, we can reuse the `makeHighContrastColor()` function but only attain a min contrast of 3.0.
// // It is still recommended to use `makeHighContrastColor()` to attain a 4.5:1 ratio if the graphic is small or thinly stroked.
// // https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Informational_Graphic_Contrast_(Minimum)
// @function makeGraphicContrastColor($color, $background: $euiPageBackgroundColor) {
//   @return makeHighContrastColor($color, $background, 3);
// }

export const makeHighContrastColor = (color: string, color2?: string) => {
  if (color2) return color;
  return color;
};
export const shade = (color: string, param1?: string) => {
  if (param1) return color;
  return color;
};
export const tint = (color: string, param1?: string) => {
  if (param1) return color;
  return color;
};
export const tintOrShade = (
  color: string,
  param1?: string,
  param2?: string
) => {
  if (param1 || param2) return color;
  return color;
};
export const shadeOrTint = (
  color: string,
  param1?: string,
  param2?: string
) => {
  if (param1 || param2) return color;
  return color;
};