import { Color } from "colors/Color"
import { HSL } from "colors/HSL"


export class RGB implements Color {
    red: number = 0
    green: number = 0
    blue: number = 0

    constructor(red: number, green: number, blue: number) {
        this.red = red
        this.green = green
        this.blue = blue
    }

    shiftHue(shift: number): void {
        throw new Error("Method not implemented.")
    }

    toString(): string {
        return "rgb(" + this.red + "," + this.green + "," + this.blue + ")"
    }

    clone(): Color {
        return new RGB(this.red, this.green, this.blue)
    }

    increaseLuminance(increasePercentage: number) {
        console.warn("Method not implemented")
    }

    increaseSaturation(increasePercentage: number) {
        console.warn("Method not implemented")
    }

    decreaseLuminance(decreasePercentage: number) {
        console.warn("Method not implemented")
    }

    decreaseSaturation(decreasePercentage: number) {
        console.warn("Method not implemented")
    }

    toHsl(): HSL {
        var r = this.red /= 255
        var g = this.green /= 255
        var b = this.blue /= 255

        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h = (max + min) / 2;
        var s = (max + min) / 2;
        var l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        s = s * 100;
        s = Math.round(s);
        l = l * 100;
        l = Math.round(l);
        h = Math.round(360 * h);

        var opacity = 1

        return new HSL(h, s, l, opacity)
    }

}