import { Selection } from 'data/Selection';

export type ScaleType = 'local' | 'global' | 'total' | 'group';
export type TotalBreakdown = 'none' | 'group' | 'chart' | 'series';
export type ChartBreakdown = 'none' | 'series';
export type StackMode = 'stacked' | 'stacked100';
export type Aggregation = 'sum' | 'avg';
export type ColorType = 'single' | 'alternating' | 'sequential';
export type ColorMode = 'regular' | 'group' | 'values' | 'valuesInverted';
export type ChartType = 'area' | 'line' | 'other';
export type SortMode = 'lex' | 'max' | 'sum';
export type TransitionType = 'none' | 'groups' | 'charts';
export type GridLinePosition = 'below' | 'above';
export type MarkersMode = 'disable' | 'hidden' | 'visible';

export type propNumber = number | string | undefined;
export type optionsChangeCallback = (options: SierraPlotOptions) => void;

export interface SierraPlotOptions {
  chartType: ChartType;
  totalChartType: ChartType;
  amplitudeField: string;
  weightField: string;
  chartsFieldBreakdown: string;
  seriesFieldBreakdown: string;
  selectedSeries: string[];
  excludedSeries: string[];
  chartsGroupField: string;
  selectedGroups: string[];
  excludedGroups: string[];
  aggregation: Aggregation;
  showSeriesCount: boolean;
  skewPercentage: number;
  scaleY: number;
  totalPerc: number;
  maxYType: ScaleType;
  leftMargin: number;
  topMargin: number;
  showGroups: boolean;
  showChartLabels: boolean;
  showTotal: boolean;
  totalBreakdown: TotalBreakdown;
  totalStackMode: StackMode;
  chartBreakdownType: ChartBreakdown;
  chartLabelSize: number;
  chartLabelShiftX: number;
  groupLabelSize: number;
  outlineColor: string;
  outlineWidth: number;
  outlineOpacity: number;
  showBackground: boolean;
  color: string;
  backgroundColor: string;
  labelColor: string;
  glow: boolean;
  glowSpread: number;

  selectedChart: Selection;

  showFog: boolean;
  fogHeight: number;
  fogColor: string;

  chartBevel: boolean;

  colorType: ColorType;
  colorMode: ColorMode;

  stepped: boolean;

  sortMode: SortMode;

  showControlElements: boolean;

  transitionPeriod: number;
  transitionType: TransitionType;
  gridlineEnabled: boolean;
  gridlineWidth: number;
  gridlineColor: string;
  gridlineTicks: number;
  gridlinePosition: GridLinePosition;

  showRangeSelector: boolean;

  timeRangeStart: number;
  timeRangeEnd: number;

  markersMode: MarkersMode;
  markersRadius: number;
  markersColor: string;
}

export class BoundingBox {
  minX = -1;
  maxX = -1;
  minY = -1;
  maxY = -1;
}

export class Coordinates {
  x: number;
  y: number;
  unformattedX?: number;
  unformattedY?: number;

  constructor(
    x: number,
    y: number,
    unformattedX?: number,
    unformattedY?: number
  ) {
    this.x = x;
    this.y = y;
    this.unformattedX = unformattedX;
    this.unformattedY = unformattedY;
  }

  clone() {
    return new Coordinates(
      this.x,
      this.y,
      this.unformattedX,
      this.unformattedY
    );
  }

  roundedX(digits = 2) {
    var factor = Math.pow(10, digits);
    return Math.round(this.x * factor) / factor;
  }

  roundedY(digits = 2) {
    var factor = Math.pow(10, digits);
    return Math.round(this.y * factor) / factor;
  }

  asString(digits = 2) {
    return this.roundedX(digits) + ',' + this.roundedY(digits) + ' ';
  }
}

export class Dimensions {
  startX = 0;
  startY = 0;
  width = 0;
  height = 0;
  maxY: number | undefined;

  clone(): Dimensions {
    var dimensions = new Dimensions();
    dimensions.startX = this.startX;
    dimensions.startY = this.startY;
    dimensions.width = this.width;
    dimensions.height = this.height;
    dimensions.maxY = this.maxY;

    return dimensions;
  }
}

export class ChartDimensions {
  width: number;
  height: number;
  totalHeight: number;
  originalHeight: number;
  shiftY: number;
  maxY: number | undefined;

  constructor(
    width: number,
    height: number,
    totalHeight: number,
    originalHeight: number,
    shiftY: number,
    maxY: number | undefined
  ) {
    this.width = width;
    this.height = height;
    this.totalHeight = totalHeight;
    this.originalHeight = originalHeight;
    this.shiftY = shiftY;
    this.maxY = maxY;
  }
}

export class ChartDimensionsProperties {
  numCharts: number;
  showTotal: boolean;
  scaleY: number;
  skewPercentage: number;
  totalHeightPercentage: number;

  constructor(
    numCharts: number,
    showTotal: boolean,
    scaleY: number,
    skewPercentage: number,
    totalHeightPercentage: number
  ) {
    this.numCharts = numCharts;
    this.showTotal = showTotal;
    this.scaleY = scaleY;
    this.skewPercentage = skewPercentage;
    this.totalHeightPercentage = totalHeightPercentage;
  }
}

export class BaseDimensionsProperties {
  leftMargin: number;
  topMargin: number;
  width: number;
  height: number;

  constructor(
    leftMargin: number,
    topMargin: number,
    width: number,
    height: number
  ) {
    this.leftMargin = leftMargin;
    this.topMargin = topMargin;
    this.width = width;
    this.height = height;
  }
}

export class TimeRange {
  start: number;
  end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  toString(): string {
    return '[' + this.start + ', ' + this.end + ']';
  }
}

export class ValueRange {
  start = 0;
  end = 0;

  constructor(start: number, end: number | undefined) {
    this.start = start;
    this.end = end === undefined ? 0 : end;
  }
}
