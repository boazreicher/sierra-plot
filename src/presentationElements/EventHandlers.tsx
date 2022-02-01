import { optionsChangeCallback, SierraPlotOptions, BoundingBox } from "types"
import { Selection, SelectionType } from "data/Selection"


export function getOnClickHandler(panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback): React.MouseEventHandler<SVGSVGElement> | undefined {
    var clickEventHandler: React.MouseEventHandler = (event) => {
        panelOptions.selectedChart.deselect()
        event.preventDefault()
        event.stopPropagation()
        onOptionsChange(panelOptions)
    }
    return clickEventHandler
}

export function getOnClickHandlerForChart(panelOptions: SierraPlotOptions, name: string | undefined, x: number, y: number, onOptionsChange: optionsChangeCallback): React.MouseEventHandler<SVGSVGElement> | undefined {
    var clickEventHandler: React.MouseEventHandler = (event) => {
        var chartName: string = name === undefined ? "" : name
        if (panelOptions.selectedChart === undefined) {
            panelOptions.selectedChart = new Selection("", "")
        }

        if (panelOptions.selectedChart !== undefined && panelOptions.selectedChart.active
            && panelOptions.selectedChart.key === panelOptions.chartsFieldBreakdown && panelOptions.selectedChart.value === chartName) {
            panelOptions.selectedChart.deselect()
        } else {
            panelOptions.selectedChart = new Selection(panelOptions.chartsFieldBreakdown, chartName)
            panelOptions.selectedChart.x = x
            panelOptions.selectedChart.y = y
            panelOptions.selectedChart.type = SelectionType.Chart
        }

        event.preventDefault()
        event.stopPropagation()
        onOptionsChange(panelOptions)
    }
    return clickEventHandler
}

export function getOnClickHandlerForTotal(panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback): React.MouseEventHandler<SVGSVGElement> | undefined {
    var clickEventHandler: React.MouseEventHandler = (event) => {
        if (panelOptions.selectedChart === undefined) {
            panelOptions.selectedChart = new Selection("", "")
        }

        if (panelOptions.totalStackMode == 'stacked') {
            panelOptions.totalStackMode = 'stacked100'
        } else {
            panelOptions.totalStackMode = 'stacked'
        }
        event.preventDefault()
        event.stopPropagation()
        onOptionsChange(panelOptions)
    }
    return clickEventHandler
}

export function getOnClickHandlerForGroupBounds(groupName: string, boundingBox: BoundingBox, panelOptions: SierraPlotOptions, groupColor: string, onOptionsChange: optionsChangeCallback): React.MouseEventHandler<SVGSVGElement> | undefined {
    var clickEventHandler: React.MouseEventHandler = (event) => {
        if (panelOptions.selectedChart === undefined) {
            panelOptions.selectedChart = new Selection("", "")
        }

        if (panelOptions.selectedChart.active && panelOptions.selectedChart.type == SelectionType.Group && panelOptions.selectedChart.value == groupName) {
            // Clicked on the currently selected group
            if (panelOptions.selectedChart.hightlightMode == 'focus') {
                // Switch from focus to exclusive
                panelOptions.selectedChart.hightlightMode = 'exclusive'
                panelOptions.selectedChart.currentColor = groupColor
            } else {
                // Exit group selection
                panelOptions.selectedChart = new Selection("", "")
                panelOptions.selectedChart.active = false
            }
        } else {
            // Clicked on new group
            panelOptions.selectedChart = new Selection("group", groupName)
            panelOptions.selectedChart.type = SelectionType.Group
            panelOptions.selectedChart.hightlightMode = 'focus'
        }
        panelOptions.selectedChart.x = boundingBox.minX
        panelOptions.selectedChart.y = boundingBox.maxY

        event.preventDefault()
        event.stopPropagation()

        onOptionsChange(panelOptions)
    }
    return clickEventHandler
}