import { Color } from 'colors/Color';
import { ColorPalette } from 'colors/ColorPalette';
import { blend } from 'colors/ColorUtils';
import {
  ID_PREFIX_TOTAL_ELEMENT,
  TOTAL_ELEMENT_ID,
  ID_PREFIX_LINE_ELEMENT,
  LUMINANCE_DECREASE_SERIES,
  FILTER_NAME_PREFIX_SELECTED_CHART,
  FILTER_NAME_PREFIX_GROUP,
  FILTER_NAME_PREFIX_CHART,
  FILTER_NAME_PREFIX_SERIES,
} from 'Constants';
import { HSL } from 'colors/HSL';
import { ElementId } from 'data/ElementId';
import { ColorMode } from 'types';
import { HSLFilter } from './filters/HSLFilter';
import { Filter } from './filters/Filter';

export class PredefinedColorMap implements ColorPalette {
  total: Color;
  labels: Color;
  seriesElements: Record<string, Color> = {};
  chartElements: Record<string, Color> = {};
  groupElements: Record<string, Color> = {};

  groupPalette: ColorPalette;
  chartPalette: ColorPalette;
  seriesPalette: ColorPalette;

  currentChart = '';
  chartCursor = 0;

  constructor(
    total: Color,
    labels: Color,
    groupPalette: ColorPalette,
    chartPalette: ColorPalette,
    seriesPalette: ColorPalette
  ) {
    this.total = total;
    this.labels = labels;
    this.groupPalette = groupPalette;
    this.chartPalette = chartPalette;
    this.seriesPalette = seriesPalette;
  }
  resetIfDifferent(key: string | undefined): void {
    throw new Error('Method not implemented.');
  }
  reset(): void {
    throw new Error('Method not implemented.');
  }

  addKey(elementId: ElementId, colorMode: ColorMode, selected = false) {
    if (elementId.type === ID_PREFIX_TOTAL_ELEMENT && elementId.value === TOTAL_ELEMENT_ID) {
      return;
    }

    let group = '';
    if (elementId.group !== undefined) {
      group = elementId.group;
      if (!this.groupElements.hasOwnProperty(group)) {
        let groupColor = this.groupPalette.next().toHsl();
        this.groupElements[group] = new HSLFilter(groupColor, FILTER_NAME_PREFIX_GROUP);
      }
    }

    if (elementId.chart !== undefined) {
      if (!this.chartElements.hasOwnProperty(elementId.chart)) {
        let chartColor: Color = this.chartPalette.next();

        if (selected) {
          this.chartElements[elementId.chart] = new HSLFilter(chartColor.toHsl(), FILTER_NAME_PREFIX_SELECTED_CHART);
        } else if (colorMode === 'group') {
          this.chartElements[elementId.chart] = new HSLFilter(
            blend(this.groupElements[group], chartColor).toHsl(),
            FILTER_NAME_PREFIX_CHART
          );
        } else {
          this.chartElements[elementId.chart] = new HSLFilter(chartColor.toHsl(), FILTER_NAME_PREFIX_CHART);
        }
      }
    }
    if (elementId.series !== undefined) {
      if (!this.seriesElements.hasOwnProperty(elementId.series)) {
        let seriesColor = this.seriesPalette.next();
        this.seriesElements[elementId.series] = new HSLFilter(seriesColor.toHsl(), FILTER_NAME_PREFIX_SERIES);
      }
    }
  }

  getColorFor(elementId: ElementId): Color {
    if (elementId.type === ID_PREFIX_TOTAL_ELEMENT && elementId.value === TOTAL_ELEMENT_ID) {
      if (this.total === undefined) {
        throw new Error('No color defined for total');
      }
      return this.total;
    } else if (elementId.type === ID_PREFIX_LINE_ELEMENT) {
      return this.labels;
    }

    if (elementId.type === ID_PREFIX_TOTAL_ELEMENT && elementId.series !== undefined) {
      return this.seriesElements[elementId.series];
    }

    if (elementId.series !== undefined) {
      if (elementId.chart === undefined) {
        throw new Error('Missing chart element in ' + JSON.stringify(elementId));
      } else {
        return this.calculateSeriesElement(this.seriesElements[elementId.series], elementId.chart);
      }
    }
    if (elementId.chart !== undefined) {
      return this.chartElements[elementId.chart];
    }
    if (elementId.group !== undefined) {
      return this.groupElements[elementId.group];
    }

    throw new Error('Unable to get color for ' + JSON.stringify(elementId));
  }

  next(): Color {
    throw new Error('Method not implemented.');
  }

  calculateSeriesElement(seriesColor: Color, chart: string): Color {
    if (chart !== this.currentChart) {
      this.chartCursor += 1;
    }

    let baseColor = (seriesColor as Filter).baseColor;
    if (baseColor === undefined) {
      throw new Error('Base color is undefined');
    }

    this.currentChart = chart;
    let shifted: HSL = baseColor.clone().toHsl();
    shifted.decreaseLuminance(LUMINANCE_DECREASE_SERIES * (this.chartCursor % 2));

    return new HSLFilter(shifted.toHsl(), FILTER_NAME_PREFIX_SERIES);
  }

  toArray(): Color[] {
    let result: Color[] = [];
    for (let key in this.seriesElements) {
      result.push(this.seriesElements[key]);
    }
    for (let key in this.chartElements) {
      result.push(this.chartElements[key]);
    }
    for (let key in this.groupElements) {
      result.push(this.groupElements[key]);
    }
    return result;
  }
}
