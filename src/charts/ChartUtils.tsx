
import { SierraPlotOptions, propNumber, optionsChangeCallback, Coordinates, TimeRange } from "types";
import { CLICKABLE_CLASS, DEFAULT_HEIGHT, DEFAULT_WIDTH, HOVERABLE_CLASS, PADDING_FOR_AXIS, PADDING_FOR_RANGE_SELECTOR, PANEL_MARGIN, SHIFT_FOR_AXIS, SHIFT_FOR_RANGE_SELECTOR } from "Constants";
import { SvgElement } from "svg/SvgElement";
import React from "react";
import { ViewBox } from "data/ViewBox";
import { ChartData } from "./ChartData";
import { Timer } from "Timer";
import { DataPoint } from "data/DataPoint";


export function compareByZOrder(a: SvgElement, b: SvgElement) {
  if (a.zOrder > b.zOrder) {
    return -1;
  }
  if (a.zOrder < b.zOrder) {
    return 1;
  }

  return 0;
}

export function getWidth(width: propNumber, height: propNumber) {
  return DEFAULT_WIDTH
}

export function getHeight(width: propNumber, height: propNumber, showRangeSelector: boolean) {
  if (height === undefined || width === undefined) {
    console.warn("Dimensions not defined")
    return DEFAULT_HEIGHT
  }

  let shiftForRangeSelector: number = showRangeSelector ? PADDING_FOR_RANGE_SELECTOR : 0
  let ratio: number = (+height + PANEL_MARGIN - PADDING_FOR_AXIS - shiftForRangeSelector) / +width
  return getWidth(width, height) * ratio
}

export function initBreakdowns(panelOptions: SierraPlotOptions) {
  if (panelOptions.chartBreakdownType === undefined || panelOptions.seriesFieldBreakdown === undefined) {
    panelOptions.chartBreakdownType = 'none';
    if (panelOptions.totalBreakdown === 'series') {
      panelOptions.totalBreakdown = 'none';
    }
  }
}

export function getMainSvgStyle() {
  var styles = '.' + CLICKABLE_CLASS + ' { cursor: pointer } ' + '.' + HOVERABLE_CLASS + ' { cursor: crosshair } .tick { font-size: 35px; } .bar { width: 20px; }';
  return (
    <style>
      {styles}
    </style>
  )
}

export function generateViewbox(width: propNumber, height: propNumber, showRangeSelector: boolean): string {
  let shiftForRangeSelector: number = showRangeSelector ? SHIFT_FOR_RANGE_SELECTOR : 0
  return new ViewBox(0, SHIFT_FOR_AXIS + shiftForRangeSelector, getWidth(width, height), getHeight(width, height, showRangeSelector)).toString()
}

export function updateTimer(charts: ChartData[], elements: SvgElement[], panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback): Timer {
  let groups: Record<string, boolean> = {}
  charts.forEach(chart => {
    if (chart.sortKey !== undefined) {
      groups[chart.sortKey] = true
    }
  })

  let chartCoordinates: Record<string, Coordinates> = {}


  elements.forEach(element => {
    if (element.isChartGroup && element.id !== undefined && element.id != "Total") {
      let coordinates = new Coordinates(element.boundingBox.minX, element.boundingBox.maxY)
      chartCoordinates[element.id] = coordinates
    }
  })

  let timer = Timer.getInstance(panelOptions, groups, chartCoordinates, onOptionsChange)
  if (panelOptions.transitionType == 'none') {
    timer.stop()
  } else {
    timer.start()
  }

  return timer
}

export function truncateOutsideTimeRange(sortedCharts: ChartData[], customTimeRange: boolean, formattedTimeRange: TimeRange, enabled: boolean) {
  if (!enabled || !customTimeRange) {
    return
  }

  let minX = -1
  let maxX = -1
  sortedCharts.forEach(chartData => {
    chartData.data.forEach(series => {
      let newDataPoints: DataPoint[] = []
      series.dataPoints.forEach(dataPoint => {
        if (minX == -1 || minX > dataPoint.x()) {
          minX = dataPoint.x()
        }
        if (maxX == -1 || maxX < dataPoint.x()) {
          maxX = dataPoint.x()
        }

        if (dataPoint.x() >= formattedTimeRange.start && dataPoint.x() <= formattedTimeRange.end) {
          newDataPoints.push(dataPoint.clone())
        }
      })
      series.dataPoints = newDataPoints
    })
  })

  let step = (maxX - minX) / (formattedTimeRange.end - formattedTimeRange.start)
  sortedCharts.forEach(chartData => {
    chartData.data.forEach(series => {
      series.dataPoints.forEach(dataPoint => {
        let shift = dataPoint.x() - formattedTimeRange.start
        let newX = Math.round(minX + shift * step)

        dataPoint.setX(newX)
      })
    })
  })

  return
}
