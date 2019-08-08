import React, { Component, Fragment } from 'react';
import { withTheme } from '../../components';
import {
  Chart,
  BarSeries,
  Settings,
  Axis,
  timeFormatter,
  niceTimeFormatByDay,
  LineSeries,
} from '@elastic/charts';

import {
  EUI_DARK_THEME,
  EUI_LIGHT_THEME,
} from '../../../../src/themes/charts/themes';

import {
  EuiSpacer,
  EuiTitle,
  EuiFlexGrid,
  EuiFlexItem,
  EuiCopy,
  EuiButton,
} from '../../../../src/components';

import {
  formatDate,
  dateFormatAliases,
} from '../../../../src/services/format/format_date';

import { TIME_DATA, TIME_DATA_2 } from './data';
import {
  ChartTypeCard,
  CHART_COMPONENTS,
  MultiChartCard,
  ChartCard,
} from './shared';

class _TimeChart extends Component {
  constructor(props) {
    super(props);

    this.idPrefix = 'chartType';

    this.state = {
      multi: false,
      stacked: false,
      chartType: 'BarSeries',
    };
  }

  onMultiChange = multiObject => {
    this.setState({
      ...multiObject,
    });
  };

  onChartTypeChange = chartType => {
    this.setState({
      chartType: chartType,
    });
  };

  render() {
    const isDarkTheme = this.props.theme.includes('dark');
    const theme = isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme;
    const gridHorizontalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridHorizontalSettings
      : EUI_LIGHT_THEME.gridHorizontalSettings;
    const gridVerticalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridVerticalSettings
      : EUI_LIGHT_THEME.gridVerticalSettings;

    let ChartType = CHART_COMPONENTS[this.state.chartType];
    let ChartType2 = CHART_COMPONENTS[this.state.chartType];
    if (this.state.chartType === 'Mixed') {
      ChartType = BarSeries;
      ChartType2 = LineSeries;
    }

    const isBadChart =
      this.state.chartType === 'LineSeries' && this.state.stacked;

    return (
      <Fragment>
        <EuiTitle size="xxs">
          <h3>
            Number of {!this.state.multi && 'financial '}robo-calls
            {this.state.multi && ' by type'}
          </h3>
        </EuiTitle>

        <EuiSpacer size="s" />

        <Chart size={[undefined, 200]}>
          <Settings
            theme={theme}
            showLegend={this.state.multi}
            legendPosition="right"
          />
          {this.state.multi && (
            <ChartType2
              id="tech"
              name="Tech support"
              data={TIME_DATA_2}
              xScaleType="time"
              xAccessor={0}
              yAccessors={[1]}
              stackAccessors={this.state.stacked ? [0] : undefined}
            />
          )}
          <ChartType
            id="financial"
            name="Financial"
            data={TIME_DATA}
            xScaleType="time"
            xAccessor={0}
            yAccessors={[1]}
            stackAccessors={this.state.stacked ? [0] : undefined}
          />
          <Axis
            title={formatDate(Date.now(), dateFormatAliases.date)}
            id="bottom-axis"
            position="bottom"
            tickFormat={timeFormatter(niceTimeFormatByDay(1))}
            showGridLines
            gridLineStyle={gridVerticalSettings}
          />
          <Axis
            id="left-axis"
            position="left"
            showGridLines
            gridLineStyle={gridHorizontalSettings}
          />
        </Chart>

        <EuiSpacer />

        <EuiFlexGrid columns={3}>
          <EuiFlexItem>
            <ChartTypeCard
              type="Time series"
              onChange={this.onChartTypeChange}
              mixed={this.state.multi ? 'enabled' : 'disabled'}
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <MultiChartCard onChange={this.onMultiChange} />
          </EuiFlexItem>

          <EuiFlexItem>
            <ChartCard
              title="Tick marks"
              description="If the tick marks all share a portion of their date, eg they're all on the same day, format the ticks to only display the disparate portions of the timestamp and show the common portion as the axis title."
            />
          </EuiFlexItem>
        </EuiFlexGrid>

        <EuiSpacer />

        <div className="eui-textCenter">
          <EuiCopy
            textToCopy={`<Chart size={[undefined, 200]}>
  <Settings
    theme={isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme}
    showLegend={${this.state.multi}}
    ${this.state.multi ? 'legendPosition="right"' : ''}
  />
  ${
    this.state.multi
      ? `<${
          this.state.chartType === 'Mixed' ? 'LineSeries' : this.state.chartType
        }
      id="tech"
      name="Tech support"
      data={TIME_DATA_2=[[0,1],[0,1]]}
      xScaleType="time"
      xAccessor={0}
      yAccessors={[1]}
      ${this.state.stacked ? 'stackAccessors={[0]}' : ''}
    />`
      : ''
  }
  <${this.state.chartType === 'Mixed' ? 'BarSeries' : this.state.chartType}
    id="financial"
    name="Financial"
    data={TIME_DATA=[[0,1],[0,1]]}
    xScaleType="time"
    xAccessor={0}
    yAccessors={[1]}
    ${this.state.stacked ? 'stackAccessors={[0]}' : ''}
  />
  <Axis
    title={formatDate(Date.now(), dateFormatAliases.date)}
    id="bottom-axis"
    position="bottom"
    tickFormat={timeFormatter(niceTimeFormatByDay(1))}
    showGridLines
  />
  <Axis
    id="left-axis"
    position="left"
    showGridLines
  />
</Chart>`}>
            {copy => (
              <EuiButton
                fill
                onClick={copy}
                iconType="copyClipboard"
                disabled={isBadChart}>
                {isBadChart
                  ? "Bad chart, don't copy"
                  : 'Copy code of current configuration'}
              </EuiButton>
            )}
          </EuiCopy>
        </div>
      </Fragment>
    );
  }
}

export const TimeChart = withTheme(_TimeChart);
