import { DataFrame, Field } from '@grafana/data';
import {
  ID_KV_SEPERATOR,
  ID_PREFIX_CHART_ELEMENT,
  ID_SEPERATOR,
  ID_TYPE_CHART_ELEMENT,
  ID_TYPE_GROUP_ELEMENT,
  ID_TYPE_SERIES_ELEMENT,
  UNKNOWN_SELECTION_VALUE,
  ZORDER_MISC_BACK,
} from 'Constants';
import { SeriesFilters } from 'data/SeriesFilters';
import { Aggregation, Coordinates, SortMode, TimeRange } from 'types';
import { SelectionType } from 'data/Selection';
import { ChartData } from 'charts/ChartData';
import { ChartsDataProperties } from 'charts/ChartsDataProperties';
import { DataSeries } from './DataSeries';
import { DataPoint } from './DataPoint';
import { BasicChartData } from 'charts/BasicChartData';
import { MaxValues } from './MaxValues';
import { SumValues } from './SumValues';

export function getSortedCharts(
  dataFrames: DataFrame[],
  properties: ChartsDataProperties,
): ChartData[] {
  var firstChartName;
  if (
    properties.selection !== undefined &&
    properties.selection.active &&
    properties.selection.type === SelectionType.Chart
  ) {
    firstChartName = properties.selection.value;
  }

  var result = sortCharts(
    getCharts(dataFrames, properties),
    firstChartName,
    properties.sortMode,
  );

  return result;
}

function getCharts(
  dataFrames: DataFrame[],
  properties: ChartsDataProperties,
): Record<string, ChartData> {
  var series: DataSeries[] = extractDataSeries(
    dataFrames,
    properties.amplitudeField,
    properties.weightField,
    properties.filters,
    properties.timeRange,
  );

  // This is a side-effect that should be refactored
  properties.formattedTimeRange = normalizeHorizontalAxis(series, properties);

  var charts: Record<string, ChartData> = splitSeriesForCharts(
    series,
    properties.breakdowns.chartBreakdown,
    properties.breakdowns.groupField,
  );

  let breakDownField =
    properties.breakdowns.seriesBreakdown === undefined ||
    properties.breakdowns.chartBreakdownType == 'none'
      ? properties.breakdowns.chartBreakdown
      : properties.breakdowns.seriesBreakdown;
  charts = sumOverSeriesFieldBreakdown(
    charts,
    breakDownField,
    properties.aggregation,
  );

  return charts;
}

function extractDataSeries(
  dataFrames: DataFrame[],
  valueFieldName: string,
  weightFieldName: string | undefined,
  filters: SeriesFilters,
  timeRange: TimeRange,
): DataSeries[] {
  var valueDataFrames: DataFrame[] = getDataFrames(dataFrames, valueFieldName);
  var weightDataFrames: DataFrame[] =
    weightFieldName === undefined
      ? []
      : getDataFrames(dataFrames, weightFieldName);

  return extractDataSeriesValuesAndWeights(
    valueDataFrames,
    weightDataFrames,
    filters,
    timeRange,
  );
}

function extractDataSeriesValuesAndWeights(
  valueDataFrames: DataFrame[],
  weightDataFrames: DataFrame[],
  filters: SeriesFilters,
  timeRange: TimeRange,
): DataSeries[] {
  var result: DataSeries[] = [];

  var hasWeights: boolean = false;
  if (weightDataFrames.length > 0) {
    if (valueDataFrames.length == weightDataFrames.length) {
      hasWeights = true;
    } else {
      console.warn('Different number of frames for values and weights');
    }
  }

  for (let index = 0; index < valueDataFrames.length; index++) {
    let dataFrame = valueDataFrames[index];
    let weightFrame = hasWeights ? weightDataFrames[index] : undefined;

    // Assuming that field with index 0 is always time
    var timestamps = dataFrame.fields[0].values;

    var valueField: Field = dataFrame.fields[1];
    var weightField: Field | undefined =
      weightFrame === undefined ? undefined : weightFrame.fields[1];
    var seriesElement: DataSeries = new DataSeries();
    seriesElement.name = valueField.name;

    if (valueField.labels) {
      for (let label in valueField.labels) {
        seriesElement.dimensions[label] = valueField.labels[label];
      }
    }

    if (
      filters.filterSeriesForIncludes(seriesElement) ||
      filters.filterSeriesForExcludes(seriesElement)
    ) {
      continue;
    }

    for (let index = 0; index < valueField.values.length; index++) {
      var weight =
        weightField !== undefined ? weightField.values.get(index) : 1;
      var dataPoint: DataPoint = new DataPoint(
        new Coordinates(timestamps.get(index), valueField.values.get(index)),
        weight,
      );
      seriesElement.dataPoints.push(dataPoint);
    }

    result.push(seriesElement);
  }

  return result;
}

function splitSeriesForCharts(
  series: DataSeries[],
  splitField: string,
  groupField: string | undefined,
): Record<string, ChartData> {
  let result: Record<string, ChartData> = {};

  series.forEach((data) => {
    let fieldValue = data.dimensions.hasOwnProperty(splitField)
      ? data.dimensions[splitField]
      : '';
    let sortKey =
      groupField === undefined
        ? UNKNOWN_SELECTION_VALUE
        : data.dimensions[groupField];
    if (!result.hasOwnProperty(fieldValue)) {
      result[fieldValue] = new BasicChartData(fieldValue, sortKey, splitField);
    }
    result[fieldValue].data.push(data);
    result[fieldValue].originalData.push(data.clone());
  });

  return result;
}

export function getTimeRange(series: DataFrame[]): TimeRange {
  let minTimestamp = -1;
  let maxTimestamp = 0;

  for (let index = 0; index < series.length; index++) {
    let dataFrame = series[index];

    // Assuming that field with index 0 is always time
    let timestamps = dataFrame.fields[0].values;
    if (minTimestamp == -1 || minTimestamp > timestamps.get(0)) {
      minTimestamp = timestamps.get(0);
    }
    if (maxTimestamp < timestamps.get(timestamps.length - 1)) {
      maxTimestamp = timestamps.get(timestamps.length - 1);
    }
  }

  return new TimeRange(minTimestamp, maxTimestamp);
}

export function sortCharts(
  charts: Record<string, ChartData>,
  firstChartName: string | undefined,
  sortMode: SortMode = 'lex',
): ChartData[] {
  let result: ChartData[] = [];

  for (let key in charts) {
    if (firstChartName !== undefined && charts[key].name === firstChartName) {
      charts[key].zOrder = ZORDER_MISC_BACK;
    }
    result.push(charts[key]);
  }

  switch (sortMode) {
    case 'lex':
      result.sort(compareBySortKey);
      break;
    case 'sum':
      sortBySum(result, new SumValues(result));
      break;
    case 'max':
      sortByMax(result, new MaxValues(result));
      break;
  }

  return result;
}

function compareBySortKey(a: ChartData, b: ChartData) {
  if (
    a.sortKey === undefined ||
    b.sortKey === undefined ||
    a.sortKey == b.sortKey
  ) {
    return compareLex(a.name, b.name);
  }
  return 0 - (a.sortKey < b.sortKey ? 1 : -1);
}

function compareLex(a: string | undefined, b: string | undefined): number {
  if (a === undefined || b === undefined) {
    return 0;
  }
  if (!isNaN(+a) && !isNaN(+b)) {
    return compareNumeric(+a, +b);
  }
  if (!isNaN(+a) && isNaN(+b)) {
    return -1;
  }
  if (isNaN(+a) && !isNaN(+b)) {
    return 1;
  }
  if (a == b) {
    return 0;
  }
  return 0 - (a < b ? 1 : -1);
}

export function sumOverSeriesFieldBreakdown(
  chartsSeries: Record<string, ChartData>,
  seriesFieldBreakdown: string,
  aggregation: Aggregation,
): Record<string, ChartData> {
  let result: Record<string, ChartData> = {};

  for (let key in chartsSeries) {
    result[key] = new BasicChartData(
      key,
      chartsSeries[key].sortKey,
      chartsSeries[key].breakDownField,
    );

    let seriesForBreakdownField: Record<string, DataSeries> = {};
    chartsSeries[key].data.forEach((series) => {
      if (
        !seriesForBreakdownField.hasOwnProperty(
          series.dimensions[seriesFieldBreakdown],
        )
      ) {
        seriesForBreakdownField[series.dimensions[seriesFieldBreakdown]] =
          series.getEmptySeries();
        seriesForBreakdownField[series.dimensions[seriesFieldBreakdown]].name =
          generateChartElementName(
            key,
            series.dimensions[seriesFieldBreakdown],
            chartsSeries[key].sortKey,
          );
        seriesForBreakdownField[
          series.dimensions[seriesFieldBreakdown]
        ].dimensions[seriesFieldBreakdown] =
          series.dimensions[seriesFieldBreakdown];
      }
    });

    if (aggregation == 'sum') {
      chartsSeries[key].data.forEach((series) => {
        seriesForBreakdownField[series.dimensions[seriesFieldBreakdown]].sum(
          series,
        );
      });
    } else if (aggregation == 'avg') {
      chartsSeries[key].data.forEach((series) => {
        seriesForBreakdownField[series.dimensions[seriesFieldBreakdown]].sum(
          series,
        );
      });
      for (let seriesKey in seriesForBreakdownField) {
        seriesForBreakdownField[seriesKey].calculateAverage();
      }
    }

    for (let breakdownFieldValue in seriesForBreakdownField) {
      result[key].data.push(seriesForBreakdownField[breakdownFieldValue]);
      result[key].originalData.push(
        seriesForBreakdownField[breakdownFieldValue].clone(),
      );
    }
  }

  return result;
}

function generateChartElementName(
  chartName: string,
  breakDownName: string,
  sortKey: string | undefined,
): string {
  let name: string = ID_PREFIX_CHART_ELEMENT;
  if (sortKey !== undefined) {
    name += ID_SEPERATOR + ID_TYPE_GROUP_ELEMENT + ID_KV_SEPERATOR + sortKey;
  }
  name += ID_SEPERATOR + ID_TYPE_CHART_ELEMENT + ID_KV_SEPERATOR + chartName;
  if (chartName != breakDownName) {
    name +=
      ID_SEPERATOR + ID_TYPE_SERIES_ELEMENT + ID_KV_SEPERATOR + breakDownName;
  }

  return name;
}

function compareNumeric(a: number, b: number): number {
  if (a == b) {
    return 0;
  }
  return 0 - (a > b ? -1 : 1);
}

function getDataFrames(
  dataFrames: DataFrame[],
  fieldName: string,
): DataFrame[] {
  // Assuming that the relevant field has index 1 (0 is for time field) and has type number
  return dataFrames.filter((frame) => {
    return (
      frame.fields[1].name == fieldName && frame.fields[1].type == 'number'
    );
  });
}

function normalizeHorizontalAxis(
  series: DataSeries[],
  properties: ChartsDataProperties,
): TimeRange {
  let minTimestamp = -1;
  let maxTimestamp = 0;
  let maxNumDataPoint = 0;

  for (let index = 0; index < series.length; index++) {
    if (maxNumDataPoint < series[index].dataPoints.length) {
      maxNumDataPoint = series[index].dataPoints.length;
    }

    series[index].dataPoints.forEach((dataPoint) => {
      if (minTimestamp > dataPoint.x() || minTimestamp == -1) {
        minTimestamp = dataPoint.x();
      }
      if (maxTimestamp < dataPoint.x()) {
        maxTimestamp = dataPoint.x();
      }
    });
  }

  let minFormattedXAxisValue: number | undefined;
  let maxFormattedXAxisValue: number | undefined;

  let minNewX = -1;
  let maxNewX = -1;

  let span = maxTimestamp - minTimestamp;
  for (let index = 0; index < series.length; index++) {
    series[index].dataPoints.forEach((dataPoint) => {
      let formattedXAxisValue = Math.round(
        (dataPoint.x() - minTimestamp) * ((maxNumDataPoint - 1) / span),
      );

      if (
        dataPoint.x() >= properties.timeRange.start &&
        dataPoint.x() <= properties.timeRange.end
      ) {
        if (
          minFormattedXAxisValue === undefined ||
          minFormattedXAxisValue > formattedXAxisValue
        ) {
          minFormattedXAxisValue = formattedXAxisValue;
        }
        if (
          maxFormattedXAxisValue === undefined ||
          maxFormattedXAxisValue < formattedXAxisValue
        ) {
          maxFormattedXAxisValue = formattedXAxisValue;
        }
      }

      let newX = Math.round(
        (dataPoint.x() - minTimestamp) * ((maxNumDataPoint - 1) / span),
      );
      dataPoint.setUnformattedX(dataPoint.x());
      dataPoint.setX(newX);

      if (minNewX == -1 || minNewX > newX) {
        minNewX = newX;
      }
      if (maxNewX == -1 || maxNewX < newX) {
        maxNewX = newX;
      }
    });
  }

  return new TimeRange(
    (properties.formattedTimeRange.start =
      minFormattedXAxisValue === undefined ? -1 : minFormattedXAxisValue),
    (properties.formattedTimeRange.end =
      maxFormattedXAxisValue === undefined ? -1 : maxFormattedXAxisValue + 1),
  ); // For some reason the max value seems to be off by one
}

function sortByMax(result: ChartData[], maxValues: MaxValues) {
  result.sort((a, b) => {
    let groupA = a.sortKey === undefined ? UNKNOWN_SELECTION_VALUE : a.sortKey;
    let groupB = b.sortKey === undefined ? UNKNOWN_SELECTION_VALUE : b.sortKey;

    if (groupA == groupB) {
      if (
        maxValues.groupChartValues[groupA][a.name] ==
        maxValues.groupChartValues[groupA][b.name]
      ) {
        return 0;
      }
      return (
        0 -
        (maxValues.groupChartValues[groupA][a.name] <
        maxValues.groupChartValues[groupA][b.name]
          ? 1
          : -1)
      );
    }

    if (maxValues.groupValues[groupA] == maxValues.groupValues[groupB]) {
      return 0;
    }

    return (
      0 -
      (maxValues.groupValues[groupA] < maxValues.groupValues[groupB] ? 1 : -1)
    );
  });
}

function sortBySum(result: ChartData[], sumValues: SumValues) {
  result.sort((a, b) => {
    let groupA = a.sortKey === undefined ? UNKNOWN_SELECTION_VALUE : a.sortKey;
    let groupB = b.sortKey === undefined ? UNKNOWN_SELECTION_VALUE : b.sortKey;

    if (groupA == groupB) {
      if (
        sumValues.groupChartValues[groupA][a.name] ==
        sumValues.groupChartValues[groupA][b.name]
      ) {
        return 0;
      }
      return (
        0 -
        (sumValues.groupChartValues[groupA][a.name] <
        sumValues.groupChartValues[groupA][b.name]
          ? 1
          : -1)
      );
    }

    if (sumValues.groupValues[groupA] == sumValues.groupValues[groupB]) {
      return 0;
    }

    return (
      0 -
      (sumValues.groupValues[groupA] < sumValues.groupValues[groupB] ? 1 : -1)
    );
  });
}

export function calculateTotalsSingleOriginal(charts: ChartData[]): DataSeries {
  var result: DataSeries = new DataSeries();

  var sums: Record<number, number> = {};

  charts.forEach((chart) => {
    for (var index = 0; index < chart.originalData.length; index++) {
      for (
        var xIndex = 0;
        xIndex < chart.originalData[index].dataPoints.length;
        xIndex++
      ) {
        if (
          !sums.hasOwnProperty(chart.originalData[index].dataPoints[xIndex].x())
        ) {
          sums[chart.originalData[index].dataPoints[xIndex].x()] = 0;
        }
        sums[chart.originalData[index].dataPoints[xIndex].x()] +=
          chart.originalData[index].dataPoints[xIndex].y();
      }
    }
  });

  var keys: number[] = [];
  for (let xValue in sums) {
    keys.push(+xValue);
  }

  keys.forEach((xValue) => {
    result.dataPoints.push(
      new DataPoint(new Coordinates(xValue, sums[xValue])),
    );
  });

  return result;
}

export function buildDataForRangeSelector(
  timeRange: TimeRange,
  single: DataSeries,
): string[] {
  let result: string[] = [];
  console.log(
    'Building data from time range: ' + timeRange.start + ' - ' + timeRange.end,
  );
  let start = Math.floor(timeRange.start);
  let end = Math.floor(timeRange.end);
  let step = Math.floor((end - start) / single.dataPoints.length);

  let maxValue = 0;
  single.dataPoints.forEach((dataPoint) => {
    if (maxValue < dataPoint.y()) {
      maxValue = dataPoint.y();
    }
  });

  let values: number[] = [];

  for (let index = 0; index < single.dataPoints.length; index++) {
    let value = Math.floor((100 * single.dataPoints[index].y()) / maxValue);
    values.push(value);

    let timestamp = start + index * step;
    let formattedTimestamp = new Date(timestamp).toUTCString();
    for (let copy = 0; copy < value; copy++) {
      result.push(formattedTimestamp);
    }
  }

  return result;
}
