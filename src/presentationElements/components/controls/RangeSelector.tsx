import { CLICKABLE_CLASS } from "Constants";
import * as React from "react";
import { optionsChangeCallback, SierraPlotOptions } from "types";
import { getStyleObj } from "./Utils";

export function RangeSelector(panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback) {
    return <g id="btn_range_selector" className={CLICKABLE_CLASS} onClick={getRangeSelectorOnClickHandler(panelOptions, onOptionsChange)}>
        <rect
            style={getStyleObj("fill:#2a2a2a;fill-opacity:1;stroke:" + getStrokeColor(panelOptions.showRangeSelector) + ";stroke-width:" + getStrokeWidth(panelOptions.showRangeSelector) + ";stroke-linecap:butt;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:none;paint-order:normal")}
            id="range_main"
            width="28.833591"
            height="25.492006"
            x="117.1153"
            y="42.109829" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:" + getStrokeColor(panelOptions.showRangeSelector) + ";stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-3-09"
            width="0.70661634"
            height="18.82691"
            x="-117.77082"
            y="48.766048"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_1-7-4"
            width="0.70661634"
            height="19.784147"
            x="-118.47745"
            y="47.808807"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-3-3-5"
            width="0.70661634"
            height="18.554382"
            x="-119.18404"
            y="49.038578"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_5-9"
            width="0.70661634"
            height="16.400549"
            x="-119.89066"
            y="51.192413"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-60-0"
            width="0.70661634"
            height="15.131009"
            x="-120.59727"
            y="52.461937"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_1-2-0"
            width="0.70661634"
            height="14.305273"
            x="-121.30389"
            y="53.287682"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-3-0-3"
            width="0.70661634"
            height="16.233128"
            x="-122.0105"
            y="51.359829"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_6-8"
            width="0.70661634"
            height="15.460873"
            x="-122.71712"
            y="52.132092"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-2-8"
            width="0.70661634"
            height="17.75511"
            x="-123.42373"
            y="49.837845"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_1-23-8"
            width="0.70661634"
            height="16.213432"
            x="-124.13036"
            y="51.379528"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-3-09-1"
            width="0.70661634"
            height="16.865267"
            x="-124.83695"
            y="50.727684"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_1-7-3"
            width="0.70661634"
            height="17.646997"
            x="-125.54358"
            y="49.94595"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-3-3-2"
            width="0.70661634"
            height="17.247784"
            x="-126.25017"
            y="50.345165"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_5-4"
            width="0.70661634"
            height="19.480635"
            x="-126.95679"
            y="48.11232"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-60-6"
            width="0.70661634"
            height="20.257919"
            x="-127.6634"
            y="47.335026"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_1-2-4"
            width="0.70661634"
            height="17.994823"
            x="-128.37001"
            y="49.598133"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-3-0-4"
            width="0.70661634"
            height="16.112795"
            x="-129.07663"
            y="51.480152"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_6-0"
            width="0.70661634"
            height="14.957165"
            x="-129.78325"
            y="52.635792"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-2-3"
            width="0.70661634"
            height="15.452435"
            x="-130.48987"
            y="52.140522"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_1-23-7"
            width="0.70661634"
            height="14.296803"
            x="-131.19649"
            y="53.296143"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-3-09-3"
            width="0.70661634"
            height="16.641085"
            x="-131.90309"
            y="50.951874"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_1-7-7"
            width="0.70661634"
            height="17.862749"
            x="-132.60971"
            y="49.730209"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-3-3-0"
            width="0.70661634"
            height="19.480635"
            x="-133.3163"
            y="48.11232"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_5-6"
            width="0.70661634"
            height="18.258966"
            x="-134.02292"
            y="49.333988"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-60-4"
            width="0.70661634"
            height="16.971264"
            x="-134.72954"
            y="50.621685"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_1-2-2"
            width="0.70661634"
            height="17.730679"
            x="-135.43614"
            y="49.862282"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-3-0-8"
            width="0.70661634"
            height="15.749597"
            x="-136.14276"
            y="51.843353"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_6-81"
            width="0.70661634"
            height="17.070318"
            x="-136.84938"
            y="50.522633"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-2-81"
            width="0.70661634"
            height="17.829731"
            x="-137.556"
            y="49.763214"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_1-23-9"
            width="0.70661634"
            height="16.37694"
            x="-138.26262"
            y="51.216022"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-3-09-7"
            width="0.70661634"
            height="18.556129"
            x="-138.96922"
            y="49.036819"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_1-7-34"
            width="0.70661634"
            height="18.02784"
            x="-139.67584"
            y="49.565113"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-3-3-03"
            width="0.70661634"
            height="19.480635"
            x="-140.38245"
            y="48.11232"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_5-49"
            width="0.70661634"
            height="17.631626"
            x="-141.08907"
            y="49.961334"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-60-68"
            width="0.70661634"
            height="18.523111"
            x="-141.79568"
            y="49.069839"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_1-2-1"
            width="0.70661634"
            height="16.277885"
            x="-142.50229"
            y="51.315075"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-3-0-5"
            width="0.70661634"
            height="17.565588"
            x="-143.20891"
            y="50.027363"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_6-1"
            width="0.70661634"
            height="15.386399"
            x="-143.91553"
            y="52.206551"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-2-5"
            width="0.70661634"
            height="17.862749"
            x="-144.62215"
            y="49.730209"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_1-23-1"
            width="0.70661634"
            height="19.480635"
            x="-145.32877"
            y="48.11232"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#999999;fill-opacity:1;stroke:" + getStrokeColor(panelOptions.showRangeSelector) + ";stroke-width:0.189957;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1")}
            id="bar_3-3-09-0"
            width="0.70661634"
            height="20.339104"
            x="-146.03537"
            y="47.253853"
            transform="scale(-1,1)" />
        <rect
            style={getStyleObj("fill:#ffffff;fill-opacity:0.29918;stroke:none;stroke-width:0.297901;stroke-linecap:butt;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:normal")}
            id="rect4575"
            width="14.838882"
            height="25.611046"
            x="122.71712"
            y="41.981918" />
        <rect
            style={getStyleObj("fill:#000000;fill-opacity:0.368853;stroke:none;stroke-width:1.54853;stroke-linecap:butt;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:normal")}
            id="rect5478"
            width="1.4189228"
            height="25.793415"
            x="121.2982"
            y="41.981918" />
        <rect
            style={getStyleObj("fill:#000000;fill-opacity:0.368853;stroke:none;stroke-width:1.54305;stroke-linecap:butt;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:normal")}
            id="rect5478-9"
            width="1.4189228"
            height="25.611042"
            x="137.556"
            y="41.981918" />
    </g>
}

function getStrokeColor(enabled: boolean): string {
    return enabled ? "#ffffff" : "#000000"
}

function getRangeSelectorOnClickHandler(panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback): React.MouseEventHandler<SVGSVGElement> | undefined {
    var clickEventHandler: React.MouseEventHandler = (event) => {
        panelOptions.showRangeSelector = !panelOptions.showRangeSelector
        event.preventDefault()
        event.stopPropagation()
        onOptionsChange(panelOptions)
    }
    return clickEventHandler
}

function getStrokeWidth(enabled: boolean): string {
    return enabled ? "1" : "0.735"
}
