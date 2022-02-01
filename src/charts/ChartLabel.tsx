import {
  CHART_LABEL_CLASS,
  CHART_LABEL_OPACITY_DESELECTED,
  CHART_LABEL_SHIFT_Y,
  ZORDER_CHART_LABEL
} from 'Constants';
import { SvgElement } from 'svg/SvgElement';
import { SvgText } from 'svg/SvgText';
import { Coordinates } from 'types';
import { Selection, SelectionType } from 'data/Selection';

export class ChartLabel {
  text: string;
  class: string = CHART_LABEL_CLASS;
  baseCoordinates: Coordinates;
  shiftX: number;
  textSize: number;
  textColor: string;

  static empty(): ChartLabel {
    return new ChartLabel('', new Coordinates(-1, -1), -1, -1, '');
  }

  constructor(
    text: string,
    coordinates: Coordinates,
    shiftX: number,
    textSize: number,
    textColor: string
  ) {
    this.text = text;
    this.baseCoordinates = coordinates;
    this.shiftX = shiftX;
    this.textSize = textSize;
    this.textColor = textColor;
  }

  toSvg(selection: Selection, inSelectedGroup: boolean): SvgElement {
    var chartLabel = new SvgText();
    chartLabel.class = this.class;
    chartLabel.text = this.text;
    chartLabel.textSize = this.textSize;
    chartLabel.fill = this.textColor;
    chartLabel.fillOpacity = 1;

    if (selection !== undefined && selection.active) {
      if (
        selection.type === SelectionType.Chart &&
        selection.value !== this.text
      ) {
        chartLabel.fillOpacity = CHART_LABEL_OPACITY_DESELECTED;
      } else if (selection.type === SelectionType.Group) {
        if (!inSelectedGroup) {
          chartLabel.fillOpacity = CHART_LABEL_OPACITY_DESELECTED;
        }
      }
    }

    chartLabel.x = this.baseCoordinates.x - this.shiftX;
    chartLabel.y = this.baseCoordinates.y - CHART_LABEL_SHIFT_Y;
    chartLabel.zOrder = ZORDER_CHART_LABEL;

    return chartLabel;
  }
}
