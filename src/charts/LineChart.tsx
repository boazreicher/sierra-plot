import { Chart } from "charts/Chart";
import { Polyline } from "charts/Polyline";
import { SvgElement } from "svg/SvgElement";
import { SeriesElement } from "./SeriesElement";
import { ChartsPresentationProperties } from "./ChartsPresentationProperties";
import { Dimensions } from "types";
import { FILTER_GLOW } from "Constants";
import { DataSeries } from "data/DataSeries";

export class LineChart extends Chart<Polyline> {
    constructor(id: string, chartDimensions: Dimensions) {
        super(id, chartDimensions, Polyline);
    }

    protected formatSeriesElements(elements: SeriesElement[], numDataPoints: number): SeriesElement[] {
        var formattedPolylines: SeriesElement[] = []
        elements.forEach(polyline => {
            let formattedPolyline = polyline.clone()
            formattedPolyline.format(numDataPoints)
            formattedPolylines.push(formattedPolyline)
        })

        return formattedPolylines
    }

    protected addTopSvgElement(elements: SvgElement[], element: SeriesElement, chartsPresentationProperties: ChartsPresentationProperties, totalNotLast: boolean): void {
        // No top element for line chart
    }

    protected setStyleForUnderlyingType(element: SvgElement, color: string, chartsPresentationProperties: ChartsPresentationProperties): void {
        element.strokeWidth = chartsPresentationProperties.outlineWidth
        element.strokeOpacity = chartsPresentationProperties.outlineOpacity
        if (chartsPresentationProperties.glow) {
            element.filter = FILTER_GLOW
        }
    }

    protected calculateEffectiveMaxY(series: DataSeries[]): number {
        if (this.chartDimensions.maxY !== undefined) {
            return this.chartDimensions.maxY
        }

        var sumYs: Record<number, number> = {};

        series.forEach(element => {
            for (var index = 0; index < element.dataPoints.length; index++) {
                if (!sumYs.hasOwnProperty(index)) {
                    sumYs[index] = 0
                }
                if (element.dataPoints[index].y() > sumYs[index]) {
                    sumYs[index] = element.dataPoints[index].y()
                }
            }
        })

        var effectiveMaxY = 0

        for (let key in sumYs) {
            if (sumYs[key] > effectiveMaxY) {
                effectiveMaxY = sumYs[key]
            }
        }

        return effectiveMaxY
    }
}