import { ChartData } from 'charts/ChartData';
import { UNKNOWN_SELECTION_VALUE } from 'Constants';

export class SumValues {
  groupValues: Record<string, number> = {};
  groupChartValues: Record<string, Record<string, number>> = {};

  constructor(charts: ChartData[]) {
    charts.forEach((chart) => {
      let groupName = chart.sortKey === undefined ? UNKNOWN_SELECTION_VALUE : chart.sortKey;
      if (!this.groupValues.hasOwnProperty(groupName)) {
        this.groupValues[groupName] = 0;
      }
      if (!this.groupChartValues.hasOwnProperty(groupName)) {
        this.groupChartValues[groupName] = {};
      }
      if (!this.groupChartValues[groupName].hasOwnProperty(chart.name)) {
        this.groupChartValues[groupName][chart.name] = 0;
      }

      for (let index = 0; index < chart.data[0].dataPoints.length; index++) {
        chart.data.forEach((series) => {
          this.groupChartValues[groupName][chart.name] += series.dataPoints[index].y();
          this.groupValues[groupName] += series.dataPoints[index].y();
        });
      }
    });
  }
}
