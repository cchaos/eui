import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiButton,
  EuiFieldText,
  EuiFieldPassword,
  EuiInlineEditableForm,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiFlexGroup style={{ maxWidth: 600 }}>
      <EuiFlexItem>
        <EuiFormRow>
          <EuiFieldText value="example@example.com" readOnly />
        </EuiFormRow>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFormRow>
          <EuiFieldPassword placeholder="*****" />
        </EuiFormRow>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiFormRow>
          <EuiButton>Update Password</EuiButton>
        </EuiFormRow>
      </EuiFlexItem>
    </EuiFlexGroup>
    <EuiInlineEditableForm />
  </div>
);
