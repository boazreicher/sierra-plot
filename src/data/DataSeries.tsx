import { Coordinates } from 'types';
import { DataPoint } from './DataPoint';

export class DataSeries {
  name: string | undefined;
  dataPoints: DataPoint[] = [];
  dimensions: Record<string, string> = {};
  sortKey: string | undefined;

  clone() {
    var result: DataSeries = new DataSeries();
    result.name = this.name;
    result.sortKey = this.sortKey;

    for (let dimension in this.dimensions) {
      result.dimensions[dimension] = this.dimensions[dimension];
    }

    this.dataPoints.forEach((dataPoint) => {
      result.dataPoints.push(dataPoint.clone());
    });

    return result;
  }

  sum(other: DataSeries) {
    if (other.dataPoints.length != this.dataPoints.length) {
      throw new Error(
        "Dataseries lengths don't match [" +
          other.name +
          ',' +
          this.name +
          '][' +
          other.dataPoints.length +
          ',' +
          this.dataPoints.length +
          ']'
      );
    }
    for (var index = 0; index < other.dataPoints.length; index++) {
      if (this.dataPoints[index].x != other.dataPoints[index].x) {
        throw new Error('Mismatch on x value for index ' + index);
      }

      this.dataPoints[index].shiftY(other.dataPoints[index].y());
      this.dataPoints[index].weight += other.dataPoints[index].weight;
    }
  }

  calculateAverage() {
    for (var index = 0; index < this.dataPoints.length; index++) {
      if (this.dataPoints[index].weight == 0) {
        this.dataPoints[index].setY(0);
      } else {
        this.dataPoints[index].setY(
          this.dataPoints[index].y() / this.dataPoints[index].weight
        );
      }
    }
  }

  average(other: DataSeries, totals: DataSeries) {
    if (other.dataPoints.length != this.dataPoints.length) {
      throw new Error(
        "Dataseries lengths don't match [" +
          other.name +
          ',' +
          this.name +
          '][' +
          other.dataPoints.length +
          ',' +
          this.dataPoints.length +
          ']'
      );
    }
    for (var index = 0; index < other.dataPoints.length; index++) {
      if (this.dataPoints[index].x != other.dataPoints[index].x) {
        throw new Error('Mismatch on x value for index ' + index);
      }
      if (totals.dataPoints[index].y() == 0) {
        // Totals aren't initialized
        // Initialize empty dataseries with other
        this.dataPoints[index].setY(other.dataPoints[index].y());
        this.dataPoints[index].weight = other.dataPoints[index].weight;
        // Update total for datapoint
        totals.dataPoints[index].shiftY(other.dataPoints[index].weight);
      } else {
        // Get sum (de-normalize)
        this.dataPoints[index].setY(
          this.dataPoints[index].y() / totals.dataPoints[index].y()
        );
        // Add weighted value
        this.dataPoints[index].shiftY(
          other.dataPoints[index].y() * other.dataPoints[index].weight
        );
        // Update total for datapoint
        totals.dataPoints[index].shiftY(other.dataPoints[index].weight);
        // Normalize
        this.dataPoints[index].setY(
          this.dataPoints[index].y() /
            (totals.dataPoints[index].y() + other.dataPoints[index].weight)
        );
        // Not sure about this
        this.dataPoints[index].weight = totals.dataPoints[index].y();
      }
    }
  }

  getEmptySeries(): DataSeries {
    var result = new DataSeries();

    this.dataPoints.forEach((dataPoint) => {
      let newCoordinates = new Coordinates(dataPoint.x(), 0);
      if (dataPoint.coordinates.unformattedX !== undefined) {
        newCoordinates.unformattedX = dataPoint.unformattedX();
      }
      result.dataPoints.push(new DataPoint(newCoordinates, 0));
    });

    return result;
  }

  getEmptySeriesWithWeights(): DataSeries {
    var result = new DataSeries();

    this.dataPoints.forEach((dataPoint) => {
      let newCoordinates = new Coordinates(dataPoint.x(), 0);
      if (dataPoint.coordinates.unformattedX !== undefined) {
        newCoordinates.unformattedX = dataPoint.unformattedX();
      }
      result.dataPoints.push(new DataPoint(newCoordinates, 1));
    });

    return result;
  }
}
