import React, {
  Component,
} from 'react';

import {
  EuiSuperSelect,
  EuiHealth,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = [
      {
        value: 'warning',
        inputDisplay: (
          <EuiHealth color="subdued" style={{ lineHeight: 'inherit' }}>
            Warning
          </EuiHealth>
        ),
      },
      {
        value: 'minor',
        inputDisplay: (
          <EuiHealth color="warning" style={{ lineHeight: 'inherit' }}>
            Minor
          </EuiHealth>
        ),
      },
      {
        value: 'critical',
        inputDisplay: (
          <EuiHealth color="danger" style={{ lineHeight: 'inherit' }}>
            Critical
          </EuiHealth>
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
      <EuiSuperSelect
        options={this.options}
        valueOfSelected={this.state.value}
        onChange={this.onChange}
        aria-label="Health levels"
      />
    );
  }
}
