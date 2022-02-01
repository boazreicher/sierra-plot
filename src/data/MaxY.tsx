import { ChartData } from 'charts/ChartData';
import { ChartType, ScaleType } from 'types';
import { DataSeries } from './DataSeries';
import { Totals } from './Totals';

export class MaxY {
  scaleType: ScaleType | undefined;
  local: number | undefined;
  global: number = 0;
  total: number | undefined;
  group: Record<string, number> | undefined;

  constructor(
    maxYType: ScaleType,
    chartType: ChartType,
    charts: ChartData[],
    totals: Totals
  ) {
    this.scaleType = maxYType;
    if (maxYType === 'group') {
      this.group = this.generateMaxYValueForGroups(charts, chartType);
    }
    this.global = this.calculateMaxY(charts, chartType);
    this.total = this.calculateMaxYForSingleSeries(totals.single);
  }

  private generateMaxYValueForGroups(
    charts: ChartData[],
    chartType: ChartType
  ): Record<string, number> {
    var result: Record<string, number> = {};

    charts.forEach((chart) => {
      let sortKey = chart.sortKey;
      let sortKeyValue: string = '';
      if (sortKey !== undefined) {
        sortKeyValue = sortKey;
      }
      if (!result.hasOwnProperty(sortKeyValue)) {
        result[sortKeyValue] = 0;
      } else {
      }

      let currentMaxYForChart = 0;
      // Assuming same number of datapoints for each series within a chart
      let numDataPoints = chart.data[0].dataPoints.length;

      for (let xIndex = 0; xIndex < numDataPoints; xIndex++) {
        let currentMaxYForXIndex = 0;
        chart.data.forEach((series) => {
          if (chartType == 'area') {
            currentMaxYForXIndex += series.dataPoints[xIndex].y();
          } else {
            if (currentMaxYForXIndex < series.dataPoints[xIndex].y()) {
              currentMaxYForXIndex = series.dataPoints[xIndex].y();
            }
          }
        });

        if (currentMaxYForXIndex > currentMaxYForChart) {
          currentMaxYForChart = currentMaxYForXIndex;
        }
      }

      if (currentMaxYForChart > result[sortKeyValue]) {
        result[sortKeyValue] = currentMaxYForChart;
      }
    });

    return result;
  }

  private calculateMaxY(
    chartsSeries: ChartData[],
    chartType: ChartType
  ): number {
    let maxY = 0;

    chartsSeries.forEach((chart) => {
      let chartSums: Record<number, number> = {};
      for (let index = 0; index < chart.data.length; index++) {
        for (
          let xIndex = 0;
          xIndex < chart.data[index].dataPoints.length;
          xIndex++
        ) {
          if (
            !chartSums.hasOwnProperty(chart.data[index].dataPoints[xIndex].x())
          ) {
            chartSums[chart.data[index].dataPoints[xIndex].x()] = 0;
          }
          if (chartType == 'area') {
            // Calculate maxY as sum, since chart is stacked
            chartSums[chart.data[index].dataPoints[xIndex].x()] +=
              chart.data[index].dataPoints[xIndex].y();
          } else {
            // Calculate maxY seperatly for each series, since there's no stacking
            if (
              chartSums[chart.data[index].dataPoints[xIndex].x()] <
              chart.data[index].dataPoints[xIndex].y()
            ) {
              chartSums[chart.data[index].dataPoints[xIndex].x()] =
                chart.data[index].dataPoints[xIndex].y();
            }
          }
        }
      }
      let chartMaxY = 0;
      for (let xValue in chartSums) {
        if (chartMaxY < chartSums[xValue]) {
          chartMaxY = chartSums[xValue];
        }
      }
      if (maxY < chartMaxY) {
        maxY = chartMaxY;
      }
    });

    return maxY;
  }

  private calculateMaxYForSingleSeries(series: DataSeries): number {
    let maxY = 0;

    series.dataPoints.forEach((dataPoint) => {
      if (maxY < dataPoint.y()) {
        maxY = dataPoint.y();
      }
    });

    return maxY;
  }

  getMaxY(sortKeyValue: string | undefined): number | undefined {
    if (this.scaleType === undefined) {
      return undefined;
    }
    switch (this.scaleType) {
      case 'local':
        return this.local;
      case 'global':
        return this.global;
      case 'total':
        return this.total;
      case 'group':
        if (this.group === undefined || sortKeyValue === undefined) {
          console.warn('Max Y values for groups are undefined');
          return undefined;
        }
        return this.group[sortKeyValue];
    }
  }
}
