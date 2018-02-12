import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiInlineEditableForm } from './inline_editable_form';

describe('EuiInlineEditableForm', () => {
  test('is rendered', () => {
    const component = render(
      <EuiInlineEditableForm {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
