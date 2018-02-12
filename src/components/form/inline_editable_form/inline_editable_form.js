import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiButtonIcon } from '../../button';
import { EuiFieldText } from '../field_text';

export class EuiInlineEditableForm extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };
  }

  onButtonClick = () => {
    this.setState({
      isEditing: !this.state.isEditing,
    });
  }

  render() {
    const {
      //children,
      className,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiInlineEditableForm',
      {
        'euiInlineEditableForm--isEditing': this.state.isEditing
      },
      className
    );

    let buttonNodes;
    if (this.state.isEditing) {
      buttonNodes = (
        <div style={{ display: 'inline' }}>
          <EuiButtonIcon iconType="minusInCircle" aria-label="cancel" onClick={this.onButtonClick} />
          <EuiButtonIcon iconType="checkInCircle" aria-label="save" onClick={this.onButtonClick} />
        </div>
      );
    } else {
      buttonNodes = (
        <EuiButtonIcon iconType="pencil" aria-label="edit" onClick={this.onButtonClick} />
      );
    }

    return (
      <div
        className={classes}
        {...rest}
      >
        <div className="euiInlineEditableForm__inputs">
          <EuiFieldText
            defaultValue="example@example.com"
            readOnly={!this.state.isEditing}
          />
          <span
            className="euiInlineEditableForm__textOnly"
            readOnly
          >
            example@example.com
          </span>

          {buttonNodes}

        </div>

      </div>
    );
  }
}
