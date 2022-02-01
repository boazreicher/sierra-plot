import * as React from "react";
import { DataFrame } from "@grafana/data";
import { SierraPlotOptions, propNumber, optionsChangeCallback, TimeRange, BaseDimensionsProperties, ChartDimensionsProperties } from "types";
import { buildDataForRangeSelector, calculateTotalsSingleOriginal, getSortedCharts } from "data/DataSeriesUtils";
import { generateViewbox, getHeight, getMainSvgStyle, getWidth, initBreakdowns, truncateOutsideTimeRange, updateTimer } from "charts/ChartUtils";
import { SierraPlotProperties } from "data/SierraPlotProperties";
import { getOnClickHandler } from "presentationElements/EventHandlers";
import { Charts } from "charts/Charts";
import { ChartsSvgElements } from "data/ChartsSvgElements";
import { ChartGroups } from "charts/ChartGroups";
import { BackgroundElement } from "presentationElements/BackgroundElement";
import { FogElements } from "presentationElements/FogElements";
import { ChartsDataProperties } from "charts/ChartsDataProperties";
import { YAxis } from "./YAxis";
import { DefaultPaletteGenerator } from "colors/defaults/DefaultPaletteGenerator";
import { ChartElements } from "presentationElements/ChartElements";
import { ChartData } from "charts/ChartData";
import { Totals } from "data/Totals";
import { ChartLabels } from "presentationElements/ChartLabels";
import { SierraPlotSvgElements } from "./SierraPlotSvgElements";
import { SierraPlotDefs } from "./SierraPlotDefs";;
import { VerticalGridLines } from "presentationElements/VerticalGridLines";
import { Hex } from "colors/Hex";
import RangeSliderComponent from "DataRangeSlider";
import { XAxis } from "./XAxis";
import { ControlElements } from "./controls/ControlElements";
import { Gear } from "./controls/Gear";
import { Markers } from "presentationElements/Markers";


var sierraPlotProperties: SierraPlotProperties
var chartsSvgElements: ChartsSvgElements
var dataForRangeSelector: string[]
var errorMessage: string

export const SierraPlot = ({
  ...props
}: React.SVGProps<SVGSVGElement> & { dataFrames: DataFrame[] } & { panelOptions: SierraPlotOptions } & { timeRange: TimeRange } & { onOptionsChange: optionsChangeCallback }) => (
  <>{isValid(props.panelOptions) ?
    <svg
      xmlns={initSierraPlotElements(props.panelOptions, props.dataFrames, props.width, props.height, props.timeRange, props.onOptionsChange)}
      height="100%"
      width="100%"
      viewBox={generateViewbox(props.width, props.height, props.panelOptions.showRangeSelector)}
      onClick={getOnClickHandler(props.panelOptions, props.onOptionsChange)}
    >
      {getMainSvgStyle()}

      <SierraPlotDefs filters={sierraPlotProperties.filters} />
      <SierraPlotSvgElements chartsSvgElements={chartsSvgElements} />

      <YAxis effectiveMaxY={sierraPlotProperties.totalsMaxY} totalStackMode={props.panelOptions.totalStackMode} enabled={props.panelOptions.showTotal} totalsDimensions={sierraPlotProperties.totalsDimensions} />
      <ControlElements chartsSvgElements={chartsSvgElements} panelOptions={props.panelOptions} onOptionsChange={props.onOptionsChange} />
      <Gear chartsSvgElements={chartsSvgElements} panelOptions={props.panelOptions} onOptionsChange={props.onOptionsChange} />
      <XAxis sierraPlotProperties={sierraPlotProperties} selection={props.panelOptions.selectedChart} />
      <RangeSliderComponent panelOptions={props.panelOptions} sierraPlotProperties={sierraPlotProperties} onOptionsChange={props.onOptionsChange} data={dataForRangeSelector} />
    </svg> : <>{errorMessage}</>
  }


  </>
);

function isValid(panelOptions: SierraPlotOptions): boolean {
  if (panelOptions.amplitudeField === undefined) {
    console.warn("Amplitude field is undefined")
    errorMessage = "Amplitude field is undefined"
    return false
  }
  return true
}

function initSierraPlotElements(panelOptions: SierraPlotOptions, dataFrames: DataFrame[], width: propNumber, height: propNumber, timeRange: TimeRange, onOptionsChange: optionsChangeCallback): string {
  initBreakdowns(panelOptions);

  let chartsDataProperties = new ChartsDataProperties(panelOptions)
  let sortedCharts: ChartData[] = getSortedCharts(dataFrames, chartsDataProperties)

  let totalsOriginal = calculateTotalsSingleOriginal(sortedCharts)

  truncateOutsideTimeRange(sortedCharts, chartsDataProperties.customTimeRange(), chartsDataProperties.formattedTimeRange, panelOptions.showRangeSelector)

  let totals = new Totals(sortedCharts, totalsOriginal, panelOptions)

  sierraPlotProperties = initSierraPlotProperties(panelOptions, sortedCharts, totals, width, height, chartsDataProperties.timeRange, onOptionsChange)

  let charts = new Charts(sortedCharts, totals, sierraPlotProperties, panelOptions)
  sierraPlotProperties.totalsDimensions = charts.getTotalsDimensions()

  dataForRangeSelector = buildDataForRangeSelector(timeRange, totalsOriginal)

  chartsSvgElements = new ChartsSvgElements(
    new ChartElements(charts.getCharts(), charts.getTotalChart(), panelOptions, sierraPlotProperties),
    new ChartLabels(charts.getCharts(), panelOptions.selectedChart, panelOptions.showChartLabels),
    new ChartGroups(charts.getCharts(), sierraPlotProperties, panelOptions, onOptionsChange),
    new Markers(charts.getCharts(), panelOptions),
    new BackgroundElement(sierraPlotProperties.minX, panelOptions.backgroundColor, panelOptions.showBackground),
    new FogElements(panelOptions.fogHeight, panelOptions.fogColor, panelOptions.selectedChart, panelOptions.showFog),
    new VerticalGridLines(panelOptions.gridlineEnabled, panelOptions.gridlineWidth, new Hex(panelOptions.gridlineColor), panelOptions.gridlinePosition, panelOptions.gridlineTicks)
  )

  // Set the tranistions timer
  updateTimer(charts.getCharts(), chartsSvgElements.getChartsElements(), panelOptions, onOptionsChange)

  return "http://www.w3.org/2000/svg"
}


function initSierraPlotProperties(panelOptions: SierraPlotOptions, sortedCharts: ChartData[], totals: Totals, width: propNumber, height: propNumber, timeRange: TimeRange, onOptionsChange: optionsChangeCallback): SierraPlotProperties {
  let baseDimensionsProperties = new BaseDimensionsProperties(panelOptions.leftMargin, panelOptions.topMargin, getWidth(width, height), getHeight(width, height, panelOptions.showRangeSelector))
  let chartDimensionsProperties = new ChartDimensionsProperties(sortedCharts.length, panelOptions.showTotal, panelOptions.scaleY, panelOptions.skewPercentage, panelOptions.totalPerc)
  let paletteGenerator = new DefaultPaletteGenerator()

  return new SierraPlotProperties(panelOptions, sortedCharts, totals, baseDimensionsProperties, chartDimensionsProperties, paletteGenerator, timeRange, onOptionsChange);
}



