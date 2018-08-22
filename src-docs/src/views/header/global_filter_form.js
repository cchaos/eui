import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pull } from 'lodash';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiFormRow,
  EuiComboBox,
  EuiButton,
  EuiLink,
} from '../../../../src/components';

const fieldOptions = [
  {
    label: 'Fields',
    isGroupLabelOption: true,
  },
  {
    label: 'field_1',
  },
  {
    label: 'field_2',
  },
  {
    label: 'field_3',
  },
  {
    label: 'field_4',
  },
];
const operatorOptions = [
  {
    label: 'Operators',
    isGroupLabelOption: true,
  },
  {
    label: 'IS',
  },
  {
    label: 'IS NOT',
  },
  {
    label: 'IS ONE OF',
  },
  {
    label: 'EXISTS',
  },
];
const valueOptions = [
  {
    label: 'Values',
    isGroupLabelOption: true,
  },
  {
    label: 'Value 1',
  },
  {
    label: 'Value 2',
  },
  {
    label: 'Value 3',
  },
  {
    label: 'Value 4',
  },
];

export default class GlobalFilterForm extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    selectedObject: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      isComboBoxLoading: false,
      selectedComboBoxOptions: [],
      comboBoxOptions: [],
      editingOption: null,
    };
  }

  onComboBoxChange = selectedComboBoxOptions => {
    const selectedOptions = selectedComboBoxOptions || [];
    const numOfSelections = selectedOptions.length;
    const lastUpdate = selectedOptions[selectedOptions.length - 1];
    const current = {};

    // If length is less than 3, then move on to the next
    if (numOfSelections < 3) {
      switch (numOfSelections) {
        case 0:
          current.selectedComboBoxOptions = [];
          current.editingOption = 'field';
          current.comboBoxOptions = fieldOptions;
          break;
        case 1:
          current.selectedComboBoxOptions = selectedOptions;
          current.editingOption = 'operator';
          current.comboBoxOptions = operatorOptions;
          break;
        default:
          // 2 or more
          current.selectedComboBoxOptions = selectedOptions;
          current.editingOption = 'value';
          current.comboBoxOptions = valueOptions;
          break;
      }
    } else {
      // else stay on and just update the value
      switch (this.state.editingOption) {
        case 'field':
          pull(selectedOptions, lastUpdate);
          selectedOptions[0] = lastUpdate;
          break;
        case 'operator':
          pull(selectedOptions, lastUpdate);
          selectedOptions[1] = lastUpdate;
          break;
        default:
          // 'value'
          break;
      }

      current.selectedComboBoxOptions = selectedOptions;
    }

    // Add the appropriate click handlers to the first two selected options
    // (if they exist)
    if (numOfSelections > 0) {
      current.selectedComboBoxOptions[0].onClick = this.fieldClicked;
    }
    if (numOfSelections > 1) {
      current.selectedComboBoxOptions[1].onClick = this.opClicked;
    }

    this.setState({ ...current });
  };

  fieldClicked = () => {
    this.setState({
      comboBoxOptions: fieldOptions,
      editingOption: 'field',
    });
  };

  opClicked = () => {
    this.setState({
      comboBoxOptions: operatorOptions,
      editingOption: 'operator',
    });
  };

  // eslint-disable-next-line no-unused-vars
  onSearchChange = searchValue => {
    //const options = this.state.comboBoxOptions;
    // this.setState({
    //   isComboBoxLoading: true,
    //   comboBoxOptions: [],
    // });
    // clearTimeout(this.searchTimeout);
    // if (this.state.selectedComboBoxOptions.length === 1) {
    //   options = operatorOptions;
    // } else if (this.state.selectedComboBoxOptions.length > 1) {
    //   options = valueOptions;
    // }
    // this.searchTimeout = setTimeout(() => {
    //   // Simulate a remotely-executed search.
    //this.setState({
    // isComboBoxLoading: false,
    //comboBoxOptions: options.filter(option => option.label.toLowerCase().includes(searchValue.toLowerCase())),
    //});
    // }, 200);
  };

  componentDidMount() {
    // Simulate initial load.
    //this.onSearchChange('');
    this.onComboBoxChange(this.props.selectedObject);
  }

  render() {
    const {
      onAdd,
      onCancel,
      selectedObject, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    const label = (
      <EuiFlexGroup alignItems="baseline">
        <EuiFlexItem>Field, Operator, Value(s)</EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiLink>Edit as Query DSL</EuiLink>
        </EuiFlexItem>
      </EuiFlexGroup>
    );

    return (
      <div {...rest}>
        <EuiFormRow label={label}>
          <EuiComboBox
            placeholder="Start by selecting a field"
            async
            options={this.state.comboBoxOptions}
            selectedOptions={this.state.selectedComboBoxOptions}
            isLoading={this.state.isComboBoxLoading}
            onChange={this.onComboBoxChange}
            onSearchChange={this.onSearchChange}
          />
        </EuiFormRow>

        <EuiFlexGroup direction="rowReverse" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButton fill onClick={onAdd}>
              Add
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty onClick={onCancel}>Cancel</EuiButtonEmpty>
          </EuiFlexItem>
          <EuiFlexItem />
        </EuiFlexGroup>
      </div>
    );
  }
}
