import { CLICKABLE_CLASS } from "Constants";
import * as React from "react";
import { optionsChangeCallback, SierraPlotOptions } from "types";
import { getStyleObj } from "./Utils";


export function Grid(panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback) {
    return <g onClick={getGridOnClickHandler(panelOptions, onOptionsChange)} className={CLICKABLE_CLASS}>
        <rect
            style={getStyleObj("fill:url(#linearGradient16762);fill-opacity:1;stroke:#000000;stroke-width:0.735;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="ss33"
            width="25.262375"
            height="25.262375"
            x="149.03293"
            y="42.330582" />
        <path
            id="rect25232"
            style={getStyleObj("fill:none;stroke:" + getGridColor(panelOptions.gridlineEnabled) + ";stroke-width:0.258938;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            d="M 173.03195,61.952668 168.51514,47.892669 H 155.341 l -4.98734,14.059999 z m -18.14262,0 3.08671,-14.059999 m 1.44894,14.059999 1.18575,-14.059999 m 3.3499,14.059999 -0.71521,-14.059999 m 5.25087,14.059999 -2.61583,-14.059999 m 3.10486,1.463402 H 154.8221 m 14.70986,1.701658 h -15.31339 m 15.95641,2.001815 h -16.66631 m 17.43382,2.389562 H 152.6608 m 19.21421,2.902865 h -20.24385" />
    </g>
}

function getGridOnClickHandler(panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback): React.MouseEventHandler<SVGSVGElement> | undefined {
    var clickEventHandler: React.MouseEventHandler = (event) => {
        panelOptions.gridlineEnabled = !panelOptions.gridlineEnabled
        event.preventDefault()
        event.stopPropagation()
        onOptionsChange(panelOptions)
    }
    return clickEventHandler
}


function getGridColor(gridlineEnabled: boolean) {
    return gridlineEnabled ? "#ffffff" : "#000000"
}