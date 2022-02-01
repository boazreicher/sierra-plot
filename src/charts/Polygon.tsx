import { DataPoint } from 'data/DataPoint';
import { SvgElement } from 'svg/SvgElement';
import { SvgPolygon } from 'svg/SvgPolygon';
import { SvgPolyline } from 'svg/SvgPolyline';
import { Coordinates } from 'types';
import { SeriesElement } from './SeriesElement';

export class Polygon extends SeriesElement {
  protected getNewWithType(): SeriesElement {
    return new Polygon();
  }
  protected getNewSvgElementWithType(): SvgElement {
    return new SvgPolygon();
  }

  protected addBottom(): void {
    for (let index = this.dataPoints.length - 1; index >= -0; index--) {
      let dataPoint = new DataPoint(new Coordinates(this.dataPoints[index].x(), 0));
      this.closingDataPoints.push(dataPoint);
    }
  }

  stackedOn(polygons: Polygon[]): void {
    for (let index = 0; index < this.dataPoints.length; index++) {
      let shift = 0;
      for (let polygonIndex = 0; polygonIndex < polygons.length; polygonIndex++) {
        shift +=
          polygons[polygonIndex].dataPoints[index].y() -
          polygons[polygonIndex].closingDataPoints[polygons[polygonIndex].closingDataPoints.length - index - 1].y();
      }

      this.dataPoints[index].shiftY(shift);

      let closingShift = 0;
      for (let polygonIndex = 0; polygonIndex < polygons.length; polygonIndex++) {
        closingShift +=
          polygons[polygonIndex].dataPoints[polygons[polygonIndex].dataPoints.length - index - 1].y() -
          polygons[polygonIndex].closingDataPoints[index].y();
      }

      this.closingDataPoints[index].shiftY(closingShift);
    }
  }

  toOutlineElement(): SvgPolyline {
    let svgPolyline = new SvgPolyline();

    svgPolyline.id = this.id + '-tl';

    this.dataPoints.forEach((dataPoint) => {
      svgPolyline.dataPoints.push(dataPoint.coordinates.clone());
    });

    return svgPolyline;
  }
}
