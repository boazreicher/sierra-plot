import React from "react";
import { SvgElement } from "svg/SvgElement";
import { ChartType } from "types";


export class SvgText extends SvgElement {

    buildElement(height?: number): JSX.Element {
        return <text id={this.id} className={this.class} x={this.x} y={this.y} style={this.getDivStyleForChartLabel()} fillOpacity={this.fillOpacity}>{this.text}</text>
    }

    hasDataPoints(): boolean {
        return false
    }

    calculateBoundingBox(chartType: ChartType): void {
        // No need to calculate bbox for polygon
    }

    includedInParentBoundingBox(chartType: ChartType): boolean {
        return false
    }

    getPointsAsString(height: number | undefined): string {
        throw new Error("Method not implemented.");
    }

    isGroup(): boolean {
        return false
    }

    getDivStyleForChartLabel() {
        const divStyle = {
            font: this.textSize + "px Roboto, Helvetica, Arial, sans-serif",
            fill: this.fill
        }

        return divStyle
    }
}



