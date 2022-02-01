import { ColorPalette } from "colors/ColorPalette";
import { Black } from "colors/ColorUtils";
import { ZORDER_TOTAL_CHART } from "Constants";
import { SierraPlotProperties } from "data/SierraPlotProperties";
import { SvgGroup } from "svg/SvgGroup";
import { ChartType, SierraPlotOptions } from "types";
import { ChartData } from "./ChartData";
import { ChartLabel } from "./ChartLabel";
import { ChartsPresentationProperties } from "./ChartsPresentationProperties";
import { Selection } from "data/Selection"

export class TotalChartData extends ChartData {
    toSvgGroup(selection: Selection): SvgGroup {
        var chartGroup = new SvgGroup
        chartGroup.isChartGroup = true
        chartGroup.id = this.name
        chartGroup.zOrder = ZORDER_TOTAL_CHART
        chartGroup.children = this.elements
        chartGroup.calculateBoundingBox(this.type)

        return chartGroup;
    }
    protected getChartLabel(sierraPlotProperties: SierraPlotProperties, panelOptions: SierraPlotOptions): ChartLabel {
        return ChartLabel.empty()
    }
    protected getChartsPresentationProperties(sierraPlotProperties: SierraPlotProperties, panelOptions: SierraPlotOptions): ChartsPresentationProperties {
        let palette: ColorPalette = sierraPlotProperties.selectPalette(panelOptions.colorMode, panelOptions.selectedChart, this.sortKey, true, panelOptions.chartBreakdownType)
        return new ChartsPresentationProperties(true, palette, Black(), panelOptions)
    }
    protected getEffectiveGroupMaxY(sierraPlotProperties: SierraPlotProperties): number | undefined {
        return undefined
    }
    protected getEffectiveStartY(sierraPlotProperties: SierraPlotProperties, numCharts: number): number {
        return this.getEffectiveChartHeight(sierraPlotProperties)
    }
    protected getEffectiveMaxY(sierraPlotProperties: SierraPlotProperties): number | undefined {
        return undefined
    }
    protected getEffectiveChartHeight(sierraPlotProperties: SierraPlotProperties): number {
        return sierraPlotProperties.dimensions.height - sierraPlotProperties.chartDimensions.totalHeight
    }

    constructor(name: string, sortKey: string | undefined, breakDownField: string, type: ChartType = 'other') {
        super(name, sortKey, breakDownField, type)
    }
}