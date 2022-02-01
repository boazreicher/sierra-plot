import { CLICKABLE_CLASS } from 'Constants';
import React from 'react';
import { SvgElement } from 'svg/SvgElement';
import { ChartType } from 'types';

export class SvgPolygon extends SvgElement {
  buildElement(height?: number): JSX.Element {
    return (
      <polygon
        className={CLICKABLE_CLASS}
        id={this.id}
        onClick={this.onClick}
        onDoubleClick={this.onDoubleClick}
        onWheel={this.onWheel}
        onDrag={this.onDrag}
        fill={this.fill}
        fillOpacity={this.fillOpacity}
        stroke={this.stroke}
        strokeWidth={this.strokeWidth}
        filter={this.filter}
        points={this.getPointsAsString(height)}
      ></polygon>
    );
  }

  hasDataPoints(): boolean {
    return true;
  }

  isGroup(): boolean {
    return false;
  }

  includedInParentBoundingBox(chartType: ChartType): boolean {
    return true;
  }

  calculateBoundingBox(chartType: ChartType): void {
    // No need to calculate bbox for polygon
  }

  getPointsAsString(height: number | undefined = undefined): string {
    let points = '';

    var lastX = 0;
    var maxY = 0;
    for (let index = 0; index < this.dataPoints.length; index++) {
      points += this.dataPoints[index].asString();
      if (maxY < this.dataPoints[index].y) {
        maxY = this.dataPoints[index].roundedY();
      }
      lastX = this.dataPoints[index].roundedX();
    }
    if (height !== undefined) {
      var newY = maxY - height;
      var point = lastX + ',' + newY;
      points += point;
    }

    return points;
  }
}
