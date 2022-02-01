import { SelectionType } from 'data/Selection';
import { SierraPlotOptions } from 'types';
import { DataSeries } from './DataSeries';

export class SeriesFilters {
  fieldValues: Record<string, string[]> = {};
  excludedValues: Record<string, string[]> = {};

  constructor(panelOptions: SierraPlotOptions) {
    if (
      panelOptions.selectedChart !== undefined &&
      panelOptions.selectedChart.active &&
      panelOptions.selectedChart.type == SelectionType.Group &&
      panelOptions.chartsGroupField !== undefined &&
      panelOptions.selectedChart.hightlightMode == 'exclusive'
    ) {
      this.addFilter(panelOptions.chartsGroupField, [
        panelOptions.selectedChart.value,
      ]);
    } else {
      if (panelOptions.chartsGroupField !== undefined) {
        this.addFilter(
          panelOptions.chartsGroupField,
          panelOptions.selectedGroups,
        );
        this.addExcludeFilter(
          panelOptions.chartsGroupField,
          panelOptions.excludedGroups,
        );
      }
      if (panelOptions.seriesFieldBreakdown !== undefined) {
        this.addFilter(
          panelOptions.seriesFieldBreakdown,
          panelOptions.selectedSeries,
        );
        this.addExcludeFilter(
          panelOptions.seriesFieldBreakdown,
          panelOptions.excludedSeries,
        );
      }
    }
  }

  private addFilter(field: string, values: string[]) {
    this.fieldValues[field] = values;
  }

  private addExcludeFilter(field: string, values: string[]) {
    this.excludedValues[field] = values;
  }

  filterSeriesForIncludes(seriesElement: DataSeries) {
    for (let field in this.fieldValues) {
      if (this.fieldValues[field].length == 0) {
        continue;
      }
      var noFilter = false;
      for (let index = 0; index < this.fieldValues[field].length; index++) {
        if (this.fieldValues[field][index] == '*') {
          noFilter = true;
          break;
        }
      }
      if (noFilter) {
        continue;
      }
      if (!seriesElement.dimensions.hasOwnProperty(field)) {
        continue;
      }
      for (let index = 0; index < this.fieldValues[field].length; index++) {
        if (seriesElement.dimensions[field] == this.fieldValues[field][index]) {
          noFilter = true;
          break;
        }
      }
      if (noFilter) {
        continue;
      }
      return true;
    }
    return false;
  }

  filterSeriesForExcludes(seriesElement: DataSeries) {
    for (let field in this.excludedValues) {
      if (this.excludedValues[field].length == 0) {
        continue;
      }
      var noFilter = false;
      for (let index = 0; index < this.excludedValues[field].length; index++) {
        if (this.excludedValues[field][index] == '') {
          noFilter = true;
          break;
        }
      }
      if (noFilter) {
        continue;
      }
      if (!seriesElement.dimensions.hasOwnProperty(field)) {
        continue;
      }
      for (let index = 0; index < this.excludedValues[field].length; index++) {
        if (
          seriesElement.dimensions[field] == this.excludedValues[field][index]
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
