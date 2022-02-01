import { ChartData } from 'charts/ChartData';
import {
  ID_KV_SEPERATOR,
  ID_TYPE_CHART_ELEMENT,
  ID_TYPE_GROUP_ELEMENT,
  ID_TYPE_SERIES_ELEMENT,
  TOTAL_ELEMENT_ID,
} from 'Constants';
import { Coordinates, SierraPlotOptions } from 'types';
import { DataPoint } from './DataPoint';
import { DataSeries } from './DataSeries';
import { ElementId } from './ElementId';
import { SelectionType } from './Selection';

export class Totals {
  single: DataSeries = new DataSeries();
  multi: DataSeries[] = [];
  original: DataSeries;

  constructor(charts: ChartData[], original: DataSeries, panelOptions: SierraPlotOptions) {
    this.single = this.calculateTotalsSingle(charts);
    this.multi = this.calculateTotalsSeries(charts, panelOptions);
    this.original = original;
  }

  getEffectiveMaxY(panelOptions: SierraPlotOptions): number {
    let series = this.getSelectedTotals(panelOptions);

    let sumYs: Record<number, number> = {};

    series.forEach((element) => {
      for (let index = 0; index < element.dataPoints.length; index++) {
        if (!sumYs.hasOwnProperty(index)) {
          sumYs[index] = 0;
        }
        if (panelOptions.chartType === 'area') {
          // For stacked area chart, taking the sum of the different series
          sumYs[index] = sumYs[index] + element.dataPoints[index].y();
        } else {
          // For line chart, taking the max of the different series
          if (element.dataPoints[index].y() > sumYs[index]) {
            sumYs[index] = element.dataPoints[index].y();
          }
        }
      }
    });

    let effectiveMaxY = 0;

    for (let key in sumYs) {
      if (sumYs[key] > effectiveMaxY) {
        effectiveMaxY = sumYs[key];
      }
    }

    return effectiveMaxY;
  }

  getSelectedTotals(panelOptions: SierraPlotOptions): DataSeries[] {
    if (
      panelOptions.totalBreakdown === 'chart' ||
      (panelOptions.totalBreakdown === 'group' && panelOptions.chartsGroupField !== undefined) ||
      (panelOptions.totalBreakdown === 'series' && panelOptions.seriesFieldBreakdown !== undefined)
    ) {
      return this.multi;
    } else {
      return [this.single];
    }
  }

  private calculateTotalsSeries(sortedChartsSeries: ChartData[], panelOptions: SierraPlotOptions): DataSeries[] {
    let stacked: DataSeries[] = [];
    let stacked100: DataSeries[] = [];
    let summationsForGroups: Record<string, DataSeries> = {};
    let summations100ForGroups: Record<string, DataSeries> = {};

    if (
      panelOptions.selectedChart !== undefined &&
      panelOptions.selectedChart.active &&
      panelOptions.selectedChart.type === SelectionType.Group
    ) {
      if (panelOptions.totalBreakdown === 'series' && panelOptions.seriesFieldBreakdown !== undefined) {
        this.getTotalsBreakDownForSeries(sortedChartsSeries, summationsForGroups, panelOptions.selectedChart.value);
      } else {
        this.getTotalsBreakDownForCharts(sortedChartsSeries, summationsForGroups, panelOptions.selectedChart.value);
      }
    } else {
      switch (panelOptions.totalBreakdown) {
        case 'none':
          break;
        case 'series':
          this.getTotalsBreakDownForSeries(sortedChartsSeries, summationsForGroups);
          break;
        case 'chart':
          this.getTotalsBreakDownForCharts(sortedChartsSeries, summationsForGroups);
          break;
        case 'group':
          this.getTotalsBreakDownForGroups(
            sortedChartsSeries,
            summationsForGroups,
            panelOptions.totalChartType === 'line' && panelOptions.aggregation === 'avg'
          );
          break;
      }
    }

    for (let group in summationsForGroups) {
      stacked.push(summationsForGroups[group]);
      summations100ForGroups[group] = summationsForGroups[group].clone();
    }

    for (let index = 0; index < sortedChartsSeries[0].data[0].dataPoints.length; index++) {
      let sum = 0;
      for (let group in summationsForGroups) {
        sum += summationsForGroups[group].dataPoints[index].y();
      }
      for (let group in summationsForGroups) {
        summations100ForGroups[group].dataPoints[index].setY(
          sum === 0 ? 0 : (100 * summationsForGroups[group].dataPoints[index].y()) / sum
        );
      }
    }

    for (let group in summations100ForGroups) {
      stacked100.push(summations100ForGroups[group]);
    }

    return panelOptions.totalStackMode === 'stacked' ? stacked : stacked100;
  }

  private getTotalsBreakDownForSeries(
    sortedChartsSeries: ChartData[],
    summationsForGroups: Record<string, DataSeries>,
    selectedGroup: string | undefined = undefined
  ) {
    sortedChartsSeries.forEach((chart) => {
      if (selectedGroup !== undefined) {
        if (chart.sortKey === undefined) {
          console.warn('Undefined chart sort key');
          return;
        }
        if (chart.sortKey !== selectedGroup) {
          return;
        }
      }
      if (chart.name === undefined) {
        console.warn('Undefined chart name');
        return;
      }
      let chartName = chart.name;
      chart.data.forEach((series) => {
        let seriesName = this.getSeriesName(series.name);
        if (seriesName === undefined) {
          console.warn('Series name undefined for ' + chartName);
          return;
        }
        if (!summationsForGroups.hasOwnProperty(seriesName)) {
          summationsForGroups[seriesName] = chart.data[0].getEmptySeries();
          summationsForGroups[seriesName].name = ID_TYPE_SERIES_ELEMENT + ID_KV_SEPERATOR + seriesName;
        }
        summationsForGroups[seriesName].sum(series);
      });
    });
  }

  private getTotalsBreakDownForCharts(
    sortedChartsSeries: ChartData[],
    summationsForGroups: Record<string, DataSeries>,
    selectedGroup: string | undefined = undefined
  ) {
    sortedChartsSeries.forEach((chart) => {
      if (selectedGroup !== undefined) {
        if (chart.sortKey === undefined) {
          console.warn('Undefined chart sort key');
          return;
        }
        if (chart.sortKey !== selectedGroup) {
          return;
        }
      }
      if (chart.name === undefined) {
        console.warn('Undefined chart name');
        return;
      }
      if (!summationsForGroups.hasOwnProperty(chart.name)) {
        summationsForGroups[chart.name] = chart.data[0].getEmptySeries();
        summationsForGroups[chart.name].name = ID_TYPE_CHART_ELEMENT + ID_KV_SEPERATOR + chart.name;
        summationsForGroups[chart.name].sortKey = chart.sortKey;
      }
      for (let index = 0; index < chart.data.length; index++) {
        summationsForGroups[chart.name].sum(chart.data[index]);
      }
    });
  }

  private getTotalsBreakDownForGroups(
    sortedChartsSeries: ChartData[],
    summationsForGroups: Record<string, DataSeries>,
    average: boolean
  ) {
    sortedChartsSeries.forEach((chart) => {
      if (chart.sortKey === undefined) {
        console.warn('Undefined sort key for chart ' + chart.name);
        return;
      }
      if (!summationsForGroups.hasOwnProperty(chart.sortKey)) {
        summationsForGroups[chart.sortKey] = chart.data[0].getEmptySeries();
        summationsForGroups[chart.sortKey].name = ID_TYPE_GROUP_ELEMENT + ID_KV_SEPERATOR + chart.sortKey;
      }
      for (let index = 0; index < chart.data.length; index++) {
        if (average) {
          summationsForGroups[chart.sortKey].average(chart.data[index], chart.data[index].getEmptySeries());
        } else {
          summationsForGroups[chart.sortKey].sum(chart.data[index]);
        }
      }
    });
  }

  private calculateTotalsSingle(charts: ChartData[]): DataSeries {
    let result: DataSeries = new DataSeries();
    result.name = TOTAL_ELEMENT_ID;

    let sums: Record<number, number> = {};

    charts.forEach((chart) => {
      for (let index = 0; index < chart.data.length; index++) {
        for (let xIndex = 0; xIndex < chart.data[index].dataPoints.length; xIndex++) {
          if (!sums.hasOwnProperty(chart.data[index].dataPoints[xIndex].x())) {
            sums[chart.data[index].dataPoints[xIndex].x()] = 0;
          }
          sums[chart.data[index].dataPoints[xIndex].x()] += chart.data[index].dataPoints[xIndex].y();
        }
      }
    });

    let keys: number[] = [];
    for (let xValue in sums) {
      keys.push(+xValue);
    }

    keys.forEach((xValue) => {
      result.dataPoints.push(new DataPoint(new Coordinates(xValue, sums[xValue])));
    });

    return result;
  }

  private getSeriesName(chartName: string | undefined): string | undefined {
    if (chartName === undefined) {
      return undefined;
    }
    let seriesId = new ElementId(chartName);
    return seriesId.series;
  }
}
