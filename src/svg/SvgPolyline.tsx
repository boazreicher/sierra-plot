import React from 'react';
import { SvgElement } from 'svg/SvgElement';
import { ChartType } from 'types';

export class SvgPolyline extends SvgElement {
  buildElement(height?: number): JSX.Element {
    return (
      <polyline
        id={this.id}
        fill={this.fill}
        fillOpacity={this.fillOpacity}
        stroke={this.stroke}
        strokeOpacity={this.strokeOpacity}
        strokeWidth={this.strokeWidth}
        filter={this.filter}
        points={this.getPointsAsString(height)}
      />
    );
  }

  hasDataPoints(): boolean {
    return true;
  }

  isGroup(): boolean {
    return false;
  }

  calculateBoundingBox(chartType: ChartType): void {
    // No need to calculate bbox for polygon
  }

  includedInParentBoundingBox(chartType: ChartType): boolean {
    return chartType == 'line';
  }

  getPointsAsString(height: number | undefined = undefined): string {
    let points = '';

    var firstX = -1;
    var maxY = 0;
    for (let index = 0; index < this.dataPoints.length; index++) {
      if (firstX == -1) {
        firstX = this.dataPoints[index].roundedX();
      }
      if (maxY < this.dataPoints[index].y) {
        maxY = this.dataPoints[index].roundedY();
      }

      points += this.dataPoints[index].asString();
    }
    if (height !== undefined) {
      var newY = maxY - height;
      var point = firstX + ',' + newY + ' ';
      points = point + points;
    }

    return points;
  }
}
