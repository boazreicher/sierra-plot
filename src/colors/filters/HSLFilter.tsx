import { Filter } from "./Filter";
import { HSL } from "../HSL";

export class HSLFilter extends Filter {
    constructor(baseColor: HSL, prefix: string = "") {
        let h = addPadding(Math.round(baseColor.h), 3)
        let s = addPadding(Math.round(baseColor.s), 2)
        let l = addPadding(Math.round(baseColor.l), 2)
        
        super(prefix + h + s + l)
        this.baseColor = baseColor
    }
    
    toHsl(): HSL {
        if (this.baseColor === undefined) {
            throw new Error("No base color available")
        }
        return this.baseColor
    }

    static fromString(filterString: string): HSLFilter {
        let hsl = /^url\(.#(.*?)(\d{7}).\)$/i.exec(filterString);

        if (!hsl) {
            throw new Error("Failed to parse " + filterString)
        }

        let hslComponents = /^(\d\d\d)(\d\d)(\d\d)$/i.exec(hsl[2])

        if (!hslComponents || hslComponents.length != 4) {
            throw new Error("Failed to extract components from " + hsl)
        }

        return new HSLFilter(new HSL(+hslComponents[1], +hslComponents[2], +hslComponents[3]), hsl[1])
    }
}

function addPadding(value: number, digits: number): string {
    let result = value.toString()
    while (result.length < digits) {
        result = "0" + result
    }

    return result
}
