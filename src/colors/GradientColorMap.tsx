import { Color } from "colors/Color";
import { ColorPalette } from "colors/ColorPalette";
import { HUE_SHIFT_GROUPS, HUE_SHIFT_SERIES, ID_KV_SEPERATOR, ID_TYPE_CHART_ELEMENT, ID_TYPE_GROUP_ELEMENT, ID_TYPE_SERIES_ELEMENT, ID_PREFIX_TOTAL_ELEMENT, ID_SEPERATOR, LUMINANCE_INCEASE_CHARTS, TOTAL_ELEMENT_ID } from "Constants";
import { ElementId } from "data/ElementId";


export class GradientColorMap implements ColorPalette {
    total: Color | undefined
    seriesElements: Record<string, Color> = {}
    chartElements: Record<string, Color> = {}
    groupElements: Record<string, Color> = {}

    addColor(key: string, color: Color) {
        var elements = key.split(ID_SEPERATOR);
        var type = elements[0]
        if (type == ID_PREFIX_TOTAL_ELEMENT && elements[elements.length - 1] == TOTAL_ELEMENT_ID) {
            this.total = color
            return
        }

        for (let index = elements.length - 1; index > 0; index--) {
            var pair = elements[index].split(ID_KV_SEPERATOR)

            var elementType = pair[0]
            var value = pair[1]

            switch (elementType) {
                case ID_TYPE_SERIES_ELEMENT:
                    if (!this.seriesElements.hasOwnProperty(value)) {
                        var newColor = color.clone().toHsl()
                        newColor.shiftHue(HUE_SHIFT_SERIES * Object.keys(this.seriesElements).length)
                        this.seriesElements[value] = newColor
                    }
                    break
                case ID_TYPE_CHART_ELEMENT:
                    if (!this.chartElements.hasOwnProperty(value)) {
                        var newColor = color.clone().toHsl()
                        newColor.increaseLuminance(LUMINANCE_INCEASE_CHARTS * Object.keys(this.chartElements).length)
                        this.chartElements[value] = newColor
                    }
                    break
                case ID_TYPE_GROUP_ELEMENT:
                    if (!this.groupElements.hasOwnProperty(value)) {
                        var newColor = color.clone().toHsl()
                        newColor.shiftHue(HUE_SHIFT_GROUPS * Object.keys(this.groupElements).length)
                        this.groupElements[value] = newColor
                    }
                    break
                default:
                    throw new Error("Unable to add color for " + key)
            }
        }
    }

    getColorFor(elementId: ElementId): Color {
        if (elementId.type == ID_PREFIX_TOTAL_ELEMENT && elementId.value == TOTAL_ELEMENT_ID) {
            if (this.total === undefined) {
                throw new Error("No color defined for total")
            }
            return this.total
        }

        if (elementId.series !== undefined) {
            return this.seriesElements[elementId.series]
        }
        if (elementId.chart !== undefined) {
            return this.chartElements[elementId.chart]
        }
        if (elementId.group !== undefined) {
            return this.groupElements[elementId.group]
        }

        throw new Error("Unable to get color for " + JSON.stringify(elementId))
    }

    next(): Color {
        throw new Error("Method not implemented.");
    }

    reset(): void {
        throw new Error("Method not implemented.");
    }

    resetIfDifferent(key: string | undefined): void {
        throw new Error("Method not implemented.");
    }

    toArray(): Color[] {
        throw new Error("Method not implemented.");
    }
}