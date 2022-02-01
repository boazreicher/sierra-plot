import { DataPoint } from 'data/DataPoint';
import { SvgElement } from 'svg/SvgElement';
import { SvgPolyline } from 'svg/SvgPolyline';
import { BoundingBox, Dimensions } from 'types';

export abstract class SeriesElement {
  id: string | undefined;
  dataPoints: DataPoint[] = [];
  closingDataPoints: DataPoint[] = [];
  dimensions: Dimensions = new Dimensions();
  stepped: boolean = false;
  sortKey: string | undefined;

  abstract toOutlineElement(): SvgPolyline;
  abstract stackedOn(elements: SeriesElement[]): void;
  protected abstract getNewWithType(): SeriesElement;
  protected abstract getNewSvgElementWithType(): SvgElement;
  protected abstract addBottom(): void;

  clone(): SeriesElement {
    var element = this.getNewWithType();
    element.id = this.id;
    element.dimensions = this.dimensions.clone();
    element.stepped = this.stepped;
    element.sortKey = this.sortKey;

    this.dataPoints.forEach((dataPoint) => {
      element.dataPoints.push(dataPoint.clone());
    });
    this.closingDataPoints.forEach((dataPoint) => {
      element.closingDataPoints.push(dataPoint.clone());
    });
    return element;
  }

  format(numDataPoints: number): void {
    this.shiftX(numDataPoints);
    var effectiveMaxY = this.getEffectiveMaxY();
    this.scaleY(effectiveMaxY);
    if (this.stepped) {
      this.makeStepped();
    }
    this.addBottom();
  }

  toSvgElement(): SvgElement {
    var element = this.getNewSvgElementWithType();

    element.id = this.id;
    element.maxHeight = this.dimensions.height;

    var minX = -1;
    var maxX = -1;
    var minY = -1;
    var maxY = -1;
    this.dataPoints.forEach((dataPoint) => {
      element.dataPoints.push(dataPoint.coordinates.clone());
      if (minX == -1 || minX > dataPoint.x()) {
        minX = dataPoint.x();
      }
      if (maxX == -1 || maxX < dataPoint.x()) {
        maxX = dataPoint.x();
      }
      if (minY == -1 || minY > dataPoint.y()) {
        minY = dataPoint.y();
      }
      if (maxY == -1 || maxY < dataPoint.y()) {
        maxY = dataPoint.y();
      }
    });
    this.closingDataPoints.forEach((dataPoint) => {
      element.dataPoints.push(dataPoint.coordinates.clone());
      if (minX == -1 || minX > dataPoint.x()) {
        minX = dataPoint.x();
      }
      if (maxX == -1 || maxX < dataPoint.x()) {
        maxX = dataPoint.x();
      }
      if (minY == -1 || minY > dataPoint.y()) {
        minY = dataPoint.y();
      }
      if (maxY == -1 || maxY < dataPoint.y()) {
        maxY = dataPoint.y();
      }
    });
    var boundingBox: BoundingBox = new BoundingBox();
    boundingBox.minX = minX;
    boundingBox.maxX = maxX;
    boundingBox.minY = minY;
    boundingBox.maxY = maxY;
    element.boundingBox = boundingBox;

    return element;
  }

  protected makeStepped() {
    let newDataPoints: DataPoint[] = [];
    newDataPoints.push(this.dataPoints[0]);
    let previousY = this.dataPoints[0].y();

    for (let index = 1; index < this.dataPoints.length; index++) {
      let newDataPoint = this.dataPoints[index].clone();
      newDataPoint.setY(previousY);
      newDataPoints.push(newDataPoint);
      newDataPoints.push(this.dataPoints[index].clone());
      previousY = this.dataPoints[index].y();
    }

    this.dataPoints = newDataPoints;
  }

  protected shiftX(numDataPoints: number): void {
    let factor = this.dimensions.width / numDataPoints;
    for (let index = 0; index < this.dataPoints.length; index++) {
      this.dataPoints[index].setX(
        this.dimensions.startX + this.dataPoints[index].x() * factor
      );
    }
  }

  protected scaleY(effectiveMaxY: number): void {
    let factorY = this.dimensions.height / effectiveMaxY;
    for (let index = 0; index < this.dataPoints.length; index++) {
      let newY = this.dataPoints[index].y() * factorY;
      // Capping maximum value at element height
      newY = newY > this.dimensions.height ? this.dimensions.height : newY;
      this.dataPoints[index].setUnformattedY(
        this.dataPoints[index].coordinates.roundedY()
      );
      this.dataPoints[index].setY(newY);
    }
  }

  protected getEffectiveMaxY(): number {
    let effectiveMaxY =
      this.dimensions.maxY === undefined ? 0 : this.dimensions.maxY;
    for (let index = 0; index < this.dataPoints.length; index++) {
      if (
        this.dimensions.maxY === undefined &&
        this.dataPoints[index].y() > effectiveMaxY
      ) {
        effectiveMaxY = this.dataPoints[index].y();
      }
    }
    return effectiveMaxY;
  }

  invertY(): void {
    for (let index = 0; index < this.dataPoints.length; index++) {
      this.dataPoints[index].setY(
        this.dimensions.startY - this.dataPoints[index].y()
      );
    }
    for (let index = 0; index < this.closingDataPoints.length; index++) {
      this.closingDataPoints[index].setY(
        this.dimensions.startY - this.closingDataPoints[index].y()
      );
    }
  }
}
