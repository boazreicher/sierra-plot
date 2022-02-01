import { Coordinates, optionsChangeCallback, SierraPlotOptions } from 'types';
import { Selection, SelectionType } from 'data/Selection';
import { ID_KV_SEPERATOR } from 'Constants';

export class Timer {
  private groups: string[] = [];
  private chartIds: string[] = [];
  private charts: Record<string, Coordinates> = {};
  private cursor: number = 0;
  private active: boolean = false;
  private resetRequired: boolean = false;

  private panelOptions?: SierraPlotOptions;
  private onOptionsChange?: optionsChangeCallback;

  private static instance: Timer;

  private intervalId?: NodeJS.Timeout;

  static getInstance(
    panelOptions: SierraPlotOptions,
    groups: Record<string, boolean>,
    chartCoordinates: Record<string, Coordinates>,
    onOptionsChange: optionsChangeCallback
  ): Timer {
    if (!Timer.instance) {
      Timer.instance = new Timer();
    } else {
      Timer.instance.resetRequired = Timer.instance.shouldReset(panelOptions);
    }
    this.setInstance(panelOptions, groups, chartCoordinates, onOptionsChange);
    return Timer.instance;
  }

  private static setInstance(
    panelOptions: SierraPlotOptions,
    groups: Record<string, boolean>,
    chartCoordinates: Record<string, Coordinates>,
    onOptionsChange: optionsChangeCallback
  ): void {
    Timer.instance.panelOptions = panelOptions;
    Timer.instance.groups = [];
    for (let group in groups) {
      Timer.instance.groups.push(group);
    }
    Timer.instance.charts = chartCoordinates;
    Timer.instance.chartIds = [];
    for (let chartId in chartCoordinates) {
      Timer.instance.chartIds.push(chartId);
    }
    Timer.instance.onOptionsChange = onOptionsChange;
  }

  private constructor() {}

  private shouldReset(panelOptions: SierraPlotOptions): boolean {
    if (panelOptions.selectedChart === undefined || this.panelOptions?.selectedChart === undefined) {
      return false;
    }

    if (this.panelOptions?.selectedChart != panelOptions.selectedChart) {
      return true;
    }
    if (this.panelOptions?.selectedChart.type != panelOptions.selectedChart.type) {
      return true;
    }
    if (this.panelOptions?.selectedChart.hightlightMode != panelOptions.selectedChart.hightlightMode) {
      return true;
    }
    if (this.panelOptions?.transitionType != panelOptions.transitionType) {
      return true;
    }
    if (this.panelOptions?.transitionPeriod != panelOptions.transitionPeriod) {
      return true;
    }

    return false;
  }

  start(): void {
    if (this.resetRequired) {
      this.stop();
      this.resetRequired = false;
    }

    if (this.active) {
      return;
    }
    this.active = true;
    this.intervalId = setInterval(() => {
      if (this.active && this.panelOptions !== undefined && this.onOptionsChange !== undefined) {
        switch (this.panelOptions.transitionType) {
          case 'groups':
            this.panelOptions.selectedChart = new Selection('group', this.groups[this.cursor++ % this.groups.length]);
            this.panelOptions.selectedChart.type = SelectionType.Group;
            this.panelOptions.selectedChart.hightlightMode = 'focus';
            break;
          case 'charts':
            let chartId: string = this.chartIds[this.cursor++ % this.chartIds.length];
            let chartName = chartId.replace(this.panelOptions.chartsFieldBreakdown + ID_KV_SEPERATOR, '');
            this.panelOptions.selectedChart = new Selection(this.panelOptions.chartsFieldBreakdown, chartName);
            this.panelOptions.selectedChart.x = this.charts[chartId].x;
            this.panelOptions.selectedChart.y = this.charts[chartId].y;
            this.panelOptions.selectedChart.type = SelectionType.Chart;
            break;
        }

        this.onOptionsChange(this.panelOptions);
      }
    }, this.panelOptions?.transitionPeriod);
  }

  stop(): void {
    if (this.intervalId) {
      this.active = false;
      this.cursor = 0;
      clearInterval(this.intervalId);
    }
  }
}
