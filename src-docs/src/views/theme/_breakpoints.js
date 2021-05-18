import React from 'react';
import { useEuiTheme } from '../../../../src/services';

import { EuiTitle, EuiSpacer, EuiFlexItem } from '../../../../src/components';

import { ThemeSection } from './_theme_section';
import { ThemeValue } from './_values';

import { getPropsFromThemeKey, EuiThemeBreakpoint } from './_props';

export default ({ onThemeUpdate }) => {
  const { euiTheme } = useEuiTheme();
  const breakpoint = euiTheme.breakpoint;
  const breakpointTypes = getPropsFromThemeKey(EuiThemeBreakpoint);

  const updateBreakpoint = (property, value) => {
    onThemeUpdate({
      breakpoint: {
        [property]: value,
      },
    });
  };

  return (
    <div>
      <EuiTitle>
        <h2>Breakpoints</h2>
      </EuiTitle>

      <EuiSpacer />

      <ThemeSection
        code="_EuiThemeBreakpoint"
        description={
          <p>
            These original set of breakpoint keys specify the minimum window
            size and are required. However, you can adjust and/or add more keys
            as needed.
          </p>
        }
        themeValues={Object.keys(breakpointTypes).map((prop) => {
          return (
            <EuiFlexItem key={prop} className={'guideSass__animRow'}>
              <ThemeValue
                property="breakpoint"
                type={breakpointTypes[prop]}
                name={prop}
                value={breakpoint[prop]}
                onUpdate={(value) => updateBreakpoint(prop, value)}
                groupProps={{
                  alignItems: 'center',
                }}
              />
            </EuiFlexItem>
          );
        })}
      />
    </div>
  );
};
