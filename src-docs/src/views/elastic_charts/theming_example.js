import React, { Fragment } from 'react';
import { Link } from 'react-router';

import { ExternalBadge } from './shared';
import { Theming } from './theming';
import { Categorical } from './theming_categorical';

import {
  EuiSpacer,
  EuiText,
  EuiCodeBlock,
  EuiCode,
} from '../../../../src/components';

export const ElasticChartsThemingExample = {
  title: 'Creating charts',
  intro: (
    <Fragment>
      <ExternalBadge />
      <EuiSpacer size="l" />
      <EuiText>
        <p>
          EUI does not provide a direct way to add charts to your application.
          Instead, we provide some utilities and documentation on working with
          Elastic Charts, an open source charting library also created and
          maintained by Elastic.
        </p>
      </EuiText>
      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      title: 'Theming via EUI',
      text: (
        <Fragment>
          <p>
            To easily match charts to EUI, EUI provides both a light and dark
            Theme object. Simply import these objects from the themes folder and
            pass the correct one to the Settings.theme property.
          </p>
          <EuiCodeBlock language="javascript" isCopyable>
            {`import { EUI_DARK_THEME, EUI_LIGHT_THEME } from \'@elastic/eui/src/themes/charts/themes\';

<Settings theme={isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme} />`}
          </EuiCodeBlock>
          <p>
            EUI also provides some basic{' '}
            <Link to="/utilities/color-palettes">
              color palettes and palette functions
            </Link>{' '}
            if you would like to change the default color blind-safe scheme to
            another palette. You can import these from the services folder and
            apply them with Charts&apos;{' '}
            <EuiCode>mergeWithDefaultTheme</EuiCode> function.
          </p>
          <EuiCodeBlock language="javascript" isCopyable>
            {`import { mergeWithDefaultTheme } from '@elastic/charts';
import { palettes } from '@elastic/eui/src/services';

<Settings theme={
  mergeWithDefaultTheme(
    { colors: { vizColors: palettes.euiPaletteColorBlind.colors }},
    isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme
  )}
/>`}
          </EuiCodeBlock>
        </Fragment>
      ),
      demo: <Theming />,
    },
    {
      title: 'Coloring charts correctly',
      text: (
        <Fragment>
          <p>
            <strong>
              Use color to distinguish categories, represent quantity/density,
              and highlight data. You can help users focus on their data but
              using too many color variants in one chart can hinder
              understanding.
            </strong>
          </p>
          <p>
            When creating a multi-series chart where each series shows{' '}
            <strong>contrasting</strong> data, use the color blind safe palette
            of contrasting colors. This will also avoid implying levels of
            magnitude.
          </p>
          <p>
            Do not use too many colors in a single chart as this will hinder
            understanding. Instead, think about the data you are delivering and
            if there is a way to <strong>highlight</strong> key indicators. If
            the series&apos; are or can be combined into logical groups, use
            contrasting shapes/styles but keep the same color for within groups.
          </p>
          <h3>Quantity vs trends</h3>
          <p>
            When coloring for sequential series data (not categorical), rely on
            conventions. If the data signifies <strong>quantities</strong>, use
            a single color that spans from light for low amounts to dark colors
            for high amounts. If the data signifies <strong>trends</strong>, use
            a two color diverging scheme with the darkest at the extremes.
            Remember that red means bad/negative and green is good/positive.
          </p>
          <p>
            Whan signifying quantities, group values into intervals instead of a
            continuous gradient scale.
          </p>
        </Fragment>
      ),
      demo: <Categorical />,
    },
  ],
};
