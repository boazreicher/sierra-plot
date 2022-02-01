import { CLICKABLE_CLASS } from "Constants";
import * as React from "react";
import { optionsChangeCallback, SierraPlotOptions } from "types";
import { getStyleObj } from "./Utils";

export function FogBtn(operation: FogOperation, panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback) {
    switch (operation) {
        case FogOperation.UP:
            return fogBtnUp(panelOptions, onOptionsChange)
        case FogOperation.DOWN:
            return fogBtnDown(panelOptions, onOptionsChange)
        case FogOperation.TOGGLE:
            return fogToggle(panelOptions, onOptionsChange)
    }
}

function fogToggle(panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback) {
    return <g onClick={getFogOnClickHandler(FogOperation.TOGGLE, panelOptions, onOptionsChange)} className={CLICKABLE_CLASS}>
        <path
            id="fog"

            style={getStyleObj("fill:url(#radialGradient10268);fill-opacity:1;stroke:" + getFogStroke(panelOptions.showFog) + ";stroke-width:0.649422;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            d="m 168.38606,17.64076 a 7.2898459,7.5083584 0 0 0 -7.28985,7.508252 7.2898459,7.5083584 0 0 0 0.007,0.19349 c -2.64222,0.07132 -4.74985,2.394531 -4.74985,5.271548 0,2.922275 2.17407,5.274772 4.87457,5.274772 H 184.415 c 2.70051,0 4.87447,-2.352497 4.87447,-5.274772 0,-2.915777 -2.16444,-5.26395 -4.8566,-5.274363 a 6.1480628,6.4628907 0 0 0 -6.03418,-5.227906 6.1480628,6.4628907 0 0 0 -3.69089,1.299553 7.2898459,7.5083584 0 0 0 -6.3217,-3.770574 z" />
    </g>
}

function fogBtnUp(panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback) {
    return <g onClick={getFogOnClickHandler(FogOperation.UP, panelOptions, onOptionsChange)} className={CLICKABLE_CLASS}>
        <path
            style={getStyleObj("fill:url(#linearGradient8241);fill-opacity:1;stroke:#000000;stroke-width:3.24637444;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="fog_up"
            d="m 912.5213,146.37111 20.97376,36.32761 20.97375,36.32761 H 912.5213 870.57379 l 20.97376,-36.32761 z"
            transform="matrix(0.17819444,0,0,0.11120928,35.560638,1.1341693)" />
    </g>
}

function fogBtnDown(panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback) {
    return <g onClick={getFogOnClickHandler(FogOperation.DOWN, panelOptions, onOptionsChange)} className={CLICKABLE_CLASS}>
        <path
            style={getStyleObj("fill:url(#linearGradient8143);fill-opacity:1;stroke:#000000;stroke-width:3.24637428;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="fog_down"
            transform="matrix(-0.1781944,1.3634998e-4,-7.2496717e-5,-0.11120926,360.99651,52.355068)"
            d="m 912.5213,146.37111 20.97376,36.32761 20.97375,36.32761 H 912.5213 870.57379 l 20.97376,-36.32761 z" />
    </g>
}

function getFogOnClickHandler(operation: FogOperation, panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback): React.MouseEventHandler<SVGSVGElement> | undefined {
    var clickEventHandler: React.MouseEventHandler = (event) => {
        switch (operation) {
            case FogOperation.TOGGLE:
                panelOptions.showFog = !panelOptions.showFog
                break
            case FogOperation.UP:
                panelOptions.fogHeight = Math.min(100, panelOptions.fogHeight + 5)
                break
            case FogOperation.DOWN:
                panelOptions.fogHeight = Math.max(0, panelOptions.fogHeight - 5)
                break
        }

        event.preventDefault()
        event.stopPropagation()
        onOptionsChange(panelOptions)
    }
    return clickEventHandler
}

function getFogStroke(showFog: boolean) {
    return showFog ? "#ffffff" : "#000000"
}

export enum FogOperation {
    TOGGLE,
    UP,
    DOWN
}