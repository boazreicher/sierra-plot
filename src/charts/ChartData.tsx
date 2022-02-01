import { initChart } from 'charts/ChartHelper';
import { ChartLabel } from 'charts/ChartLabel';
import { SierraPlotProperties } from 'data/SierraPlotProperties';
import { SvgElement } from 'svg/SvgElement';
import { ChartType, ColorType, SierraPlotOptions, Dimensions, ColorMode } from 'types';
import { DataSeries } from 'data/DataSeries';
import { ChartsPresentationProperties } from './ChartsPresentationProperties';
import { SvgGroup } from 'svg/SvgGroup';
import { Selection } from 'data/Selection';

export abstract class ChartData {
  name: string;
  type: ChartType;
  breakDownField: string;
  colorType: ColorType = 'single';
  colorMode: ColorMode = 'regular';
  sortKey: string | undefined;
  data: DataSeries[] = [];
  originalData: DataSeries[] = [];
  zOrder: number = 0;
  dimensions: Dimensions = new Dimensions();
  elements: SvgElement[] = [];
  label: ChartLabel = ChartLabel.empty();
  inSelectedGroup: boolean = true;

  constructor(name: string, sortKey: string | undefined, breakDownField: string, type: ChartType) {
    this.name = name;
    this.sortKey = sortKey;
    this.breakDownField = breakDownField;
    this.type = type;
  }

  buildElements(sierraPlotProperties: SierraPlotProperties, panelOptions: SierraPlotOptions): void {
    this.calculateDimensions(sierraPlotProperties, panelOptions.skewPercentage);
    this.calculateChartElements(panelOptions, sierraPlotProperties);
    this.filterDataPointsOutsideViewBox(sierraPlotProperties.minX);
    this.label = this.getChartLabel(sierraPlotProperties, panelOptions);
  }

  abstract toSvgGroup(selection: Selection): SvgGroup;

  private calculateDimensions(sierraPlotProperties: SierraPlotProperties, skewPercentage: number) {
    let result: Dimensions = new Dimensions();

    let effectiveChartHeight = this.getEffectiveChartHeight(sierraPlotProperties);

    let skew = (sierraPlotProperties.chartDimensions.width * skewPercentage) / 100;
    let numCharts = sierraPlotProperties.getNumChartsRunning();

    result.startX = skew * numCharts + sierraPlotProperties.dimensions.startX;
    result.startY = this.getEffectiveStartY(sierraPlotProperties, numCharts);
    result.width = sierraPlotProperties.chartDimensions.width;
    result.height = effectiveChartHeight;
    result.maxY = this.getEffectiveMaxY(sierraPlotProperties);

    this.dimensions = result;
  }

  private calculateChartElements(panelOptions: SierraPlotOptions, sierraPlotProperties: SierraPlotProperties) {
    let groupMaxY = this.getEffectiveGroupMaxY(sierraPlotProperties);
    let chart = initChart(this.type, this.name, this.dimensions, groupMaxY);
    this.elements = chart.buildSvgElements(
      this.data,
      this.getNumDataPoints(),
      this.getChartsPresentationProperties(sierraPlotProperties, panelOptions)
    );
  }

  private filterDataPointsOutsideViewBox(minX: number) {
    if (minX <= 0) {
      return;
    }

    this.elements.forEach((element) => {
      if (element.hasDataPoints()) {
        element.dataPoints = element.dataPoints.filter((coordnates) => coordnates.x >= minX + this.dimensions.startX);
      }
    });
  }

  private getNumDataPoints(): number {
    // Assuming all series have the same number of data points
    return this.originalData[0].dataPoints.length;
  }

  protected abstract getEffectiveChartHeight(sierraPlotProperties: SierraPlotProperties): number;
  protected abstract getEffectiveStartY(sierraPlotProperties: SierraPlotProperties, numCharts: number): number;
  protected abstract getEffectiveMaxY(sierraPlotProperties: SierraPlotProperties): number | undefined;
  protected abstract getEffectiveGroupMaxY(sierraPlotProperties: SierraPlotProperties): number | undefined;
  protected abstract getChartsPresentationProperties(
    sierraPlotProperties: SierraPlotProperties,
    panelOptions: SierraPlotOptions
  ): ChartsPresentationProperties;
  protected abstract getChartLabel(
    sierraPlotProperties: SierraPlotProperties,
    panelOptions: SierraPlotOptions
  ): ChartLabel;
}
