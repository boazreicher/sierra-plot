import { SierraPlotSvgElement } from 'presentationElements/components/SierraPlotSvgElement';
import React from 'react';
import { SvgElement } from 'svg/SvgElement';
import { ChartType } from 'types';
import { Selection } from 'data/Selection';
import { ChartData } from 'charts/ChartData';
import { Tooltip } from '@grafana/ui';
import { ToolTipData } from 'data/ToolTipData';
import { Color } from 'colors/Color';
import { White } from 'colors/ColorUtils';

export class SvgGroup extends SvgElement {
  children: SvgElement[] = [];

  buildElement(height?: number): JSX.Element {
    let maxHeight = this.colorMode === 'values' || this.colorMode === 'valuesInverted' ? this.maxHeight : undefined;

    return (
      <Tooltip content={getTooltip(this.tooltipData, this.id)}>
        <g
          id={this.id}
          onClick={this.onClick}
          opacity={this.opacity}
          onDoubleClick={this.onDoubleClick}
          onMouseOver={this.onMouseOver}
          filter={this.filter}
        >
          {this.children.map((child) => (
            <SierraPlotSvgElement key={child.id} element={child} height={maxHeight} />
          ))}
        </g>
      </Tooltip>
    );
  }

  hasDataPoints(): boolean {
    return false;
  }

  isGroup(): boolean {
    return true;
  }

  includedInParentBoundingBox(chartType: ChartType): boolean {
    return false;
  }

  getPointsAsString(height: number | undefined): string {
    throw new Error('Method not implemented.');
  }

  calculateBoundingBox(chartType: ChartType): void {
    let minX = -1;
    let maxX = -1;
    let minY = -1;
    let maxY = -1;

    this.children.forEach((element) => {
      // Only including polygons (or polylines for line charts) for bounding box
      if (!element.includedInParentBoundingBox(chartType)) {
        return;
      }
      element.calculateBoundingBox(chartType);

      if (minX === -1 || minX > element.boundingBox.minX) {
        minX = element.boundingBox.minX;
      }
      if (maxX < element.boundingBox.maxX) {
        maxX = element.boundingBox.maxX;
      }
      if (minY === -1 || minY > element.boundingBox.minY) {
        minY = element.boundingBox.minY;
      }
      if (maxY < element.boundingBox.maxY) {
        maxY = element.boundingBox.maxY;
      }
    });

    this.boundingBox.minX = minX;
    this.boundingBox.maxX = maxX;
    this.boundingBox.minY = minY;
    this.boundingBox.maxY = maxY;
  }

  calculateMaxHeightFromChildren() {
    let maxHeight: number | undefined;

    this.children.forEach((element) => {
      if (element.maxHeight !== undefined) {
        if (maxHeight === undefined || maxHeight < element.maxHeight) {
          maxHeight = element.maxHeight;
        }
      }
    });

    this.maxHeight = maxHeight;
  }

  setDisplayedCharts(selection: Selection, chart: ChartData, chartsFieldBreakdown: string) {
    if (selection !== undefined && selection.active) {
      if (selection.key === chartsFieldBreakdown && selection.value === chart.name) {
        this.opacity = 1;
      } else if (selection.key === 'group' && selection.value === chart.sortKey) {
        this.opacity = 1;
      } else {
        this.opacity = 0.1;
      }
    } else {
      this.opacity = 1;
    }
  }
}

const getTooltip = (data: ToolTipData, chartName: string | undefined) => (
  <>
    <h3 style={getStyleForGroup(data.color)}>{data.group}</h3>
    {Object.keys(data.charts)
      .reverse()
      .map((chart) => (
        <p key={chartName} style={getStyle(chart, data.charts[chart], chartName)}>{chart}</p>
      ))}
  </>
);

function getStyle(chart: string, color: Color, chartName: string | undefined): React.CSSProperties | undefined {
  if (chartName !== undefined && chartName.endsWith(chart)) {
    const style = {
      fontWeight: 'bold',
      color: color.toHsl().toString(),
      textDecoration: 'underline',
      margin: 0,
    } as const;

    return style;
  }

  const style = {
    margin: 0,
    color: color.toHsl().toString(),
  } as const;

  return style;
}

function getStyleForGroup(color: Color | undefined): React.CSSProperties | undefined {
  const style = {
    textDecoration: 'underline',
    color: color === undefined ? White().toString() : color.toHsl().toString(),
  };

  return style;
}
