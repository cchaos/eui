import React from 'react';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../src/services';

import {
  EuiText,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiCode,
} from '../../../../src/components';

import {
  fontBase,
  fontWeight,
  fontScale,
} from '../../../../src/global_styling/variables/_typography';

import { ThemeValue } from './_values';
import { EuiCallOut } from '../../../../src/components/call_out';

const baseKeys = Object.keys(fontBase);
const weightKeys = Object.keys(fontWeight);
const scaleKeys = Object.keys(fontScale);

export default () => {
  const { euiTheme } = useEuiTheme();
  const font = euiTheme.font;

  return (
    <div>
      <EuiText>
        <h2>Typography</h2>
        <p>
          The typography specific theme keys start with the{' '}
          <EuiCode>font</EuiCode> key.
        </p>
      </EuiText>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText grow={false} size="s">
            <h3>Base</h3>
            <p>
              The base font settings determine things like{' '}
              <EuiCode>family</EuiCode> and <EuiCode>featureSettings</EuiCode>.
            </p>
            <p>
              The <EuiCode>lineHeightMultiplier</EuiCode> established the
              line-height in percentages compared to the font-size, but it is
              the <EuiCode>baseline</EuiCode> integer that establishes the final
              pixel/rem value by ensuring it falls on a multiplier of this
              baseline.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            {baseKeys.map((key) => (
              <ThemeValue
                key={key}
                property={'font'}
                name={key}
                value={font[key]}
                groupProps={{ wrap: true, gutterSize: 'none' }}
              />
            ))}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText grow={false} size="s">
            <h3>Weight</h3>
            <p>
              Matches up colloqual weight names with their appropriate number
              values.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            {weightKeys.map((key) => (
              <ThemeValue
                key={key}
                property="font"
                name={key}
                value={font.weight[key]}
                buttonStyle={css`
                  font-weight: ${font.weight[key]};
                `}
                example={'Aa'}
              />
            ))}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText grow={false} size="s">
            <h3>Scale</h3>
            <p>
              The typographic scale that is used to calculate the font size
              variables. These are multipliers applied the{' '}
              <EuiCode>euiTheme.base</EuiCode> value.
            </p>
            <p>The default scale is loosely based on Major Third (1.250).</p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            <EuiFlexGroup direction="column" gutterSize="s">
              {scaleKeys.map((key) => (
                <ThemeValue
                  key={key}
                  property="font"
                  name={key}
                  value={font.scale[key]}
                />
              ))}
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText grow={false} size="s">
            <h3>Size</h3>
            <p>
              Each <EuiCode>font.size</EuiCode> comes with both the{' '}
              <EuiCode>fontSize</EuiCode> and <EuiCode>lineHeight</EuiCode>{' '}
              values to be applied appropriately. If you just want to apply the
              font size, you need to grab the nested value like{' '}
              <EuiCode>euiTheme.font.size.s.fontSize</EuiCode>.
            </p>
            <EuiCallOut title="Move this out of main theme?" />
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          {scaleKeys.map((key) => (
            <React.Fragment key={key}>
              <EuiPanel paddingSize="l" color="subdued">
                <div css={[font.size[key]]}>The quick brown fox</div>
                <EuiSpacer size="s" />
                <ThemeValue
                  property="font"
                  name={key}
                  value={JSON.stringify(font.size[key])}
                />
              </EuiPanel>
              <EuiSpacer size="s" />
            </React.Fragment>
          ))}
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
