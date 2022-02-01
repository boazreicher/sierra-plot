import { TOTAL_ELEMENT_ID, ZORDER_BACKGROUND_ELEMENT } from 'Constants';
import { SvgElement } from 'svg/SvgElement';
import { SvgPolygon } from 'svg/SvgPolygon';
import { BoundingBox, Coordinates } from 'types';
import { PresentationElement } from './PresentationElement';

export class BackgroundElement implements PresentationElement {
  private minX: number;
  private color: string;
  private enabled: boolean;

  constructor(minX: number, color: string, enabled: boolean) {
    this.minX = minX;
    this.color = color;
    this.enabled = enabled;
  }

  toSvgElements(elements: SvgElement[]): SvgElement[] {
    if (!this.enabled) {
      return [];
    }

    let topBoundingBox = this.calculateTopBoundingBox(elements);
    if (topBoundingBox === undefined) {
      console.warn('Unable to create background element');
      return [];
    }

    let bottomBoundingBox = elements[0].children[0].boundingBox;
    bottomBoundingBox.minX += this.minX;
    topBoundingBox.minX += this.minX;

    let backgroundElementDatapoints: Coordinates[] = this.getBackgroundElementCoordinates(
      topBoundingBox,
      bottomBoundingBox
    );
    let backgroundElement = this.buildBackgroundElement(backgroundElementDatapoints, this.color);
    return [backgroundElement];
  }

  private calculateTopBoundingBox(chartsSvgElements: SvgElement[]): BoundingBox | undefined {
    // Iterating backwards to skip all the presentation elements
    // Using the first and second (non-Total) charts to extrapolate the top bounding box

    let first: BoundingBox | undefined;
    let second: BoundingBox | undefined;
    for (let index = chartsSvgElements.length - 1; index >= 0; index--) {
      if (
        first === undefined &&
        chartsSvgElements[index].isGroup() &&
        chartsSvgElements[index].id != TOTAL_ELEMENT_ID
      ) {
        first = chartsSvgElements[index].children[0].boundingBox;
      } else if (chartsSvgElements[index].isGroup() && chartsSvgElements[index].id != TOTAL_ELEMENT_ID) {
        second = chartsSvgElements[index].children[0].boundingBox;
        break;
      }
    }

    if (first !== undefined && second !== undefined) {
      let xDiff = first.maxX - second.maxX;
      let yDiff = first.maxY - second.maxY;
      let topBoundingBox = new BoundingBox();
      topBoundingBox.minX = first.minX + xDiff;
      topBoundingBox.maxX = first.maxX + xDiff;
      topBoundingBox.minY = first.minY + yDiff;
      topBoundingBox.maxY = first.maxY + yDiff;

      return topBoundingBox;
    }

    console.warn("Couldn't calculate top bounding box");

    return undefined;
  }

  private buildBackgroundElement(backgroundElementDatapoints: Coordinates[], color: string) {
    let backgroundElement = new SvgPolygon();
    backgroundElement.dataPoints = backgroundElementDatapoints;
    backgroundElement.id = 'bg';
    backgroundElement.fill = color;
    backgroundElement.fillOpacity = 1;
    backgroundElement.zOrder = ZORDER_BACKGROUND_ELEMENT;
    return backgroundElement;
  }

  private getBackgroundElementCoordinates(topBoundingBox: BoundingBox, bottomBoundingBox: BoundingBox): Coordinates[] {
    let coordinates: Coordinates[] = [];

    let topLeft = new Coordinates(topBoundingBox.minX, topBoundingBox.maxY);
    let topRight = new Coordinates(topBoundingBox.maxX, topBoundingBox.maxY);
    let bottomLeft = new Coordinates(bottomBoundingBox.minX, bottomBoundingBox.maxY);
    let bottomRight = new Coordinates(bottomBoundingBox.maxX, bottomBoundingBox.maxY);

    coordinates.push(topLeft);
    coordinates.push(topRight);
    coordinates.push(bottomRight);
    coordinates.push(bottomLeft);

    return coordinates;
  }
}
