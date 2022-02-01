import { ChartData } from 'charts/ChartData';
import { ChartGroup } from 'charts/ChartGroup';
import { ColorPalette } from 'colors/ColorPalette';
import { SierraPlotProperties } from 'data/SierraPlotProperties';
import { PresentationElement } from 'presentationElements/PresentationElement';
import { SvgElement } from 'svg/SvgElement';
import { optionsChangeCallback, SierraPlotOptions, Dimensions } from 'types';

export class ChartGroups implements PresentationElement {
  private panelOptions: SierraPlotOptions;
  private groups: Record<string, ChartGroup> = {};
  private presentationProperties: ChartGroupPresentationProperties;

  constructor(
    charts: ChartData[],
    sierraPlotProperties: SierraPlotProperties,
    panelOptions: SierraPlotOptions,
    onOptionsChange: optionsChangeCallback
  ) {
    this.presentationProperties = new ChartGroupPresentationProperties(sierraPlotProperties, onOptionsChange);
    this.panelOptions = panelOptions;
    this.updateBoundsForCharts(charts);
  }

  private updateBoundsForCharts(charts: ChartData[]) {
    charts.forEach((chart) => this.updateBoundsForChart(chart));
  }

  private updateBoundsForChart(chart: ChartData): void {
    if (chart.sortKey === undefined) {
      return;
    }
    this.addBoundsForGroup(chart.sortKey, chart.dimensions);
    this.get(chart.sortKey).addChart(chart.name);
  }

  private addBoundsForGroup(sortKey: string, dimensionsForStackedAreaChart: Dimensions) {
    if (!this.contains(sortKey)) {
      this.set(sortKey, new ChartGroup(sortKey));
    }

    if (
      this.get(sortKey).boundingBox.minX === -1 ||
      this.get(sortKey).boundingBox.minX > dimensionsForStackedAreaChart.startX
    ) {
      this.get(sortKey).boundingBox.minX = dimensionsForStackedAreaChart.startX;
    }
    if (this.get(sortKey).boundingBox.maxX < dimensionsForStackedAreaChart.startX) {
      this.get(sortKey).boundingBox.maxX = dimensionsForStackedAreaChart.startX;
    }
    if (
      this.get(sortKey).boundingBox.minY === -1 ||
      this.get(sortKey).boundingBox.minY > dimensionsForStackedAreaChart.startY
    ) {
      this.get(sortKey).boundingBox.minY = dimensionsForStackedAreaChart.startY;
    }
    if (this.get(sortKey).boundingBox.maxY < dimensionsForStackedAreaChart.startY) {
      this.get(sortKey).boundingBox.maxY = dimensionsForStackedAreaChart.startY;
    }
    this.get(sortKey).boundingBox.minY -= this.originalHeight();
    this.get(sortKey).boundingBox.maxX += this.presentationProperties.skew;
  }

  toSvgElements(elements: SvgElement[]): SvgElement[] {
    if (!this.panelOptions.showGroups) {
      return [];
    }

    for (let group in this.groups) {
      elements = elements.concat(this.groups[group].toSvgElements(this.panelOptions, this.presentationProperties));
    }

    return elements;
  }

  get(groupName: string): ChartGroup {
    return this.groups[groupName];
  }

  set(groupName: string, group: ChartGroup) {
    this.groups[groupName] = group;
  }

  contains(groupName: string): boolean {
    return this.groups.hasOwnProperty(groupName);
  }

  startX() {
    return this.presentationProperties.startX;
  }

  width() {
    return this.presentationProperties.width;
  }

  originalHeight() {
    return this.presentationProperties.originalHeight;
  }
}

export class ChartGroupPresentationProperties {
  startX: number;
  shiftX: number;
  width: number;
  originalHeight: number;
  skew: number;
  palette: ColorPalette;
  onOptionsChange: optionsChangeCallback;

  constructor(sierraPlotProperties: SierraPlotProperties, onOptionsChange: optionsChangeCallback) {
    this.startX = sierraPlotProperties.dimensions.startX;
    this.shiftX = sierraPlotProperties.minX;
    this.width = sierraPlotProperties.dimensions.width;
    this.originalHeight = sierraPlotProperties.chartDimensions.originalHeight;
    this.skew = sierraPlotProperties.skew;
    this.palette = sierraPlotProperties.getPalette();
    this.onOptionsChange = onOptionsChange;
  }
}
