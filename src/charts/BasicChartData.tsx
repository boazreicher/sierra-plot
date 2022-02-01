import { ColorPalette } from 'colors/ColorPalette';
import { hexToHsl } from 'colors/ColorUtils';
import {
  CHART_LABEL_MARGIN_X,
  CHART_LABEL_MARGIN_Y,
  ID_KV_SEPERATOR
} from 'Constants';
import { SierraPlotProperties } from 'data/SierraPlotProperties';
import { SvgGroup } from 'svg/SvgGroup';
import { ChartType, Coordinates, SierraPlotOptions } from 'types';
import { ChartData } from './ChartData';
import { ChartLabel } from './ChartLabel';
import { ChartsPresentationProperties } from './ChartsPresentationProperties';
import { Selection } from 'data/Selection';

export class BasicChartData extends ChartData {
  toSvgGroup(selection: Selection): SvgGroup {
    var chartGroup = new SvgGroup();
    chartGroup.isChartGroup = true;
    chartGroup.id = this.breakDownField + ID_KV_SEPERATOR + this.name;
    chartGroup.zOrder = this.zOrder;
    chartGroup.children = this.elements;
    chartGroup.calculateBoundingBox(this.type);

    chartGroup.sortKey = this.sortKey;
    chartGroup.colorMode = this.colorMode;
    chartGroup.calculateMaxHeightFromChildren();
    chartGroup.setDisplayedCharts(selection, this, this.breakDownField);

    // This should probably go elsewhere
    if (
      selection !== undefined &&
      selection.active &&
      this.name !== undefined
    ) {
      selection.updatePositionForChart(
        this.name,
        chartGroup.boundingBox.minX,
        chartGroup.boundingBox.maxY
      );
    }

    return chartGroup;
  }

  protected getChartLabel(
    sierraPlotProperties: SierraPlotProperties,
    panelOptions: SierraPlotOptions
  ): ChartLabel {
    let chartCoordinates = new Coordinates(
      this.dimensions.startX - CHART_LABEL_MARGIN_X + sierraPlotProperties.minX,
      this.dimensions.startY - CHART_LABEL_MARGIN_Y
    );
    return new ChartLabel(
      this.name,
      chartCoordinates,
      panelOptions.chartLabelShiftX,
      panelOptions.chartLabelSize,
      panelOptions.labelColor
    );
  }
  protected getChartsPresentationProperties(
    sierraPlotProperties: SierraPlotProperties,
    panelOptions: SierraPlotOptions
  ): ChartsPresentationProperties {
    let palette: ColorPalette = sierraPlotProperties.selectPalette(
      panelOptions.colorMode,
      panelOptions.selectedChart,
      this.sortKey,
      false,
      panelOptions.chartBreakdownType
    );
    return new ChartsPresentationProperties(
      false,
      palette,
      hexToHsl(panelOptions.outlineColor),
      panelOptions
    );
  }
  protected getEffectiveGroupMaxY(
    sierraPlotProperties: SierraPlotProperties
  ): number | undefined {
    return sierraPlotProperties.maxY.getMaxY(this.sortKey);
  }
  protected getEffectiveStartY(
    sierraPlotProperties: SierraPlotProperties,
    numCharts: number
  ): number {
    return (
      sierraPlotProperties.dimensions.height -
      sierraPlotProperties.chartDimensions.originalHeight * numCharts +
      sierraPlotProperties.dimensions.startY
    );
  }
  protected getEffectiveMaxY(
    sierraPlotProperties: SierraPlotProperties
  ): number | undefined {
    return sierraPlotProperties.chartDimensions.maxY;
  }
  protected getEffectiveChartHeight(
    sierraPlotProperties: SierraPlotProperties
  ): number {
    return sierraPlotProperties.chartDimensions.height;
  }

  constructor(
    name: string,
    sortKey: string | undefined,
    breakDownField: string,
    type: ChartType = 'other'
  ) {
    super(name, sortKey, breakDownField, type);
  }
}
