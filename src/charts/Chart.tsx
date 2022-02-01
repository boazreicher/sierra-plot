import { ID_PREFIX_TOTAL_ELEMENT, ID_SEPERATOR, TOTAL_ELEMENT_ID } from "Constants";
import { SvgElement } from "svg/SvgElement";
import { Dimensions } from "types";
import { DataSeries } from "data/DataSeries";
import { ChartsPresentationProperties } from "./ChartsPresentationProperties";
import { SeriesElement } from "./SeriesElement";
import { ElementId } from "data/ElementId";

export abstract class Chart<ElementType extends SeriesElement> {
    id: string;
    chartDimensions: Dimensions

    constructor(id: string, chartDimensions: Dimensions, private type: new () => ElementType) {
        this.id = id
        this.chartDimensions = chartDimensions
    }

    buildSvgElements(series: DataSeries[], numDataPoints: number, chartsPresentationProperties: ChartsPresentationProperties): SvgElement[] {
        let seriesElements = this.buildElements(series, chartsPresentationProperties.isTotal, chartsPresentationProperties.stepped)

        let formattedSeriesElements = this.formatSeriesElements(seriesElements, numDataPoints)
  
        return this.generateSvgElements(formattedSeriesElements, chartsPresentationProperties)
    }

    protected generateSvgElements(seriesElements: SeriesElement[], chartsPresentationProperties: ChartsPresentationProperties): SvgElement[] {
        var elements: SvgElement[] = []

        var color
        let lastSortKey
        for (var index = 0; index < seriesElements.length; index++) {
            lastSortKey = seriesElements[index].sortKey
            seriesElements[index].invertY()
 
            var svgElement = seriesElements[index].toSvgElement()

            if (svgElement.id === undefined) {
                continue
            }
            let elementId = new ElementId(svgElement.id)
            color = chartsPresentationProperties.palette.getColorFor(elementId).toString()

            svgElement.stroke = color
            svgElement.title = this.generateTitle(seriesElements[index].id)


            this.setStyleForUnderlyingType(svgElement, color, chartsPresentationProperties)

            elements.push(svgElement)


            if (elementId.type == 'te') {
                if (index < seriesElements.length - 1 && (seriesElements[index + 1].sortKey != lastSortKey || lastSortKey === undefined)) {
                    this.addTopSvgElement(elements, seriesElements[index], chartsPresentationProperties, true)
                }
            }
        }

        this.addTopSvgElement(elements, seriesElements[seriesElements.length - 1], chartsPresentationProperties, false)

        return elements
    }

    protected getNewFromUnderlyingType(): SeriesElement {
        return new this.type()
    }
    protected abstract setStyleForUnderlyingType(element: SvgElement, color: string, chartsPresentationProperties: ChartsPresentationProperties): void
    protected abstract addTopSvgElement(elements: SvgElement[], element: SeriesElement, chartsPresentationProperties: ChartsPresentationProperties, totalNotLast: boolean): void
    protected abstract formatSeriesElements(elements: SeriesElement[], numDataPoints: number): SeriesElement[]


    protected buildElements(series: DataSeries[], isTotal: boolean, stepped: boolean): SeriesElement[] {
        var elements: SeriesElement[] = []

        var effectiveMaxY = this.calculateEffectiveMaxY(series)

        for (var index = 0; index < series.length; index++) {
            var element = this.getNewFromUnderlyingType()
            element.stepped = stepped
            var id: string | undefined = series[index].name

            if (isTotal) {
                id = ID_PREFIX_TOTAL_ELEMENT + ID_SEPERATOR + series[index].name
            } else {
                id = series[index].name
            }
            element.id = id

            for (var xIndex = 0; xIndex < series[index].dataPoints.length; xIndex++) {
                element.dataPoints.push(series[index].dataPoints[xIndex].clone())
            }

            var dimensions = this.chartDimensions.clone()
            dimensions.maxY = effectiveMaxY
            element.dimensions = dimensions
            element.sortKey = series[index].sortKey
            elements.push(element)
        }

        return elements
    }

    protected abstract calculateEffectiveMaxY(series: DataSeries[]): number

    private generateTitle(id: string | undefined): string | undefined {
        if (id === undefined) {
            return undefined
        }

        let elementId = new ElementId(id)

        if (elementId.type == ID_PREFIX_TOTAL_ELEMENT && elementId.value == TOTAL_ELEMENT_ID) {
            return elementId.value
        }

        var result: string = ""
        if (elementId.series !== undefined) {
            result = elementId.series + " in " + elementId.chart
            if (elementId.group !== undefined) {
                result += " [" + elementId.group + "]"
            }
        } else if (elementId.chart !== undefined) {
            result = elementId.chart
            if (elementId.group !== undefined) {
                result += " [" + elementId.group + "]"
            }
        } else if (elementId.group !== undefined) {
            result = elementId.group
        }

        return result
    }
}