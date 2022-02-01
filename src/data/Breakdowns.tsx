import { ChartBreakdown, SierraPlotOptions } from 'types';

export class Breakdowns {
  seriesBreakdown: string | undefined;
  chartBreakdown: string;
  groupField: string | undefined;

  chartBreakdownType: ChartBreakdown | undefined;

  constructor(panelOptions: SierraPlotOptions) {
    this.seriesBreakdown = panelOptions.seriesFieldBreakdown;
    this.chartBreakdown = panelOptions.chartsFieldBreakdown;
    this.groupField = panelOptions.chartsGroupField;
    this.chartBreakdownType = panelOptions.chartBreakdownType;
  }
}
