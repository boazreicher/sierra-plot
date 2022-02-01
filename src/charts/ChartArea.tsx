import { SvgElement } from 'svg/SvgElement';
import { Coordinates } from 'types';

export class ChartArea {
  topLeft: Coordinates = new Coordinates(-1, -1);
  topRight: Coordinates = new Coordinates(-1, -1);
  bottomRight: Coordinates = new Coordinates(-1, -1);
  bottomLeft: Coordinates = new Coordinates(-1, -1);

  constructor(elements: SvgElement[]) {
    var minX = 999999999;
    var maxX = -1;
    var minY = 999999999;
    var maxY = -1;
    elements.forEach((element) => {
      if (element.isChartGroup) {
        if (element.boundingBox.maxX < minX) {
          minX = element.boundingBox.maxX;
        }
        if (element.boundingBox.maxX > maxX) {
          maxX = element.boundingBox.maxX;
        }
        if (element.boundingBox.maxY < minY) {
          minY = element.boundingBox.maxY;
        }
        if (element.boundingBox.maxY > maxY) {
          maxY = element.boundingBox.maxY;
        }
      }
    });

    this.topRight = new Coordinates(maxX, minY);
    this.bottomLeft = new Coordinates(minX, maxY);
  }
}
