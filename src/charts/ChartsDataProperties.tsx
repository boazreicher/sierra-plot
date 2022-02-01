import { Breakdowns } from 'data/Breakdowns';
import { SeriesFilters } from 'data/SeriesFilters';
import { Aggregation, SierraPlotOptions, SortMode, TimeRange } from 'types';
import { Selection } from 'data/Selection';

export class ChartsDataProperties {
  amplitudeField: string;
  weightField: string | undefined;
  selection: Selection;
  breakdowns: Breakdowns;
  aggregation: Aggregation;
  filters: SeriesFilters;
  sortMode: SortMode;
  timeRange: TimeRange;
  formattedTimeRange: TimeRange = new TimeRange(-1, -1);

  constructor(panelOptions: SierraPlotOptions) {
    this.amplitudeField = panelOptions.amplitudeField;
    this.weightField = panelOptions.weightField;
    this.selection = panelOptions.selectedChart;
    this.breakdowns = new Breakdowns(panelOptions);
    this.aggregation = panelOptions.aggregation;
    this.filters = new SeriesFilters(panelOptions);
    this.sortMode = panelOptions.sortMode;
    this.timeRange = new TimeRange(
      panelOptions.timeRangeStart,
      panelOptions.timeRangeEnd,
    );
  }

  customTimeRange(): boolean {
    return this.formattedTimeRange.start != this.formattedTimeRange.end;
  }
}
