import { Color } from "colors/Color"
import { ColorPalette } from "colors/ColorPalette"
import { SierraPlotOptions } from "types"


export class ChartsPresentationProperties {
    isTotal: boolean
    palette: ColorPalette
    glow: boolean
    bevel: boolean
    outlineWidth: number
    outlineOpacity: number
    outlineColor: Color
    stepped: boolean

    constructor(isTotal: boolean, palette: ColorPalette, outlineColor: Color, panelOptions: SierraPlotOptions) {
        this.isTotal = isTotal
        this.palette = palette
        this.glow = panelOptions.glow
        this.bevel = panelOptions.chartBevel
        this.outlineWidth = panelOptions.outlineWidth
        this.outlineOpacity = panelOptions.outlineOpacity
        this.outlineColor = outlineColor
        this.stepped = panelOptions.stepped
    }
}