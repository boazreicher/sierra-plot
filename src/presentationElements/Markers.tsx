import { PopoverContent } from "@grafana/ui";
import { ChartData } from "charts/ChartData";
import { HOVERABLE_CLASS } from "Constants";
import { SvgCircle } from "svg/SvgCircle";
import { SvgElement } from "svg/SvgElement";
import { SierraPlotOptions } from "types";
import { PresentationElement } from "./PresentationElement";
import React from "react";


export class Markers implements PresentationElement {
    private charts: ChartData[]
    private panelOptions: SierraPlotOptions

    constructor(charts: ChartData[], panelOptions: SierraPlotOptions) {
        this.charts = charts
        this.panelOptions = panelOptions
    }

    toSvgElements(elements: SvgElement[]): SvgElement[] {
        if (this.panelOptions.markersMode == 'disable') {
            return []
        }
        let markers: SvgElement[] = []

        this.charts.forEach(chart => {
            chart.elements.forEach(element => {
                element.dataPoints.forEach(dp => {
                    if (dp.unformattedX !== undefined && dp.unformattedY !== undefined) { // Not adding markers to closing data points
                        let marker = new SvgCircle(dp.x, dp.y, this.panelOptions.markersRadius)
                        marker.fill = this.panelOptions.markersColor
                        if (this.panelOptions.markersMode == 'hidden') {
                            marker.fillOpacity = 0
                        }
                        marker.toolTipContent = this.buildMarkerTooltip(chart.name, element.id, dp.unformattedX, dp.unformattedY)
                        marker.class = HOVERABLE_CLASS
                        marker.zOrder = chart.zOrder
                        markers.push(marker)
                    }
                })
            })
        })

        return markers
    }

    private buildMarkerTooltip(name: string, id: string | undefined, unformattedX: number, unformattedY: number): PopoverContent {
        let timestamp = new Date(unformattedX)
        let timestampString = this.formatTimestamp(timestamp)

        return <>
            <b>{timestampString}</b>
            <br></br>
            <b>{name}:   {unformattedY}</b>
        </>
    }

    private formatTimestamp(timestamp: Date): string {
        return timestamp.getFullYear() + "-" + this.addPadding(timestamp.getMonth() + 1, 2) + "-" + this.addPadding(timestamp.getDate(), 2) + " " + this.addPadding(timestamp.getHours(), 2) + ":" + this.addPadding(timestamp.getMinutes(), 2) + ":" + this.addPadding(timestamp.getSeconds(), 2)
    }

    private addPadding(value: number, digits: number): string {
        let result = value.toString()
        while (result.length < digits) {
            result = "0" + result
        }

        return result
    }


}