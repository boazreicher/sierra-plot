import React from 'react';
import { PanelProps } from '@grafana/data';
import { SierraPlotOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { SierraPlot } from './presentationElements/components/SierraPlot';
import { getTimeRange } from 'data/DataSeriesUtils';
import { X_AXIS_HEIGHT } from 'Constants';

var groupField: string | undefined;
export { groupField };

var seriesField: string | undefined;
export { seriesField };

interface Props extends PanelProps<SierraPlotOptions> {}

export const SierraPlotPanel: React.FC<Props> = ({
  options,
  data,
  width,
  height,
  onOptionsChange
}) => {
  const xAxisHeight = X_AXIS_HEIGHT;
  const styles = getStyles();

  groupField = options.chartsGroupField;
  seriesField = options.seriesFieldBreakdown;

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <SierraPlot
        width={width}
        height={height - xAxisHeight}
        dataFrames={data.series}
        panelOptions={options}
        timeRange={getTimeRange(data.series)}
        onOptionsChange={onOptionsChange}
      />
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `
  };
});
