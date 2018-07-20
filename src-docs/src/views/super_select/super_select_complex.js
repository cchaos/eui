import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiSuperSelect,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = [
      {
        value: 'option_one',
        inputDisplay: 'Option one',
        dropdownDisplay: (
          <Fragment>
            <strong>Option one</strong>
            <EuiSpacer size="xs" />
            <EuiText size="s" color="subdued">
              <p className="euiTextColor--subdued">Has a short description giving more detail to the option.</p>
            </EuiText>
          </Fragment>
        ),
      },
      {
        value: 'option_two',
        inputDisplay: 'Option two',
        dropdownDisplay: (
          <Fragment>
            <strong>Option two</strong>
            <EuiSpacer size="xs" />
            <EuiText size="s" color="subdued">
              <p className="euiTextColor--subdued">Has a short description giving more detail to the option.</p>
            </EuiText>
          </Fragment>
        ),
      },
      {
        value: 'option_three',
        inputDisplay: 'Option three',
        dropdownDisplay: (
          <Fragment>
            <strong>Option three</strong>
            <EuiSpacer size="xs" />
            <EuiText size="s" color="subdued">
              <p className="euiTextColor--subdued">Has a short description giving more detail to the option.</p>
            </EuiText>
          </Fragment>
        ),
      },
    ];

    this.state = {
      value: this.options[1].value,
    };
  }

  onChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiSuperSelect
          options={this.options}
          valueOfSelected={this.state.value}
          onChange={this.onChange}
          itemLayoutAlign="top"
          hasDividers
          aria-label="Use aria labels when no actual label is in use"
        />
      </Fragment>
    );
  }
}
