/* eslint-disable no-nested-ternary */
import React, { Component, Fragment } from 'react';
import { find } from 'lodash';
import { withTheme } from '../../components';
import {
  Chart,
  Settings,
  Axis,
  mergeWithDefaultTheme,
  DataGenerator,
} from '@elastic/charts';

import {
  EUI_DARK_THEME,
  EUI_LIGHT_THEME,
} from '../../../../src/themes/charts/themes';

import {
  EuiSpacer,
  EuiFlexGrid,
  EuiFlexItem,
  EuiFormRow,
  EuiRange,
  EuiCopy,
  EuiSwitch,
  EuiButton,
  EuiRadioGroup,
  EuiIcon,
  EuiTitle,
} from '../../../../src/components';

import { CHART_COMPONENTS, createSpectrum, ChartCard } from './shared';
import { palettes } from '../../../../src/services';

const getColorsMap = (color, specId) => {
  const map = new Map();
  map.set({ colorValues: [], specId }, color);
  return map;
};

class _Categorical extends Component {
  constructor(props) {
    super(props);

    this.highlightColor = palettes.euiPaletteColorBlind.colors[2];

    this.colorTypeRadios = [
      {
        id: `${this.idPrefix}3`,
        label: 'Category',
      },
      {
        id: `${this.idPrefix}0`,
        label: 'Quantity',
      },
      {
        id: `${this.idPrefix}1`,
        label: 'Trend',
      },
      {
        id: `${this.idPrefix}2`,
        label: 'Highlight',
      },
    ];

    this.state = {
      grouped: false,
      colorTypeIdSelected: this.colorTypeRadios[0].id,
      colorType: this.colorTypeRadios[0].label,
      numCharts: '3',
      data: null,
      dataString: '[{x: 1, y: 5.5, g: 0}]',
      vizColors: palettes.euiPaletteColorBlind.colors,
      chartType: 'LineSeries',
    };
  }

  componentDidMount = () => {
    this.createCategoryChart(3);
  };

  onNumChartsChange = e => {
    this.updateCorrectChart(Number(e.target.value), this.state.colorType);
    this.setState({
      numCharts: e.target.value,
    });
  };

  onColorTypeChange = optionId => {
    const colorType = find(this.colorTypeRadios, { id: optionId }).label;
    this.updateCorrectChart(Number(this.state.numCharts), colorType);
    this.setState({
      colorTypeIdSelected: optionId,
      colorType,
    });
  };

  onGroupChange = e => {
    this.updateCorrectChart(Number(this.state.numCharts), 'Grouped');
    this.setState({
      grouped: e.target.checked,
      colorType: 'Grouped',
    });
  };

  updateCorrectChart = (numCharts, chartType) => {
    switch (chartType) {
      case 'Category':
        this.createCategoryChart(numCharts);
        break;
      case 'Quantity':
        this.createQuantityChart(numCharts);
        break;
      case 'Trend':
        this.createTrendChart(numCharts);
        break;
      case 'Highlight':
        this.createHighlightChart(numCharts);
        break;
      case 'Grouped':
        this.setState({
          dataString: "[{x: 1, y: 5.5, g: 'Series 1'}]",
          chartType: 'LineSeries',
        });
        break;
      default:
        console.warn("Couldn't find the right chart type");
        break;
    }
  };

  createCategoryChart = numCharts => {
    const dg = new DataGenerator();
    const data = dg.generateGroupedSeries(20, numCharts).map(item => {
      const index = Number(item.g);
      item.g = `Category ${index + 1}`;
      return item;
    });

    this.setState({
      data,
      dataString: "[{x: 1, y: 5.5, g: 'Category 1'}]",
      vizColors: palettes.euiPaletteColorBlind.colors,
      chartType: 'LineSeries',
    });
  };

  createQuantityChart = numCharts => {
    const vizColors = createSpectrum(
      ['#FFFFFF', palettes.euiPaletteColorBlind.colors[0]],
      numCharts + 1
    );
    vizColors.shift();

    // convert series labels to percentages
    const dg = new DataGenerator();
    const data = dg.generateGroupedSeries(20, numCharts).map(item => {
      const increment = 100 / numCharts;
      const index = Number(item.g);
      const lower = Math.floor(increment * index);
      const higher =
        index + 1 === numCharts
          ? Math.ceil(increment * (index + 1))
          : Math.floor(increment * (index + 1));
      item.g = `${lower} - ${higher}%`;
      return item;
    });

    this.setState({
      data,
      dataString: "[{x: 1, y: 5.5, g: '0 - 100%'}]",
      vizColors,
      chartType: 'BarSeries',
    });
  };

  createTrendChart = numCharts => {
    const vizColors = createSpectrum(
      ['#58ba6d', '#ebdf62', '#d75949'],
      numCharts
    );

    // convert series labels to better/worse
    const oddSeries = numCharts % 2;
    const numOfHalf = Math.floor(numCharts / 2);

    const dg = new DataGenerator();
    const data = dg.generateGroupedSeries(20, numCharts).map(item => {
      const index = Number(item.g);
      let howManyErs;
      if (oddSeries && index === numOfHalf) {
        item.g = 'Meh';
      } else if (index < numOfHalf) {
        howManyErs = numOfHalf - (index + 1);
        item.g = `Better${'er'.repeat(howManyErs)}`;
      } else if (index >= numOfHalf) {
        howManyErs = index - numOfHalf;
        if (oddSeries) {
          howManyErs -= 1;
        }
        item.g = `Wors${!howManyErs ? 'e' : ''}${'er'.repeat(
          howManyErs > 0 ? howManyErs : 0
        )}`;
      }
      return item;
    });

    this.setState({
      data,
      dataString: "[{x: 1, y: 5.5, g: 'Better'}]",
      vizColors,
      chartType: 'BarSeries',
    });
  };

  createHighlightChart = numCharts => {
    const vizColors = createSpectrum(['#D3DAE6', '#98A2B3'], numCharts);
    vizColors[vizColors.length - 1] = this.highlightColor;

    const dg = new DataGenerator();
    const data = dg.generateGroupedSeries(20, numCharts);

    this.setState({
      data,
      dataString: "[{x: 1, y: 5.5, g: '0'}]",
      vizColors: numCharts < 2 ? [this.highlightColor] : vizColors,
      chartType: 'LineSeries',
    });
  };

  // createGroupedChart

  render() {
    const {
      data,
      dataString,
      vizColors,
      chartType,
      numCharts,
      colorType,
      colorTypeIdSelected,
    } = this.state;

    const dg = new DataGenerator();
    const isDarkTheme = this.props.theme.includes('dark');
    const theme = isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme;
    const gridHorizontalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridHorizontalSettings
      : EUI_LIGHT_THEME.gridHorizontalSettings;
    const gridVerticalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridVerticalSettings
      : EUI_LIGHT_THEME.gridVerticalSettings;

    let ChartType = CHART_COMPONENTS[chartType];

    const isBadChart = !this.state.grouped && numCharts > 5;
    const isComplicatedChart = this.state.grouped;

    const customTitle =
      colorType === 'Highlight' ? (
        <EuiTitle size="xxs">
          <h4>
            <EuiIcon type="dot" color={this.highlightColor} /> My number of
            issues compared to others
          </h4>
        </EuiTitle>
      ) : (
        undefined
      );

    const customColors = mergeWithDefaultTheme(
      {
        colors: { vizColors },
      },
      theme
    );
    const customColorsString =
      vizColors !== palettes.euiPaletteColorBlind.colors
        ? `mergeWithDefaultTheme(
  { colors: { vizColors: [${JSON.stringify(vizColors)}] }},
  isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme
)`
        : null;

    const charts = [];
    let customLegend;

    if (!this.state.grouped) {
      charts.push(
        <ChartType
          key="data1"
          id="data1"
          name="0"
          data={data}
          xAccessor={'x'}
          yAccessors={['y']}
          splitSeriesAccessors={['g']}
          stackAccessors={chartType === 'BarSeries' ? ['g'] : undefined}
        />
      );
    } else {
      ChartType = CHART_COMPONENTS.LineSeries;

      for (let index = 0; index < 4; index++) {
        const data = dg.generateGroupedSeries(20, 1).map(item => {
          item.y += index * 5;
          return item;
        });

        const chart = (
          <ChartType
            key={`data${index}`}
            id={`data${index}`}
            name={`Series ${index < 2 ? 1 : 2}`}
            data={data}
            xAccessor={'x'}
            yAccessors={['y']}
            customSeriesColors={getColorsMap(
              palettes.euiPaletteColorBlind.colors[index < 2 ? 0 : 1],
              `data${index}`
            )}
            lineSeriesStyle={{
              line: {
                strokeWidth: index % 2 ? 1 : 6,
              },
              point: {
                visible: index % 2 ? false : true,
              },
            }}
          />
        );

        charts.push(chart);
      }

      customLegend = (
        <dl
          style={{
            fontSize: 12,
            position: 'absolute',
            width: 200,
            right: 0,
            bottom: 0,
            padding: 4,
          }}>
          <span
            style={{
              display: 'inline-block',
              width: 16,
              height: 6,
              backgroundColor: 'currentColor',
              verticalAlign: 'middle',
            }}
          />
          &emsp;
          <span>Actual</span>
          <br />
          <br />
          <span
            style={{
              display: 'inline-block',
              width: 16,
              height: 1,
              backgroundColor: 'currentColor',
              verticalAlign: 'middle',
            }}
          />
          &emsp;
          <span>Projected</span>
        </dl>
      );
    }

    let showLegend = numCharts > 1 || colorType === 'Grouped';
    if (colorType === 'Highlight') showLegend = false;

    return (
      <Fragment>
        {customTitle}
        <div style={{ position: 'relative' }}>
          <Chart size={[undefined, 200]}>
            <Settings
              theme={customColors}
              showLegend={showLegend}
              legendPosition="right"
              showLegendDisplayValue={false}
            />
            {charts}
            <Axis
              id="bottom-axis"
              position="bottom"
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
          {customLegend}
        </div>

        <EuiSpacer />

        <EuiFlexGrid columns={3}>
          <EuiFlexItem>
            <ChartCard
              title="Color types"
              description="Coloring multi-series non-categorical charts can have different connotations.">
              <EuiRadioGroup
                compressed
                options={this.colorTypeRadios}
                idSelected={
                  this.state.grouped
                    ? this.colorTypeRadios[0].id
                    : colorTypeIdSelected
                }
                onChange={this.onColorTypeChange}
                disabled={this.state.grouped}
              />
            </ChartCard>
          </EuiFlexItem>
          <EuiFlexItem>
            <ChartCard
              title="Number of series"
              description="Do not use too many colors in a single chart as this will hinder understanding.">
              <EuiSpacer />
              <EuiFormRow
                helpText={
                  <span id="levelsHelp3">
                    Recommended number of series is 5 or less.
                  </span>
                }>
                <EuiRange
                  min={1}
                  max={10}
                  showTicks
                  value={this.state.grouped ? '2' : numCharts}
                  disabled={this.state.grouped}
                  onChange={this.onNumChartsChange}
                  levels={[
                    { min: 1, max: 5.5, color: 'success' },
                    { min: 5.5, max: 10, color: 'danger' },
                  ]}
                  aria-describedby="levelsHelp3"
                  aria-label="Number of series"
                />
              </EuiFormRow>
            </ChartCard>
          </EuiFlexItem>
          <EuiFlexItem>
            <ChartCard
              title="Grouping data"
              description="If the series' are or can be combined into logical groups, use contrasting shapes/styles but keep the same color for within groups.">
              <EuiSpacer />
              <EuiSwitch
                label="Show grouped"
                checked={this.state.grouped}
                onChange={this.onGroupChange}
              />
            </ChartCard>
          </EuiFlexItem>
        </EuiFlexGrid>
        <EuiSpacer />

        <div className="eui-textCenter">
          <EuiCopy
            textToCopy={`${
              customTitle
                ? `<EuiTitle size="xxs">
  <h4>
    <EuiIcon type="dot" color={highlightColor} /> My number of issues
    compared to others
  </h4>
</EuiTitle>`
                : ''
            }
<Chart size={[undefined, 200]}>
  <Settings
    ${
      customColorsString
        ? `theme={${customColorsString}}`
        : 'theme={isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme}'
    }
    showLegend={${showLegend}}
    legendPosition="right"
    showLegendDisplayValue={false}
  />
  <${chartType}
    id="bars"
    name="0"
    data={${dataString}}
    xAccessor={'x'}
    yAccessors={['y']}
    splitSeriesAccessors={['g']}
    ${chartType === 'BarSeries' ? "stackAccessors={['g']}" : ''}
  />
  <Axis
    id="bottom-axis"
    position="bottom"
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
                disabled={isBadChart || isComplicatedChart}>
                {isBadChart || isComplicatedChart
                  ? isComplicatedChart
                    ? "It's complicated"
                    : "Bad chart, don't copy"
                  : 'Copy code of current configuration'}
              </EuiButton>
            )}
          </EuiCopy>
        </div>
      </Fragment>
    );
  }
}

export const Categorical = withTheme(_Categorical);
