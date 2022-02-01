import { LineChart } from 'charts/LineChart';
import { StackedAreaChart } from 'charts/StackedAreaChart';
import { ChartType, Dimensions } from 'types';

export function initChart(type: ChartType, name: string, dimensions: Dimensions, maxY: number | undefined = undefined) {
  var singleChart;
  if (type == 'area') {
    singleChart = new StackedAreaChart(name, dimensions.clone());
  } else {
    singleChart = new LineChart(name, dimensions.clone());
  }
  singleChart.chartDimensions.maxY = maxY;

  return singleChart;
}
