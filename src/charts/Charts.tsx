import { SierraPlotProperties } from 'data/SierraPlotProperties';
import { Totals } from 'data/Totals';
import { Dimensions, SierraPlotOptions } from 'types';
import { Selection, SelectionType } from 'data/Selection';
import { ChartData } from 'charts/ChartData';
import { ChartGroup } from 'charts/ChartGroup';
import { SvgElement } from 'svg/SvgElement';
import { TOTAL_ELEMENT_ID, UNKNOWN_SELECTION_VALUE } from 'Constants';
import { TotalChartData } from './TotalChartData';

export class Charts {
  private charts: ChartData[];
  totals: Totals;
  totalChart: TotalChartData;

  constructor(
    charts: ChartData[],
    totals: Totals,
    properties: SierraPlotProperties,
    panelOptions: SierraPlotOptions,
  ) {
    this.charts = charts;
    this.totals = totals;
    this.totalChart = new TotalChartData(
      TOTAL_ELEMENT_ID,
      undefined,
      panelOptions.chartsFieldBreakdown,
      panelOptions.totalChartType,
    );
    this.totalChart.data = this.totals.getSelectedTotals(panelOptions);
    this.totalChart.originalData = [this.totals.original];
    this.buildCharts(properties, panelOptions);
  }

  getCharts(): ChartData[] {
    return this.charts;
  }

  getTotalChart(): TotalChartData {
    return this.totalChart;
  }

  getTotalsDimensions(): Dimensions {
    if (this.totalChart.dimensions === undefined) {
      throw new Error("Couldn't get dimensions for Totals chart");
    }
    return this.totalChart.dimensions;
  }

  getLabels(
    selection: Selection,
    selectedGroup: ChartGroup,
    enabled: boolean,
  ): SvgElement[] {
    if (!enabled) {
      return [];
    }
    let elements: SvgElement[] = [];

    this.charts.forEach((chart) => {
      let inSelectedGroup: boolean = true;
      if (
        selection !== undefined &&
        selection.active &&
        selection.type === SelectionType.Group &&
        !selectedGroup.charts.hasOwnProperty(chart.name)
      ) {
        inSelectedGroup = false;
      }
      elements.push(chart.label.toSvg(selection, inSelectedGroup));
    });

    return elements;
  }

  private buildCharts(
    sierraPlotProperties: SierraPlotProperties,
    panelOptions: SierraPlotOptions,
  ) {
    this.charts.forEach((chart) => {
      chart.type = panelOptions.chartType;
      chart.colorMode = panelOptions.colorMode;
      chart.buildElements(sierraPlotProperties, panelOptions);

      let selectedGroup =
        panelOptions.selectedChart !== undefined &&
        panelOptions.selectedChart.active &&
        panelOptions.selectedChart.type == SelectionType.Group
          ? panelOptions.selectedChart.value
          : UNKNOWN_SELECTION_VALUE;
      if (
        selectedGroup != UNKNOWN_SELECTION_VALUE &&
        selectedGroup != chart.sortKey
      ) {
        chart.inSelectedGroup = false;
      }
    });
    this.totalChart.buildElements(sierraPlotProperties, panelOptions);
  }
}
