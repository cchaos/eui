import React, { FunctionComponent, ReactNode } from 'react';
import { EuiCode } from '../../../../src/components/code';
import { EuiThemeProvider, useEuiTheme } from '../../../../src/services';

const Box: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={{
        background: euiTheme.colors.lightShade,
        padding: euiTheme.size.xl,
      }}>
      <p>{children}</p>
    </div>
  );
};

export default () => {
  const overrides = {
    colors: {
      LIGHT: { lightShade: '#d3e6df' },
      DARK: { lightShade: '#394c4b' },
    },
  };

  return (
    <div>
      <EuiThemeProvider modify={overrides}>
        <Box>
          The background of this box is using the locally overridden value of{' '}
          <EuiCode>euiTheme.colors.lightShade</EuiCode>
        </Box>
      </EuiThemeProvider>
    </div>
  );
};
