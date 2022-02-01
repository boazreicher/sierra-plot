
import { ChartData } from "charts/ChartData";
import { Color } from "colors/Color";
import { ColorPalette } from "colors/ColorPalette";
import { ColorPalettes, PaletteType } from "colors/ColorPalettes";
import { DefaultGroupPalette } from "colors/defaults/DefaultGroupPalette";
import { DefaultSeriesPalette } from "colors/defaults/DefaultSeriesPalette";
import { HeatInvertedPalette } from "colors/defaults/HeatInvertedPalette";
import { HeatPalette } from "colors/defaults/HeatPalette";
import { FilterPalette } from "colors/FilterPalette";
import { Bevel } from "colors/filters/Bevel";
import { Filter } from "colors/filters/Filter";
import { Glow } from "colors/filters/Glow";
import { LinearGradient } from "colors/filters/LinearGradient";
import { PaletteGenerator } from "colors/PaletteGenerator";
import { FILTER_NAME_BEVEL, FILTER_NAME_GLOW, FILTER_NAME_HEAT, FILTER_NAME_HEAT_INVERTED } from "Constants";
import { MaxY } from "data/MaxY";
import { Selection, SelectionType } from "data/Selection";
import { BaseDimensionsProperties, ChartBreakdown, ChartDimensions, ChartDimensionsProperties, ColorMode, Dimensions, optionsChangeCallback, SierraPlotOptions, TimeRange } from "types";
import { Totals } from "./Totals";

export class SierraPlotProperties {
    // Dimensions for the area containing all of the charts (including total)
    dimensions: Dimensions
    // Dimensions for a single chart
    chartDimensions: ChartDimensions
    // Dimensions for the totals chart
    totalsDimensions?: Dimensions

    skew: number
    maxY: MaxY
    totalsMaxY: number
    palettes: ColorPalettes = new ColorPalettes
    filters: Set<Filter> = new Set<Filter>()
    minX: number
    timeRange: TimeRange

    private running: number = 0

    onOptionsChange: optionsChangeCallback

    constructor(panelOptions: SierraPlotOptions, charts: ChartData[], totals: Totals, baseDimensionsProperties: BaseDimensionsProperties, chartDimensionsProperties: ChartDimensionsProperties, paletteGenerator: PaletteGenerator, timeRange: TimeRange, onOptionsChange: optionsChangeCallback) {
        this.maxY = new MaxY(panelOptions.maxYType, panelOptions.chartType, charts, totals)
        this.totalsMaxY = totals.getEffectiveMaxY(panelOptions)
        this.palettes = paletteGenerator.generatePalettes(charts, panelOptions)
        this.onOptionsChange = onOptionsChange
        this.dimensions = this.generateBaseDimensions(baseDimensionsProperties)
        this.skew = this.calculateSkew(chartDimensionsProperties)
        this.chartDimensions = this.generateChartDimensions(chartDimensionsProperties, baseDimensionsProperties.topMargin)
        this.minX = 0
        this.timeRange = timeRange
        this.filters = this.generateFilters(panelOptions.glowSpread)
    }

    private generateFilters(glowSpread: number): Set<Filter> {
        let filters: Set<Filter> = new Set<Filter>()

        this.createLinearGradientFilters(this.palettes.getPalette(PaletteType.Regular).toArray()).forEach(filters.add, filters)
        this.createLinearGradientFilters(new DefaultGroupPalette().asFilters().toArray()).forEach(filters.add, filters)
        this.createLinearGradientFilters(new DefaultSeriesPalette().asFilters().toArray()).forEach(filters.add, filters)
        this.createLinearGradientFilters(this.palettes.getPalette(PaletteType.Selected).toArray()).forEach(filters.add, filters)

        filters.add(new LinearGradient(FILTER_NAME_HEAT, new HeatPalette().toArray()))
        filters.add(new LinearGradient(FILTER_NAME_HEAT_INVERTED, new HeatInvertedPalette().toArray()))
        filters.add(new Bevel(FILTER_NAME_BEVEL))
        filters.add(new Glow(FILTER_NAME_GLOW, glowSpread))

        // Required since Set doesn't work with custom equality methods
        filters = this.uniqueFilters(filters)

        return filters
    }

    private createLinearGradientFilters(colors: Color[]): Filter[] {
        let filters: Filter[] = []

        colors.forEach(color => {
            let colorHsl = color.toHsl()
            let endColor = colorHsl.clone()
            endColor.decreaseLuminance(colorHsl.l * 50 / 100)

            let filter = color as Filter

            filters.push(new LinearGradient(filter.filterName, [colorHsl, endColor]))
        })

        return filters
    }

    private calculateSkew(properties: ChartDimensionsProperties): number {
        let shiftForTotal = properties.showTotal ? 1 : 0
        return properties.skewPercentage * (this.dimensions.width - this.dimensions.startX) / (100 + properties.skewPercentage * (properties.numCharts + shiftForTotal - 1))
    }

    getPalette() {
        return this.palettes.getPalette(PaletteType.Regular)
    }

    getPaletteSelected() {
        return this.palettes.getPalette(PaletteType.Selected)
    }

    getNumChartsRunning(): number {
        return this.running++
    }

    getNumCharts(): number {
        return this.running
    }

    selectPalette(colorMode: ColorMode, selection: Selection | undefined, groupName: string | undefined, isTotal: boolean, breakDownType: ChartBreakdown) {
        if (colorMode == 'values' && !isTotal) {
            return new FilterPalette("heat")
        } else if (colorMode == 'valuesInverted' && !isTotal) {
            return new FilterPalette("heatInverted")
        }
        var palette: ColorPalette = this.getPalette()
        if (breakDownType == 'series') {
            return palette
        }
        if (selection !== undefined && selection.active
            && selection.type === SelectionType.Group && (selection.value == groupName || isTotal)) {
            palette = this.getPaletteSelected();
        }
        return palette;
    }

    private generateBaseDimensions(properties: BaseDimensionsProperties): Dimensions {
        var dimensions: Dimensions = new Dimensions;
        dimensions.startX = properties.leftMargin;
        dimensions.startY = properties.topMargin
        dimensions.width = properties.width
        dimensions.height = properties.height - properties.topMargin

        return dimensions
    }


    private generateChartDimensions(properties: ChartDimensionsProperties, topMargin: number): ChartDimensions {
        let shiftForTotal = properties.showTotal ? 1 : 0
        let width = this.dimensions.width - (properties.numCharts + shiftForTotal - 1) * this.skew - this.dimensions.startX
        let totalHeight = this.dimensions.height * (100 - (properties.showTotal ? properties.totalHeightPercentage : 0)) / 100
        let effectiveScaleY = properties.scaleY
        let height = (totalHeight / properties.numCharts) * effectiveScaleY / 100
        let originalHeight = totalHeight / properties.numCharts

        // This makes sure that no chart goes out of the frame
        height = Math.min(height, (this.dimensions.height - totalHeight) + originalHeight) + topMargin

        let shiftY = this.dimensions.height - totalHeight
        let maxY = this.maxY.getMaxY(undefined)

        return new ChartDimensions(width, height, totalHeight, originalHeight, shiftY, maxY)
    }

    private uniqueFilters(filters: Set<Filter>): Set<Filter> {
        let filtersMap: Record<string, Filter> = {}

        filters.forEach(filter => {
            if (!filtersMap.hasOwnProperty(filter.toString())) {
                filtersMap[filter.toString()] = filter
            }
        })

        let results: Set<Filter> = new Set<Filter>()
        for (let filterKey in filtersMap) {
            results.add(filtersMap[filterKey])
        }

        return results
    }
}
