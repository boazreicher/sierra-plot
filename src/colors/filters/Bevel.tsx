import { Filter } from "./Filter";
import React from "react";

export class Bevel extends Filter {
    constructor(name: string) {
        super(name)
    }

    toFilter() {
        return <filter id={this.filterName} height="220%">
            <feFlood flood-color="black" />
            <feComposite operator="out" in2="SourceGraphic" />
            <feGaussianBlur stdDeviation="25" />
            <feComposite operator="atop" in2="SourceGraphic" />
        </filter>
    }
}