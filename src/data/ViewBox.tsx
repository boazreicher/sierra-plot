export class ViewBox {
  minX: number;
  minY: number;
  width: number;
  height: number;

  constructor(minX: number, minY: number, width: number, height: number) {
    this.minX = minX;
    this.minY = minY;
    this.width = width;
    this.height = height;
  }

  toString(): string {
    return this.minX + ' ' + this.minY + ' ' + this.width + ' ' + this.height;
  }
}
