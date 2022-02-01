
import { Chart } from "charts/Chart";
import { Polygon } from "charts/Polygon";
import { SvgElement } from "svg/SvgElement";
import { SeriesElement } from "./SeriesElement";
import { ChartsPresentationProperties } from "./ChartsPresentationProperties";
import { Dimensions } from "types";
import { FILTER_BEVEL, FILTER_GLOW, NO_COLOR, TOTAL_SEPERATOR_LINE_WIDTH, TOTAL_TOP_LINE_WIDTH } from "Constants";
import { DataSeries } from "data/DataSeries";
import { Black } from "colors/ColorUtils";

export class StackedAreaChart extends Chart<Polygon> {
    constructor(id: string, chartDimensions: Dimensions) {
        super(id, chartDimensions, Polygon);
    }

    protected formatSeriesElements(elements: SeriesElement[], numDataPoints: number): SeriesElement[] {
        return this.generateStackedPolygons(elements, numDataPoints)
    }

    protected addTopSvgElement(elements: SvgElement[], element: SeriesElement, chartsPresentationProperties: ChartsPresentationProperties, totalNotLast: boolean): void {
        let topLine = element.toOutlineElement()
        topLine.fill = NO_COLOR
        if (!chartsPresentationProperties.isTotal) {
            topLine.stroke = chartsPresentationProperties.outlineColor.toString()
            topLine.strokeWidth = chartsPresentationProperties.outlineWidth
            topLine.strokeOpacity = chartsPresentationProperties.outlineOpacity
            if (chartsPresentationProperties.glow) {
                topLine.filter = FILTER_GLOW
            }
        } else {
            if (totalNotLast) {
                topLine.stroke = Black().toString()
                topLine.strokeWidth = TOTAL_SEPERATOR_LINE_WIDTH
            } else {
                topLine.stroke = Black().toString()
                topLine.strokeWidth = TOTAL_TOP_LINE_WIDTH
            }
        }
        elements.push(topLine)
    }

    protected setStyleForUnderlyingType(element: SvgElement, color: string, chartsPresentationProperties: ChartsPresentationProperties): void {
        element.fill = color

        if (chartsPresentationProperties.isTotal) {
          //  element.fillOpacity = chartsPresentationProperties.totalOpacity
        } else {
            if (chartsPresentationProperties.bevel) {
                element.filter = FILTER_BEVEL
            }
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
                sumYs[index] = sumYs[index] + element.dataPoints[index].y()
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

    private generateStackedPolygons(polygons: SeriesElement[], numDataPoints: number): SeriesElement[] {
        var stackedPolygons: SeriesElement[] = []

        polygons.forEach(polygon => {
            polygon.format(numDataPoints)
            // First polygon isn't stacked
            if (stackedPolygons.length == 0) {
                stackedPolygons.push(polygon)
            } else {
                polygon.stackedOn(stackedPolygons)
                stackedPolygons.push(polygon)
            }
        })

        return stackedPolygons
    }
}

