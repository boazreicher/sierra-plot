import { Color } from 'colors/Color';
import {
  ID_PREFIX_GRIDLINE_ELEMENT,
  TOTAL_ELEMENT_ID,
  ZORDER_BACKGROUND_ELEMENT,
  ZORDER_CHART_LABEL
} from 'Constants';
import { SvgElement } from 'svg/SvgElement';
import { SvgPolyline } from 'svg/SvgPolyline';
import { Coordinates, GridLinePosition } from 'types';
import { PresentationElement } from './PresentationElement';

export class VerticalGridLines implements PresentationElement {
  enabled: boolean;
  width: number;
  color: Color;
  position: GridLinePosition;
  ticks: number;

  constructor(
    enabled: boolean,
    width: number,
    color: Color,
    position: GridLinePosition,
    ticks: number
  ) {
    this.enabled = enabled;
    this.width = width;
    this.color = color;
    this.position = position;
    this.ticks = ticks;
  }

  toSvgElements(elements: SvgElement[]): SvgElement[] {
    if (!this.enabled) {
      return [];
    }
    let bottomIndex = -1;
    let topIndex = -1;

    for (let index = 0; index < elements.length; index++) {
      if (
        elements[index].isChartGroup &&
        elements[index].id != TOTAL_ELEMENT_ID
      ) {
        if (bottomIndex == -1) {
          bottomIndex = index;
        } else {
          topIndex = index;
        }
      }
    }

    let topLeft = new Coordinates(
      elements[topIndex].boundingBox.minX,
      elements[topIndex].boundingBox.maxY
    );
    let topRight = new Coordinates(
      elements[topIndex].boundingBox.maxX,
      elements[topIndex].boundingBox.maxY
    );
    let bottomLeft = new Coordinates(
      elements[bottomIndex].boundingBox.minX,
      elements[bottomIndex].boundingBox.maxY
    );

    let results: SvgElement[] = [];

    let width = topRight.x - topLeft.x;
    for (let index = 0; index < this.ticks + 1; index++) {
      let bottom = new Coordinates(
        bottomLeft.x + (index * width) / this.ticks,
        bottomLeft.y
      );
      let top = new Coordinates(
        topLeft.x + (index * width) / this.ticks,
        topLeft.y
      );

      let result = new SvgPolyline();
      result.id = ID_PREFIX_GRIDLINE_ELEMENT + '-' + index;
      result.dataPoints = [bottom, top];
      result.strokeWidth = this.width;
      result.stroke = this.color.toString();
      result.zOrder =
        this.position == 'above'
          ? ZORDER_CHART_LABEL
          : ZORDER_BACKGROUND_ELEMENT - 1;

      results.push(result);
    }

    return results;
  }
}
