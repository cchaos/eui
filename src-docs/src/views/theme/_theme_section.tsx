import React, { FunctionComponent, ReactNode } from 'react';
import { EuiCode, EuiCodeBlock } from '../../../../src/components/code';
import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';
import { EuiText } from '../../../../src/components/text';
import { EuiSplitPanel, EuiPanel } from '../../../../src/components/panel';
import { GuideSectionExample } from '../../components/guide_section/guide_section_parts/guide_section_example';

export const LANGUAGES = ['javascript', 'html'] as const;

type ThemeSection = {
  code?: string;
  description?: ReactNode;
  themeValues?: ReactNode;
  property?: string;
  example?: GuideSectionExample['example'];
  snippet?: GuideSectionExample['tabContent'];
};

export const ThemeSection: FunctionComponent<ThemeSection> = ({
  code,
  description,
  themeValues,
  // property,
  example,
  snippet,
}) => {
  return (
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText size="s">
          {code && (
            <h3>
              <EuiCode language="ts" className="eui-textInheritColor">
                {code}
              </EuiCode>
            </h3>
          )}
          {description}
        </EuiText>
      </EuiFlexItem>
      {themeValues && (
        <EuiFlexItem grow={2}>
          <EuiPanel grow={false} paddingSize="m" color="subdued">
            <EuiFlexGroup direction="column" gutterSize="m">
              {themeValues}
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      )}
      {example && (
        <EuiFlexItem grow={2}>
          <EuiSplitPanel.Outer style={{ overflow: 'hidden' }}>
            <EuiSplitPanel.Inner>{example}</EuiSplitPanel.Inner>
            <EuiSplitPanel.Inner color="subdued">
              {snippet && (
                <EuiCodeBlock
                  isCopyable={true}
                  paddingSize="none"
                  transparentBackground={true}
                  language="jsx">
                  {`css\`
  ${snippet}
\``}
                </EuiCodeBlock>
              )}
            </EuiSplitPanel.Inner>
          </EuiSplitPanel.Outer>
        </EuiFlexItem>
      )}
    </EuiFlexGroup>
  );
};