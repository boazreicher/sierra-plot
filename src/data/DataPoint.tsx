import { Coordinates } from 'types';

export class DataPoint {
  coordinates!: Coordinates;
  weight!: number;

  constructor(coordinates: Coordinates, weight = 0) {
    this.coordinates = coordinates.clone();
    this.weight = weight;
  }

  x(): number {
    return this.coordinates.x;
  }

  unformattedX(): number {
    if (this.coordinates.unformattedX === undefined) {
      throw new Error('No unformatted X value');
    }
    return this.coordinates.unformattedX;
  }

  unformattedY(): number {
    if (this.coordinates.unformattedY === undefined) {
      throw new Error('No unformatted X value');
    }
    return this.coordinates.unformattedY;
  }

  y(): number {
    return this.coordinates.y;
  }

  setX(x: number) {
    this.coordinates.x = x;
  }

  setUnformattedX(x: number) {
    this.coordinates.unformattedX = x;
  }

  setY(y: number) {
    this.coordinates.y = y;
  }

  setUnformattedY(y: number) {
    this.coordinates.unformattedY = y;
  }

  shiftX(shift: number) {
    this.coordinates.x += shift;
  }

  shiftY(shift: number) {
    this.coordinates.y += shift;
  }

  clone(): DataPoint {
    return new DataPoint(this.coordinates, this.weight);
  }
}
