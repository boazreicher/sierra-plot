import { PopoverContent, Tooltip } from "@grafana/ui";
import React from "react";
import { SvgElement } from "svg/SvgElement";
import { ChartType } from "types";


export class SvgCircle extends SvgElement {
    private radius: number
    // This should be in the base class
    toolTipContent?: PopoverContent

    constructor(x: number, y: number, radius: number) {
        super()
        this.x = x
        this.y = y
        this.radius = radius
    }

    buildElement(height?: number): JSX.Element {
        return <Tooltip content={this.toolTipContent === undefined ? <></> : this.toolTipContent}>
            <circle id={this.id} className={this.class} cx={this.x} cy={this.y} r={this.radius} fill={this.fill} fillOpacity={this.fillOpacity} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} />
        </Tooltip>
    }

    calculateBoundingBox(chartType: ChartType): void {
        throw new Error("Method not implemented.");
    }
    includedInParentBoundingBox(chartType: ChartType): boolean {
        throw new Error("Method not implemented.");
    }
    getPointsAsString(height?: number): string {
        throw new Error("Method not implemented.");
    }
    isGroup(): boolean {
        throw new Error("Method not implemented.");
    }
    hasDataPoints(): boolean {
        throw new Error("Method not implemented.");
    }

}