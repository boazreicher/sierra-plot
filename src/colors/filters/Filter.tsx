import { Color } from "colors/Color";
import { HSL } from "colors/HSL";

export class Filter implements Color {
    filterName: string
    baseColor: HSL | undefined

    constructor(filterName: string) {
        this.filterName = filterName
    }

    toString(): string {
        return "url('#" + this.filterName + "')"
    }
    clone(): Color {
        return new Filter(this.filterName)
    }
    shiftHue(shift: number): void {
        
    }
    increaseSaturation(increasePercentage: number): void {
        
    }
    increaseLuminance(increasePercentage: number): void {
        
    }
    decreaseSaturation(decreasePercentage: number): void {
        
    }
    decreaseLuminance(decreasePercentage: number): void {
        
    }
    toHsl(): HSL {
        if (this.baseColor === undefined) {
            throw new Error("No base color available")
        }
        return this.baseColor
    }
    toFilter() {
        
    }
}