import { ChartData } from 'charts/ChartData';
import { TotalChartData } from 'charts/TotalChartData';
import { ColorPalette } from 'colors/ColorPalette';
import { White } from 'colors/ColorUtils';
import { HSLFilter } from 'colors/filters/HSLFilter';
import {
  ID_KV_SEPERATOR,
  ID_PREFIX_GROUP_ELEMENT,
  ID_SEPERATOR,
  ID_TYPE_GROUP_ELEMENT,
  NO_COLOR,
  ZORDER_CHART_RANGE,
  ZORDER_CHART_START
} from 'Constants';
import { ElementId } from 'data/ElementId';
import { SierraPlotProperties } from 'data/SierraPlotProperties';
import { ToolTipData } from 'data/ToolTipData';
import { SvgElement } from 'svg/SvgElement';
import { SierraPlotOptions } from 'types';
import {
  getOnClickHandlerForChart,
  getOnClickHandlerForTotal
} from './EventHandlers';
import { PresentationElement } from './PresentationElement';

export class ChartElements implements PresentationElement {
  private charts: ChartData[];
  private totalChart: TotalChartData;
  private panelOptions: SierraPlotOptions;
  private sierraPlotProperties: SierraPlotProperties;
  private chartsTooltipData: Record<string, ToolTipData> = {};

  constructor(
    charts: ChartData[],
    totalChart: TotalChartData,
    panelOptions: SierraPlotOptions,
    sierraPlotProperties: SierraPlotProperties
  ) {
    this.charts = charts;
    this.totalChart = totalChart;
    this.panelOptions = panelOptions;
    this.sierraPlotProperties = sierraPlotProperties;
    this.chartsTooltipData = this.buildTooltipData(
      charts,
      sierraPlotProperties.getPalette()
    );
  }

  toSvgElements(elements: SvgElement[]): SvgElement[] {
    let result: SvgElement[] = this.generateSvgElementsForCharts(
      this.panelOptions,
      this.sierraPlotProperties
    );

    if (this.panelOptions.showTotal) {
      result.push(
        this.generateSvgElementsForTotal(
          this.panelOptions,
          this.sierraPlotProperties
        )
      );
    }

    return result;
  }

  private buildTooltipData(
    charts: ChartData[],
    palette: ColorPalette
  ): Record<string, ToolTipData> {
    let chartsTooltipData: Record<string, ToolTipData> = {};
    charts.forEach((chart) => {
      if (chart.sortKey !== undefined) {
        if (!chartsTooltipData.hasOwnProperty(chart.sortKey)) {
          chartsTooltipData[chart.sortKey] = new ToolTipData();
          chartsTooltipData[chart.sortKey].group = chart.sortKey;
          chartsTooltipData[chart.sortKey].color = palette.getColorFor(
            new ElementId(
              ID_PREFIX_GROUP_ELEMENT +
                ID_SEPERATOR +
                ID_TYPE_GROUP_ELEMENT +
                ID_KV_SEPERATOR +
                chart.sortKey
            )
          );
        }
        chartsTooltipData[chart.sortKey].charts[chart.name] = White();
      }
    });
    return chartsTooltipData;
  }

  private generateSvgElementsForTotal(
    panelOptions: SierraPlotOptions,
    sierraPlotProperties: SierraPlotProperties
  ): SvgElement {
    let totalElement = this.totalChart.toSvgGroup(panelOptions.selectedChart);
    totalElement.onClick = getOnClickHandlerForTotal(
      panelOptions,
      sierraPlotProperties.onOptionsChange
    );

    return totalElement;
  }

  private generateSvgElementsForCharts(
    panelOptions: SierraPlotOptions,
    sierraPlotProperties: SierraPlotProperties
  ): SvgElement[] {
    let elements: SvgElement[] = [];

    let zOrder = ZORDER_CHART_START + ZORDER_CHART_RANGE;
    this.charts.forEach((chart) => {
      let chartGroup = chart.toSvgGroup(panelOptions.selectedChart);

      chartGroup.zOrder = chartGroup.isHighlighted(panelOptions.selectedChart)
        ? zOrder - ZORDER_CHART_RANGE
        : zOrder;
      chart.zOrder = chartGroup.zOrder;
      zOrder += 2;

      chartGroup.onClick = getOnClickHandlerForChart(
        panelOptions,
        chart.name,
        chartGroup.boundingBox.minX,
        chartGroup.boundingBox.maxY,
        sierraPlotProperties.onOptionsChange
      );

      if (chart.sortKey !== undefined) {
        chartGroup.tooltipData = this.chartsTooltipData[chart.sortKey];

        for (let index = 0; index < chartGroup.children.length; index++) {
          let element = chartGroup.children[index];
          if (element.fill !== undefined && element.fill != NO_COLOR) {
            try {
              chartGroup.tooltipData.charts[chart.name] = HSLFilter.fromString(
                element.fill
              ).toHsl();
            } catch {
              chartGroup.tooltipData.charts[chart.name] = White();
            }
          }
        }
      }

      elements.push(chartGroup);
    });

    return elements;
  }
}
