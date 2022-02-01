import * as React from 'react';
import { Dimensions, StackMode, ValueRange } from 'types';

var d3 = require('d3');

export const YAxis = ({
  ...props
}: React.SVGProps<SVGElement> & { effectiveMaxY: number } & {
  totalStackMode: StackMode;
} & { enabled: boolean } & { totalsDimensions?: Dimensions }) =>
  createYAxis(props.effectiveMaxY, props.totalStackMode, props.enabled, props.totalsDimensions);

function buildYAxisProperties(range: ValueRange, totalsDimensions: Dimensions): YAxisProperties {
  return new YAxisProperties(range, totalsDimensions.startX, 0, totalsDimensions.height, '~s');
}

function getTransform(properties: YAxisProperties) {
  return 'translate(' + properties.startX + ',0)';
}

function createYAxis(
  effectiveMaxY: number,
  totalStackMode: StackMode,
  enabled: boolean,
  totalsDimensions?: Dimensions
) {
  if (!enabled || totalsDimensions === undefined) {
    return <></>;
  }
  let range = new ValueRange(0, totalStackMode === 'stacked' ? effectiveMaxY : 100);
  let properties = buildYAxisProperties(range, totalsDimensions);

  const yScale = d3
    .scaleLinear()
    .domain([properties.range.start, properties.range.end])
    .range([properties.height, properties.yPos]);
  const yAxis = d3.axisLeft(yScale).ticks(4).tickFormat(d3.format(properties.format));

  return (
    <g
      transform={getTransform(properties)}
      ref={(node) => {
        d3.select(node)
          .style('font-size', '35')
          .call(yAxis as any)
          .selectAll('text')
          .style('text-anchor', 'end');
      }}
    />
  );
}

export class YAxisProperties {
  range: ValueRange;
  startX: number;
  yPos: number;
  height: number;
  format: string;

  constructor(range: ValueRange, startX: number, yPos: number, height: number, format: string) {
    this.range = range;
    this.startX = startX;
    this.yPos = yPos;
    this.height = height;
    this.format = format;
  }
}
