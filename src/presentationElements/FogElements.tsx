import { ID_KV_SEPERATOR, ID_PREFIX_FOG, ID_SEPERATOR, TOTAL_ELEMENT_ID, ZORDER_CHART_RANGE } from "Constants";
import { SvgElement } from "svg/SvgElement";
import { SvgPolygon } from "svg/SvgPolygon";
import { BoundingBox, Coordinates } from "types";
import { Selection, SelectionType } from "data/Selection"
import { PresentationElement } from "./PresentationElement";


export class FogElements implements PresentationElement {
    private fogHeight: number
    private fogColor: string
    private selection: Selection
    private enabled: boolean

    constructor(fogHeight: number, fogColor: string, selection: Selection, enabled: boolean) {
        this.fogHeight = fogHeight
        this.fogColor = fogColor
        this.selection = selection
        this.enabled = enabled
    }

    toSvgElements(elements: SvgElement[]): SvgElement[] {
        if (!this.enabled) {
            return []
        }
        let source: BoundingBox | undefined

        let fogSlices: SvgElement[] = []
        let height: number = this.getMaxYValue(elements) * this.fogHeight / 100

        let chartDistances: Coordinates = this.calculateChartDistances(elements)

        for (let index = elements.length - 1; index >= 0; index--) {
            if (!elements[index].isChartGroup || elements[index].id == TOTAL_ELEMENT_ID) {
                continue
            }

            if (source !== undefined) {
                let topLeft = new Coordinates(source.minX, source.maxY - height)
                let topRight = new Coordinates(source.maxX, source.maxY - height)
                let bottomRight = new Coordinates(source.maxX - chartDistances.x, source.maxY + chartDistances.y - height)
                let bottomLeft = new Coordinates(source.minX - chartDistances.x, source.maxY + chartDistances.y - height)

                var fogSliceCoordinates: Coordinates[] = [topLeft, topRight, bottomRight, bottomLeft]

                // Shift right to limit covering the chart labels
                let slope: number = (topRight.y - bottomRight.y) / (topRight.x - bottomRight.x)
                let shiftX = -1 * (height / slope)
                fogSliceCoordinates.forEach(coordinatesElement => {
                    coordinatesElement.x += shiftX
                })

                var fogSlice = new SvgPolygon
                fogSlice.id = ID_PREFIX_FOG + ID_SEPERATOR + elements[index].id
                fogSlice.fill = this.fogColor
                fogSlice.stroke = this.fogColor
                fogSlice.strokeWidth = 1
                fogSlice.dataPoints = fogSliceCoordinates
                fogSlice.isFogElement = true

                fogSlice.zOrder = elements[index].zOrder + 1

                // Should extract this to some "isSelected" utility
                if (this.selection !== undefined && this.selection.active) {
                    let selectedId = this.selection.key + ID_KV_SEPERATOR + this.selection.value
                    if (this.selection.type === SelectionType.Chart && selectedId == elements[index].id) {
                        fogSlice.zOrder += ZORDER_CHART_RANGE
                    }
                    if (this.selection.type === SelectionType.Group && this.selection.value == elements[index].sortKey) {
                        fogSlice.zOrder += ZORDER_CHART_RANGE
                    }
                }

                fogSlices.push(fogSlice)
            }
            source = elements[index].boundingBox
        }

        return fogSlices
    }

    private getMaxYValue(chartsSvgElements: SvgElement[]): number {
        var result: number = 0
        chartsSvgElements.forEach(element => {
            if (!element.isChartGroup || element.id == TOTAL_ELEMENT_ID) {
                return
            }
            if (element.boundingBox.maxY - element.boundingBox.minY > result) {
                result = element.boundingBox.maxY - element.boundingBox.minY
            }
        })
        return result
    }

    private calculateChartDistances(chartsSvgElements: SvgElement[]): Coordinates {
        let source: BoundingBox | undefined
    
        for (let index = chartsSvgElements.length - 1; index >= 0; index--) {
            if (!chartsSvgElements[index].isChartGroup || chartsSvgElements[index].id == TOTAL_ELEMENT_ID) {
                continue
            }
            if (source !== undefined) {
                return new Coordinates(Math.abs(source.minX - chartsSvgElements[index].boundingBox.minX), Math.abs(source.maxY - chartsSvgElements[index].boundingBox.maxY))
            }
            source = chartsSvgElements[index].boundingBox
        }
        throw new Error("Unable to create fog elements.  Not enough valid charts")
    }
}


