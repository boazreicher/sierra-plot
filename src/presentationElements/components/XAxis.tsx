import { SierraPlotProperties } from 'data/SierraPlotProperties';
import * as React from 'react';
import { TimeRange } from 'types';
import { Selection, SelectionType } from 'data/Selection';

var d3 = require('d3');

export const XAxis = ({
  ...props
}: React.SVGProps<SVGElement> & {
  sierraPlotProperties: SierraPlotProperties;
} & { selection: Selection }) => createXAxis(props.sierraPlotProperties, props.selection);

function buildXAxisProperties(sierraPlotProperties: SierraPlotProperties, selection: Selection): XAxisProperties {
  return new XAxisProperties(
    sierraPlotProperties.timeRange,
    sierraPlotProperties.minX,
    getXAxisStartX(selection, sierraPlotProperties.dimensions.startX),
    getXAxisYPos(selection, sierraPlotProperties.dimensions.height, sierraPlotProperties.dimensions.startY),
    sierraPlotProperties.chartDimensions.width
  );
}

function getXAxisStartX(selection: Selection, startX: number) {
  if (selection !== undefined && selection.active) {
    if (selection.type == SelectionType.Group && selection.hightlightMode == 'exclusive') {
      return startX;
    }
    return selection.x;
  }
  return startX;
}

function getXAxisYPos(selection: Selection, yPos: number, topMargin: number) {
  if (selection !== undefined && selection.active) {
    if (selection.type == SelectionType.Group && selection.hightlightMode == 'exclusive') {
      return yPos + topMargin;
    }
    return selection.y;
  }
  return yPos + topMargin;
}

function getXAxisElementWidth(startX: number, width: number): string | number | undefined {
  return startX + width;
}

function createXAxis(sierraPlotProperties: SierraPlotProperties, selection: Selection) {
  let properties: XAxisProperties = buildXAxisProperties(sierraPlotProperties, selection);

  var timeShiftRatio = 0;
  if (properties.minX > 0) {
    timeShiftRatio = properties.minX / properties.width;
  }
  var timeShift = (properties.timeRange.end - properties.timeRange.start) * timeShiftRatio;

  const xScale = d3
    .scaleTime()
    .domain([properties.timeRange.start + timeShift, properties.timeRange.end])
    .range([properties.startX + properties.minX, properties.startX + properties.width]);
  const xAxis = d3.axisBottom(xScale).ticks(30);
  return (
    <svg y={properties.yPos} height="100%" width={getXAxisElementWidth(properties.startX, properties.width)}>
      <g
        ref={(node) => {
          d3.select(node)
            .style('font-size', '35')
            .call(xAxis as any)
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-45)');
        }}
      />
    </svg>
  );
}

export class XAxisProperties {
  timeRange: TimeRange;
  minX: number;
  startX: number;
  yPos: number;
  width: number;

  constructor(timeRange: TimeRange, minX: number, startX: number, yPos: number, width: number) {
    this.timeRange = timeRange;
    this.minX = minX;
    this.startX = startX;
    this.yPos = yPos;
    this.width = width;
  }
}
