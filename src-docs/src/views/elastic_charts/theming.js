import React, { Component, Fragment } from 'react';
import { withTheme } from '../../components';
import {
  Chart,
  getSpecId,
  Settings,
  Axis,
  getAxisId,
  Position,
  ScaleType,
  mergeWithDefaultTheme,
  DataGenerator,
  LineSeries,
  BarSeries,
} from '@elastic/charts';

import {
  EUI_DARK_THEME,
  EUI_LIGHT_THEME,
} from '../../../../src/themes/charts/themes';

import { palettes } from '../../../../src/services';

class _Theming extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartType: 'LineSeries',
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
    const dg = new DataGenerator();
    const data1 = dg.generateGroupedSeries(20, 3);
    const data2 = dg.generateGroupedSeries(20, 1);

    const isDarkTheme = this.props.theme.includes('dark');
    const theme = isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme;
    const gridHorizontalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridHorizontalSettings
      : EUI_LIGHT_THEME.gridHorizontalSettings;
    const gridVerticalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridVerticalSettings
      : EUI_LIGHT_THEME.gridVerticalSettings;

    const customColors = mergeWithDefaultTheme(
      {
        colors: {
          vizColors: palettes.euiPaletteColorBlind.colors,
        },
      },
      theme
    );

    return (
      <Fragment>
        <Chart size={[undefined, 200]}>
          <Settings
            theme={customColors}
            showLegend={true}
            legendPosition={Position.Right}
            showLegendDisplayValue={false}
          />
          <LineSeries
            id={getSpecId('status')}
            name="0"
            data={data1}
            xAccessor={'x'}
            yAccessors={['y']}
            splitSeriesAccessors={['g']}
          />
          <BarSeries
            id={getSpecId('control')}
            name="Control"
            data={data2}
            xAccessor={'x'}
            yAccessors={['y']}
          />
          <Axis
            id={getAxisId('bottom-axis')}
            position={Position.Bottom}
            xScaleType={ScaleType.Linear}
            showGridLines
            gridLineStyle={gridVerticalSettings}
          />
          <Axis
            id={getAxisId('left-axis')}
            position={Position.Left}
            showGridLines
            gridLineStyle={gridHorizontalSettings}
          />
        </Chart>
      </Fragment>
    );
  }
}

export const Theming = withTheme(_Theming);
