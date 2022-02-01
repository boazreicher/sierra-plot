import { ChartData } from 'charts/ChartData';
import { UNKNOWN_SELECTION_VALUE } from 'Constants';

export class MaxValues {
  groupValues: Record<string, number> = {};
  groupChartValues: Record<string, Record<string, number>> = {};

  constructor(charts: ChartData[]) {
    charts.forEach((chart) => {
      let groupName =
        chart.sortKey === undefined ? UNKNOWN_SELECTION_VALUE : chart.sortKey;
      if (!this.groupValues.hasOwnProperty(groupName)) {
        this.groupValues[groupName] = 0;
      }
      if (!this.groupChartValues.hasOwnProperty(groupName)) {
        this.groupChartValues[groupName] = {};
      }
      if (!this.groupChartValues[groupName].hasOwnProperty(chart.name)) {
        this.groupChartValues[groupName][chart.name] = 0;
      }

      let maxYValues: Record<number, number> = {};
      for (let index = 0; index < chart.data[0].dataPoints.length; index++) {
        chart.data.forEach((series) => {
          if (!maxYValues.hasOwnProperty(series.dataPoints[index].x())) {
            maxYValues[series.dataPoints[index].x()] = 0;
          }
          maxYValues[series.dataPoints[index].x()] +=
            series.dataPoints[index].y();
        });
      }
      for (let x in maxYValues) {
        if (this.groupChartValues[groupName][chart.name] < maxYValues[x]) {
          this.groupChartValues[groupName][chart.name] = maxYValues[x];
        }
      }
    });

    for (let group in this.groupChartValues) {
      for (let chart in this.groupChartValues[group]) {
        if (this.groupValues[group] < this.groupChartValues[group][chart]) {
          this.groupValues[group] = this.groupChartValues[group][chart];
        }
      }
    }
  }
}
