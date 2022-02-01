import { Color } from "colors/Color";
import { ElementId } from "data/ElementId";


export interface ColorPalette {
    getColorFor(elementId: ElementId): Color
    next(): Color
    reset(): void
    resetIfDifferent(key: string | undefined): void
    toArray(): Color[]
}