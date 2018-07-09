import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiFlexGroup alignItems="center">
      <EuiFlexItem grow={false}><EuiIcon type="faceSad" /></EuiFlexItem>
      <EuiFlexItem grow={false}>On smaller screens, the icon will show above this text.</EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />

    <EuiFlexGroup responsive={false} alignItems="center">
      <EuiFlexItem grow={false}><EuiIcon type="faceHappy" /></EuiFlexItem>
      <EuiFlexItem grow={false}>On smaller screens, the icon will stay to the left of this text.</EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />

    <EuiFlexGroup responsive={['xs']} alignItems="center">
      <EuiFlexItem grow={false}><EuiIcon type="faceHappy" /></EuiFlexItem>
      <EuiFlexItem grow={false}>Only on mobile (&apos;xs&apos;), the icon will show above this text.</EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
