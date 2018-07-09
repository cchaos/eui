import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { RESPONSIVE_SIZES } from './sizes';
import { EuiHideFor } from './hide_for';

describe('EuiHideFor', () => {
  RESPONSIVE_SIZES.forEach(size => {
    test(`${size} is rendered`, () => {
      const component = render(
        <EuiHideFor sizes={[size]} {...requiredProps} />
      );

      expect(component)
        .toMatchSnapshot();
    });
  });
});
