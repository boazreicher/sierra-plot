import { Color } from "colors/Color"


export class ToolTipData {
    group: string | undefined
    // Color for group label
    color: Color | undefined
    // Colors for individual charts
    charts: Record<string, Color> = {}
    highlightedChart: string | undefined
}