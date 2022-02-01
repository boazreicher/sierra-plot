import { Color } from "colors/Color";
import { Filter } from "./Filter";
import React from "react";


export class LinearGradient extends Filter {
    colors: Color[]

    constructor(name: string, colors: Color[]) {
        super(name)
        this.colors = colors
    }

    toFilter() {
        if (this.colors.length < 2) {
            return <></>
        }
        
        let step = 100 / (this.colors.length - 1)
        let offset = 0
        return <linearGradient id={this.filterName} x1="0%" y1="0%" x2="0%" y2="100%">
            {this.colors.map(color => {
                return <stop offset={offset * step + "%"} stop-color={this.colors[offset++].toString()} stop-opacity="1"></stop>
            })}
        </linearGradient>
    }
}