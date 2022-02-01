
import * as React from "react";
import { optionsChangeCallback, SierraPlotOptions } from "types";
import { ChartsSvgElements } from "data/ChartsSvgElements";
import { ChartArea } from "charts/ChartArea";
import { Defs } from "./Defs";
import { FogBtn, FogOperation } from "./Fog";
import { Timer } from "./Timer";
import { Grid } from "./Grid";
import { ChartChart, ChartSeries, TotalChart, TotalGroup, TotalSeries, TotalTotal } from "./Chart";
import { Container } from "./Container";
import { RangeSelector } from "./RangeSelector";
import { ScaleType } from "./ScaleType";

export const ControlElements = ({
    ...props
}: React.SVGProps<SVGElement> & { chartsSvgElements: ChartsSvgElements } & { panelOptions: SierraPlotOptions } & { onOptionsChange: optionsChangeCallback }) => (
    createControlElements(props.chartsSvgElements, props.panelOptions, props.onOptionsChange)
);

function createControlElements(chartsSvgElements: ChartsSvgElements, panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback) {
    if (!panelOptions.showControlElements) {
        return <></>
    }

    let area = new ChartArea(chartsSvgElements.getChartsElements())
    let startX = area.topRight.x
    let startY = area.bottomLeft.y

    return <svg
        id="controlElements"
        version="1.1"
        viewBox="0 0 210 297"
        height="1122"
        width="793"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg" x={startX - 793 + 15} y={getYPos(startY, panelOptions.showRangeSelector)}>
        {Defs()}
        {Container()}
        {FogBtn(FogOperation.TOGGLE, panelOptions, onOptionsChange)}
        {FogBtn(FogOperation.UP, panelOptions, onOptionsChange)}
        {FogBtn(FogOperation.DOWN, panelOptions, onOptionsChange)}
        {RangeSelector(panelOptions, onOptionsChange)}
        {Grid(panelOptions, onOptionsChange)}
        {Timer(panelOptions, onOptionsChange)}
        {ScaleType(panelOptions, onOptionsChange)}
        {ChartChart(panelOptions, onOptionsChange)}
        {ChartSeries(panelOptions, onOptionsChange)}
        {TotalTotal(panelOptions, onOptionsChange)}
        {TotalGroup(panelOptions, onOptionsChange)}
        {TotalChart(panelOptions, onOptionsChange)}
        {TotalSeries(panelOptions, onOptionsChange)}
    </svg>
}

function getYPos(startY: number, showRangeSelector: boolean): number {
    let result: number = startY - 495 + 50
    return showRangeSelector ? result + 150 : result
}

