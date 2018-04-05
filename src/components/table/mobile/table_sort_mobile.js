import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiButtonEmpty } from '../../button/button_empty';
import { EuiPopover } from '../../popover';
import { EuiContextMenuPanel } from '../../context_menu';
import { EuiTableSortMobileItem } from './table_sort_mobile_item';

export class EuiTableSortMobile extends Component {
  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.array,
  }

  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
    };
  }

  onButtonClick = () => {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  }

  render() {
    const {
      className,
      items,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiTableSortMobile',
      className
    );

    const mobileSortButton = (
      <EuiButtonEmpty
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick.bind(this)}
        flush="right"
        size="xs"
      >
        Sorting
      </EuiButtonEmpty>
    );

    const mobileSortPopover = (
      <EuiPopover
        id="sortPopover"
        ownFocus
        button={mobileSortButton}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover}
        anchorPosition="downRight"
        panelPaddingSize="none"
        {...rest}
      >
        <EuiContextMenuPanel
          style={{ minWidth: 200 }}
          items={items && items.length ? items.map(item => {
            return (
              <EuiTableSortMobileItem
                key={item.key}
                onSort={() => {
                  item.onSort();
                  this.closePopover();
                }}
                isSorted={item.isSorted}
                isSortAscending={item.isSortAscending}
                hideForMobile={item.hideForMobile}
              >
                {item.name}
              </EuiTableSortMobileItem>
            );
          }) : null}
        />
      </EuiPopover>
    );

    return (
      <div className={classes}>
        {mobileSortPopover}
      </div>
    );
  }
}
